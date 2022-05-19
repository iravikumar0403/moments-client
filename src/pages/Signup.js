import { Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupValidationSchema } from "utils/validationSchema";
import { signup } from "redux/features/userSlice";
import { useAuth } from "hooks/selectors";
import { ButtonWithLoader } from "components";
import { useDocumentTitle } from "hooks/useDocumentTitle";

const formInitialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  firstname: "",
  lastname: "",
  username: "",
  gender: "male",
};

export const Signup = () => {
  useDocumentTitle("Signup / Moments");
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading, user } = useAuth();

  const handleSubmit = (values) => {
    dispatch(signup({ ...values }));
  };

  if (user) {
    return <Navigate to={location.state?.from?.pathname || "/"} replace />;
  }

  return (
    <div className="flex justify-center min-h-screen pt-16">
      <div className="w-full max-w-[30rem] mx-10">
        <h1 className="text-2xl pb-5 text-center">Signup</h1>
        <Formik
          initialValues={formInitialValues}
          onSubmit={handleSubmit}
          validationSchema={signupValidationSchema}
        >
          <Form className="flex flex-col p-8 mb-10 rounded bg-white dark:bg-slate-800">
            <div className="flex gap-x-1.5">
              <div className="mb-3 items-center">
                <label className="block" htmlFor="firstname">
                  Firstname
                </label>
                <Field
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="border w-full p-2 rounded focus:outline-none dark:bg-slate-600 border-slate-600"
                  placeholder="Firstname"
                />
                <p className="text-red-500">
                  <ErrorMessage name="firstname" className="text-red-300" />
                </p>
              </div>
              <div className="mb-3 items-center">
                <label className="block" htmlFor="lastname">
                  Lastname
                </label>
                <Field
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="border w-full p-2 rounded focus:outline-none dark:bg-slate-600 border-slate-600"
                  placeholder="Lastname"
                />
                <p className="text-red-500">
                  <ErrorMessage name="lastname" className="text-red-300" />
                </p>
              </div>
            </div>
            <div className="mb-3">
              <label className="block" htmlFor="username">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="border w-full p-2 rounded focus:outline-none dark:bg-slate-600 border-slate-600"
                placeholder="Username"
              />
              <p className="text-red-500">
                <ErrorMessage name="username" className="text-red-300" />
              </p>
            </div>
            <div className="mb-3">
              <label className="block" htmlFor="email">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="border w-full p-2 rounded focus:outline-none dark:bg-slate-600 border-slate-600"
                placeholder="Email"
              />
              <p className="text-red-500">
                <ErrorMessage name="email" className="text-red-300" />
              </p>
            </div>
            <div className="mb-3">
              <label className="block" htmlFor="password">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="border w-full p-2 rounded focus:outline-none dark:bg-slate-600 border-slate-600"
                placeholder="Password"
              />
              <p className="text-red-500">
                <ErrorMessage name="password" className="text-red-300" />
              </p>
            </div>
            <div className="mb-3">
              <label className="block" htmlFor="confirm-password">
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirm-password"
                name="confirmPassword"
                className="border w-full p-2 rounded focus:outline-none dark:bg-slate-600 border-slate-600"
                placeholder="Confirm Password"
              />
              <p className="text-red-500">
                <ErrorMessage name="confirmPassword" className="text-red-300" />
              </p>
            </div>
            <div className="flex gap-x-5 items-center my-2">
              <p>Gender</p>
              <div>
                <Field
                  className="mr-2"
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                />
                <label htmlFor="male">Male</label>
              </div>
              <div>
                <Field
                  className="mr-2"
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            <ButtonWithLoader
              className="flex items-center justify-center btn-primary my-2"
              type="submit"
              value="Signup"
              isLoading={isLoading}
            >
              Signup
            </ButtonWithLoader>
            <div className="flex justify-center mt-2">
              <p className="mr-3">Already a user?</p>
              <Link className="text-teal-500 underline" to="/login">
                Login
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
