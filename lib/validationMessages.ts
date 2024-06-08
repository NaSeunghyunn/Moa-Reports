import { INVALID } from "zod";

export const validationMessages = {
  min: (min: number) => `${min}桁以上入力してください。`,
  EMAIL: "有効なメールアドレスを入力してください。",
  EXISTS: "すでに存在しています。",
  INVALID_CONFIRM_PASSWORD: "パスワードと一致していません。",
  INVALID_LOGIN: "メールアドレスまたはパスワードが間違っています。",
};
