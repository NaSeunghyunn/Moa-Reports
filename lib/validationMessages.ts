export const validationMessages = {
  minLength: (min: number) => `${min}桁以上入力してください。`,
  maxLength: (max: number) => `${max}桁以下入力してください。`,
  min: (min: number) => `${min}以上の数値を入力してください。`,
  max: (max: number) => `${max}以下の数値を入力してください。`,
  EMAIL: "有効なメールアドレスを入力してください。",
  EXISTS: "すでに存在しています。",
  INVALID_CONFIRM_PASSWORD: "パスワードと一致していません。",
  INVALID_LOGIN: "メールアドレスまたはパスワードが間違っています。",
  NAN: "半額数値を入力してください。",
};
