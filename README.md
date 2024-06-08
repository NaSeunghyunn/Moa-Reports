## 1. CSS 꾸미기할때 유용한것

아이콘 heroIcons, daisyui

## 2. Server Action

async function을 만들어서 "use server" 등록후 form의 action에 설정 submit의 서버로직 구현가능

## 3. useFormStatus

useFormStatus를 통해서 server action 처리상태를 확인 가능 pending 을 통해 로딩구현

## 4. useFormState

Server Action의 state값(action 메서드의 반환값등)을 async function의 매개변수로 주고받을수 있도록 해줌
필드 에러를 쉽게 표시할 수 있게됨

## 5. zod

서버 로직에서 유효성검사를 실시한다
모든 refine함수에서 async await를 하고싶다면 safeParseAsync를 이용

```javascript
await formSchema.safeParseAsync(input);
```

## 6. ORM

prisma

1. npm i prisma
2. npx prisma init
3. .env 파일 gitignore추가
4. extensions prisma 검색후 인스톨
5. model 엔티티 정의

```javascript
model User {
  id Int @id @default(autoincrement())
  username String
  email String @unique
  password String
  avatar String?
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}
```

6. 마이그레이션 npx prisma migrate dev -> 타입스크립트로 된 client가 생성 -> client를 통해 db와 소통
   new PrismaClient() 로 인스턴스생성

7. npx prisma studio 데이터베이스 gui도 제공

8. 연관관계
   연관관계된 모델을 삭제 (onDelete) 할 때 옵션 설정 가능 cascade , Restrict , NoAction , SetNull , SetDefault

## 7. password Hashing

1. npm i bcrypt
2. npm i @types/bcrypt
3. import bcrypt from "bcrypt";

## 8. 세션

1. iron-session은 암호화된 쿠키를 이용
2. 서버에 요청 -> 서버에서 암호화한 쿠키를 만들고 응답 -> 암호화된 쿠키는 서버에서 복호화
