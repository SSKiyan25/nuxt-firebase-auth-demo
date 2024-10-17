import { object, string } from "yup";

export const LoginSchema = object({
  email: string().email().required().label("Email"),
  password: string().required().label("Password").min(6).max(20),
});
