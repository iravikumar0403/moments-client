import { Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "redux/features/userSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginValidationSchema } from "utils/validationSchema";
import { useAuth } from "hooks/selectors";

const initialFormValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isLoading, user } = useAuth();

  const handleSubmit = (values) => {
    console.log(values);
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
            <button
              type="submit"
              className="btn-primary my-2 flex justify-center items-center"
              disabled={isLoading}
            >
              <span className="mx-2">Login</span>
              {isLoading && (
                <svg
                  role="status"
                  class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
            </button>
            <button
              className="btn-secondary my-2 flex justify-center items-center"
              type="button"
              disabled={isLoading}
              onClick={handleTestLogin}
            >
              <span className="mx-2 ">Login with test credentaials</span>
              {isLoading && (
                <svg
                  role="status"
                  class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
            </button>
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
