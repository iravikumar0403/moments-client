import * as Yup from "yup";
export const signupValidationSchema = Yup.object({
  email: Yup.string().required("Required").email(),
  username: Yup.string()
    .required("Required")
    .max(25, "Maximum 25 characters allowed"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password should contain minimum 6 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  firstname: Yup.string()
    .required("Required")
    .max(35, "Max 35 characters only"),
  lastname: Yup.string().required("Required").max(35, "Max 35 characters only"),
  gender: Yup.string().required(),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().required("Required").email(),
  password: Yup.string().required("Required").min(6, "Invalid password"),
});

export const profileValidationSchema = Yup.object({
  email: Yup.string().required("Required").email(),
  firstname: Yup.string()
    .required("Required")
    .max(35, "Max 35 characters only"),
  lastname: Yup.string().required("Required").max(35, "Max 35 characters only"),
  bio: Yup.string().max(100, "Max 100 characters only"),
  website: Yup.string().url(),
});
