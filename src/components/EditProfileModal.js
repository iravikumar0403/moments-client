import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { useAuth } from "hooks/selectors";
import { closeModal } from "redux/features/modalSlice";
import { ButtonWithLoader } from "./ButtonWithLoader";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { profileValidationSchema } from "utils/validationSchema";
import { HiPencilAlt } from "react-icons/hi";
import { uploadImage } from "utils/uploadImage";
import { updateProfile } from "redux/features/userSlice";

export const EditProfileModal = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    if (file) {
      values.avatar = await uploadImage(file);
    }
    dispatch(updateProfile(values)).then(() => {
      setIsLoading(false);
      dispatch(closeModal());
    });
  };

  const handleClick = (e) =>
    e.target === e.currentTarget && dispatch(closeModal());

  return (
    <div
      className="absolute top-0 left-0 h-screen w-full backdrop-blur-sm mt-[8vh] flex justify-center"
      onClick={handleClick}
    >
      <div className="p-5 mt-12 bg-white h-max shadow rounded border mx-2 max-w-full w-[30rem] dark:bg-slate-800 dark:text-white">
        <div className="flex justify-between">
          <h2 className="text-xl ">Edit Profile</h2>
          <button className="px-3" onClick={() => dispatch(closeModal())}>
            <IoIosClose size={"1.5rem"} />
          </button>
        </div>
        <Formik
          initialValues={{ ...user }}
          onSubmit={handleSubmit}
          validationSchema={profileValidationSchema}
        >
          <Form className="flex flex-col p-8 pb-0 rounded bg-white dark:bg-slate-800">
            <div className="mb-3 text-center">
              <label className="inline-block relative cursor-pointer">
                <img
                  className="rounded-full inline-block h-24 w-24"
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : user.profile || "http://www.gravatar.com/avatar/?d=mp"
                  }
                  alt="profile"
                />
                <span className="inline-block absolute bottom-1 -right-2 p-2 rounded-full bg-slate-200 dark:bg-slate-500">
                  <HiPencilAlt />
                </span>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
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
              <label className="block" htmlFor="bio">
                Bio
              </label>
              <Field
                as="textarea"
                type="text"
                id="bio"
                name="bio"
                className="border w-full p-2 rounded focus:outline-none dark:bg-slate-600 border-slate-600 resize-none"
                placeholder="bio"
              />
              <p className="text-red-500">
                <ErrorMessage name="bio" className="text-red-300" />
              </p>
            </div>
            <div className="mb-3">
              <label className="block" htmlFor="website">
                Website
              </label>
              <Field
                type="url"
                id="website"
                name="website"
                className="border w-full p-2 rounded focus:outline-none dark:bg-slate-600 border-slate-600"
                placeholder="https://ravikumar0403.netlify.app"
              />
              <p className="text-red-500">
                <ErrorMessage name="bio" className="text-red-300" />
              </p>
            </div>
            <div className="flex flex-row-reverse">
              <ButtonWithLoader
                className="flex items-center btn-primary px-5 m-2"
                type="submit"
                value="Signup"
                isLoading={isLoading}
              >
                Save
              </ButtonWithLoader>
              <button
                className="flex items-center btn-secondary px-5 m-2"
                type="button"
                onClick={() => dispatch(closeModal())}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
