# 2022 소프트웨어공학종합프로젝트(캡스톤디자인)

## AI 기반 노후 시설물 관리 시스템

### 기술 스택
![1](https://user-images.githubusercontent.com/86114240/174079663-8a8ff644-13ac-4715-9ddb-066bb661deaa.JPG)


### 소개
주변에서 흔히 볼 수 있는 노후 시설물에 대한 민원 처리 방식을 AI 기반 시스템을 통하여 효율적으로 민원을 처리해보자
![2](https://user-images.githubusercontent.com/86114240/174079684-7edc55e5-e27c-43f2-a2e0-e275871f605a.JPG)

### 웹 브라우저 및 웹 서버
MVC 패턴을 입각하여 User라는 Model을 설정해주고 Controller를 통해 다양한 요청을 처리하며 View에 표현해 주었다.

NodeJS Express를 이용한 웹서버를 통해 모듈들 연결

### AI 모델
추후에 고속도로나 일상 CCTV 같은 이동식 카메라에도 모델을 적용하고자 임베디드 시스템을 사용하기 위해 Depthwise Separable Convolution 기법을 사용해 가벼운 모델인 MobileNet을 사용 

### DB
관리자 Table, 민원 접수 용 Table을 위해 SQL을 사용하기 위해 MYSQL 사용
