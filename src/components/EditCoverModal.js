import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { closeModal } from "redux/features/modalSlice";
import { ButtonWithLoader } from "./ButtonWithLoader";
import { uploadImage } from "utils/uploadImage";
import { updateProfile } from "redux/features/userSlice";
import { useAuth } from "hooks/selectors";

export const EditCoverModal = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const updateCoverImage = async () => {
    setIsLoading(true);
    const data = {};
    if (file) {
      data.cover = await uploadImage(file);
    }
    dispatch(updateProfile(data)).then(() => {
      setIsLoading(false);
      dispatch(closeModal());
    });
  };

  return (
    <div className="p-5 mt-12 bg-white h-max shadow rounded border mx-2 max-w-full w-[30rem] dark:bg-slate-800 dark:text-white">
      <div className="flex justify-between">
        <h2 className="text-xl ">Edit Cover Image</h2>
        <button className="px-3" onClick={() => dispatch(closeModal())}>
          <IoIosClose size={"1.5rem"} />
        </button>
      </div>
      <div className="my-5 shadow-lg border-2 border-slate-500 rounded flex items-center justify-center">
        <img
          src={file ? URL.createObjectURL(file) : user.cover}
          alt="cover_img"
        />
      </div>
      <div className="flex flex-row-reverse">
        {!file ? (
          <>
            <label htmlFor="cover" className="btn-primary px-4 mx-2">
              Select Image
            </label>
            <input
              className="hidden"
              type="file"
              id="cover"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </>
        ) : (
          <ButtonWithLoader
            isLoading={isLoading}
            className="btn-primary px-4 ml-4 flex items-center"
            onClick={updateCoverImage}
          >
            Upload Image
          </ButtonWithLoader>
        )}
        <button
          className="btn-secondary px-4"
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
