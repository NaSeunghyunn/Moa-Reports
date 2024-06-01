## 1. CSS 꾸미기할때 유용한것

아이콘 heroIcons, daisyui

## 2. Server Action

async function을 만들어서 "use server" 등록후 form의 action에 설정 submit의 서버로직 구현가능

## 3. useFormStatus

useFormStatus를 통해서 server action 처리상태를 확인 가능 pending 을 통해 로딩구현

## 4. useFormState

Server Action의 state값(action 메서드의 반환값등)을 async function의 매개변수로 주고받을수 있도록 해줌
필드 에러를 쉽게 표시할 수 있게됨
