import { Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "redux/features/userSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginValidationSchema } from "utils/validationSchema";
import { useAuth } from "hooks/selectors";
import { ButtonWithLoader } from "components";

const initialFormValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isLoading, user } = useAuth();

  const handleSubmit = (values) => {
    dispatch(login({ ...values }));
  };

  const handleTestLogin = () => {
    dispatch(
      login({ email: "adarshbalak@moments.com", password: "adarshbalak" })
    );
  };

  if (user) {
    return <Navigate to={location.state?.from?.pathname || "/"} replace />;
  }
  return (
    <div className="flex justify-center h-screen pt-32 ">
      <div className="w-full max-w-[30rem] mx-10">
        <h1 className="text-2xl pb-5 text-center">Login</h1>
        <Formik
          initialValues={initialFormValues}
          onSubmit={handleSubmit}
          validationSchema={loginValidationSchema}
        >
          <Form className="flex flex-col p-8 rounded bg-white dark:bg-slate-800">
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
                <ErrorMessage name="email" />
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
                <ErrorMessage name="password" />
              </p>
            </div>
            <ButtonWithLoader
              type="submit"
              className="btn-primary my-2 flex justify-center items-center"
              isLoading={isLoading}
            >
              Login
            </ButtonWithLoader>
            <ButtonWithLoader
              className="btn-secondary my-2 flex justify-center items-center"
              type="button"
              isLoading={isLoading}
              onClick={handleTestLogin}
            >
              Login with test credentials
            </ButtonWithLoader>
            <div className="flex justify-center mt-2">
              <p className="mr-3">Don't have an account yet?</p>
              <Link className="text-teal-500 underline" to="/signup">
                Signup
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
