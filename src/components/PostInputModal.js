import { useModal, usePosts } from "hooks/selectors";
import { useAutoResize } from "hooks/useAutoResize";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { closeModal } from "redux/features/modalSlice";
import { addPost, editPost } from "redux/features/postSlice";

const initialTextAreaHeight = "5rem";

export const PostInputModal = () => {
  const { selectedPost } = useModal();
  const [postContent, setPostContent] = useState(selectedPost?.content || "");
  const [files, setFiles] = useState([]);
  const { creatingPost } = usePosts();
  const textAreaRef = useAutoResize(postContent, initialTextAreaHeight);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPost) {
      dispatch(
        editPost({
          _id: selectedPost._id,
          content: postContent,
        })
      );
    } else {
      const post = {
        content: postContent,
        images: files[0],
      };
      dispatch(addPost(post));
    }
    dispatch(closeModal());
  };

  return (
    <div className="p-5 mt-12 bg-white h-max shadow rounded border mx-2 max-w-full w-[30rem] dark:bg-slate-800 dark:text-white">
      <div className="flex justify-between">
        <h2 className="text-xl ">Share a moment</h2>
        <button className="px-3" onClick={() => dispatch(closeModal())}>
          <IoIosClose size={"1.5rem"} />
        </button>
      </div>
      <form className="flex flex-col w-max-full mt-4" onSubmit={handleSubmit}>
        <textarea
          ref={textAreaRef}
          maxLength="280"
          className="focus:outline-none p-2 resize-none border rounded dark:bg-slate-700 dark:text-white"
          onChange={(e) => setPostContent(e.target.value)}
          value={postContent}
        ></textarea>
        <span className="text-right text-xs text-slate-400">
          {280 - postContent.length} characters remaining
        </span>
        <div>
          {(files.length > 0 || selectedPost?.images > 0) && (
            <img
              className="h-32 mx-auto my-2 rounded"
              src={
                files.length
                  ? URL.createObjectURL(files[0])
                  : selectedPost.images[0]
              }
              alt=""
            />
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          {!selectedPost && (
            <label className="p-2 mr-2 rounded-full block hover:bg-teal-100 hover:text-teal-600">
              <RiImageAddLine size={"1.2rem"} />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
              />
            </label>
          )}
          <button
            disabled={creatingPost}
            className="btn-primary px-5 flex items-center ml-auto"
            type="submit"
          >
            {selectedPost ? "Update" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};
