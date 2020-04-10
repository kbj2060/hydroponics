# hydroponics

---

![alt example](example.png)
이 프로젝트는 수경재배 시스템을 구동하는 데에 있어 기본적인 기능을 제공하는 사이트 제작 프로젝트입니다. 프론트엔드는 자바스크립트를 이루어져 있으며 백엔드는 apollo와 prisma로 구현했습니다. 데이터베이스는 prisma MYSQL로 이루어져 있습니다.

수정하기 쉽게 package.json의 scripts 항목을 수정하였습니다.
yarn client - 프론트엔드의 구현만 보여주는 스크립트
yarn server - graphql 서버를 작동시키는 스크립트
yarn prisma - prisma의 변경사항 적용 스크립트
yarn dev - 백엔드와 프론트엔드 동시 작동 스크립트
yarn ready - 의존성 패키지 모두 설치 스크립트

우선 다운받아야 할 패키지는 아래와 같습니다.

```javascript
hydroponics $ npm i concurrently nodemon express
```

이 프로젝트 사이트를 구동하기 위해서는 npm install이 필요합니다.
package.json 에서 yarn ready 로 한꺼번에 의존성 패키지들을 설치하도록 스크립트를 만들어 놨습니다.

```javascript
hydroponics $ yarn ready
```

패키지들을 모두 설치한 후, 포트설정이나 패키지 설정 등 기본 환경 설정은 아래의 파일에서 수정 가능합니다. 본인의 환경에 맞게 아래 파일을 수정바랍니다.
prisma - graphql/prisma/prisma.yml
docker - graphql/docker-compose.yml
javascript(client) - client/package.json
javascript(server) - package.json

패키지 설치를 마쳤다면 이제 도커 설정할 차례입니다.

```javascript
hydroponics/graphql $ docker-compose up -d
```

위의 과정이 모두 제대로 작동한다면 yarn dev를 통해 홈페이지를 구동시킬 수 있습니다.
