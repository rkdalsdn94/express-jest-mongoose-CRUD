# Express + Mongoose + Jest + MongoDB를 이용한 CRUD

## Goal

- Jest를 활용한 Uint, Integration Test 작성
- MongoDB와 Mongoose를 활용한 CRUD 작성

<br>

## 설치 방법

---

아래의 단계를 차례대로 진행하면 됩니다.

## Repo 복사

```bash
git clone https://github.com/rkdalsdn94/express-jest-mongoose-CRUD.git
cd express-jest-mongoose-CRUD
npx rimraf ./.git
```

## Dependencies 설치

```bash
npm install
```

## 환경 변수 설정

---

`.env.samle` 파일을 `.env` 이름으로 복사 후 환경 변수 설정

```bash
cp .env.sample .env

# ex
MONGODB_URL=mongodb+srv://slekfjlksejijcmseml # 이러한 형식
PORT=3000 # 본인이 사용하고 싶은 포트 번호 입력
```

## 실행

---

```bash
# 통합, 단위 테스트 모두 실행
npm test

# 통합 테스트만 실행
npm test test/integration/products.int.test.js

# 단위 테스트만 실행
npm test test/unit/products.test.js

# 서버 실행
npm run start
```
<br>

## 프로젝트 구조

---

```bash
├── README.md
├── controller\
│   └── product.js                      # 자바나 Nest에서 Service 부분
├── models\
│   └── product.model.js                # 몽고DB 스키마
├── package-lock.json
├── package.json
├── routes.js                           # 라우트 경로
├── server.js                           # 서버 설정
└── test
    ├── data
    │   ├── all-products.json           # 테스트를 위한 여러 개의 상품
    │   └── new-product.json            # 테스트를 위한 단일 상품
    ├── integration
    │   └── products.int.test.js        # 통합 테스트
    └── unit
        └── products.test.js            # 유닛 테스트

```

<br>

## API 문서

---

`POST /api/products` - Create product \
`GET /api/products` - Get All product \
`GET /api/products:productId` - Get product \
`PUT /api/products:productId` - Update product \
`DELETE /api/products:productId` - Delete product

<br>

## 기본 스키마 폼

---

```json
{
	"name": "상품명",
	"description": "상품 설명",
	"price": 100000
}
```