#케라스 관련
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import math
#sql 연결
import pymysql

#이미지 파일을 읽기위해
import os 

# Load model
model = load_model('./Ai_model/keras_model.h5')

#임시폴더 위치
files = os.listdir('./uploads')
#이미지 파일만을 가져와서 읽기 우선적으로 jpg만
files= [file for file in files if file.endswith(".jpg") 
or file.endswith(".png") 
or file.endswith(".jpeg") 
or file.endswith(".JPG") 
or file.endswith(".bmp")]



# Create the array of the right shape to feed into the keras model
# The 'length' or number of images you can put into the array is
# determined by the first position in the shape tuple, in this case 1.
data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

for x in files:
  imagebf = Image.open('./uploads/' + x )
  size = (224, 224)
  image = ImageOps.fit(imagebf, size, Image.ANTIALIAS)

  #turn the image into a numpy array
  image_array = np.asarray(image)
  # Normalize the image
  normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
  # Load the image into the array
  data[0] = normalized_image_array
  # run the inference
  prediction = model.predict(data)
  outx = np.array(prediction)
  
  # #퍼센티지 관련 내용 일단 주석처리 하였습니다.
  # print((outx.max()*100))

  #올바른 폴더에 이미지를 저장하기 위한 내용
  usr_db_data = x

    #정상
  if((outx.argmax() == 3) or (outx.argmax() == 6) or (outx.argmax() == 9) or (outx.argmax() == 12) or (outx.argmax() == 15) or (outx.argmax() == 18) or (outx.argmax() == 20) or (outx.argmax() == 23) or (outx.argmax() == 25) or (outx.argmax() == 27) or (outx.argmax() == 30) or (outx.argmax() == 33)):
    user_data_path = ("./src/public/predict/normal/"+ str(outx.argmax()) )+ "_"+ usr_db_data  
    state ="정상"
    print(1)
  #수리
  elif((outx.argmax() == 1) or (outx.argmax() == 4) or (outx.argmax() == 7) or (outx.argmax() == 10) or (outx.argmax() == 13) or (outx.argmax() == 16) or (outx.argmax() == 21) or (outx.argmax() == 28) or (outx.argmax() == 31)):
    user_data_path = ("./src/public/predict/repair/"+ str(outx.argmax()) )+ "_"+ usr_db_data   
    state ="수리"
    print(2)
  #교체폐기
  elif((ourx.armax() == 2 )or (outx.argmax() == 5) or (outx.argmax() == 8) or (outx.argmax() == 11) or (outx.argmax() == 14) or (outx.argmax() == 17) or (outx.argmax() == 19) or (outx.argmax() == 22) or (outx.argmax() == 24) or (outx.argmax() == 26) or (outx.argmax() == 29) or (outx.argmax() == 32) or (outx.argmax() == 34)):
    user_data_path = ("./src/public/predict/replacement/"+ str(outx.argmax()) )+ "_"+ usr_db_data  
    state = "교체폐기"
    print(3)

  imagebf.save( user_data_path,'jpeg') 

#sql 연결
conn = pymysql.connect(host='127.0.0.1',user="root", password="123123r", db="userprofile",charset='utf8')
cur = conn.cursor()
query = 'UPDATE civil SET percent=%s,state=%s WHERE name ="김정욱"'
vals = ( outx.max()*99, state)
cur.execute(query,vals)
conn.commit()
conn.close()

print("complete")
