import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import { login } from "redux/features/userSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.user.user);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleTestLogin = () => {
    setEmail("adarshbalak@moments.com");
    setPassword("adarshbalak");
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
        <form
          className="flex flex-col p-8 rounded bg-white dark:bg-slate-800"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border w-full p-2 rounded focus:outline-none dark:bg-slate-600 border-slate-600"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border w-full p-2 rounded focus:outline-none dark:bg-slate-600 border-slate-600"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input className="btn-primary my-2" type="submit" value="Login" />
          <button
            className="btn-secondary my-2"
            type="button"
            onClick={handleTestLogin}
          >
            Login with test credentaials
          </button>
          <div className="flex justify-center mt-2">
            <p className="mr-3">Don't have an account yet?</p>
            <Link className="text-teal-500 underline" to="/signup">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
