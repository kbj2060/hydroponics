# hydroponics
---------
이 프로젝트는 수경재배 시스템을 구동하는 데에 있어 기본적인 기능을 제공하는 사이트 제작 프로젝트입니다.
또한 react & apollo & graphql 로 이루어져 있습니다.

우선 다운받아야 할 패키지는 아래와 같습니다.
```javascript
hydroponics $ npm i concurrently nodemon express 
hydroponics $ npm i -s cross-env
```

이 프로젝트 사이트를 구동하기 위해서는 npm install이 필요합니다.
package.json 에서 yarn ready 로 한꺼번에 의존성 패키지들을 설치하도록 스크립트를 만들어 놨습니다.

```javascript
hydroponics $ yarn ready
```