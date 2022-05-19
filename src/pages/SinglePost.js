import React, { useEffect, useState } from "react";
import { ButtonWithLoader, Comment, Loader, PostCard } from "components";
import { useAuth, usePosts } from "hooks/selectors";
import { useAutoResize } from "hooks/useAutoResize";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addComment, getPostById } from "redux/features/postSlice";
import { useDocumentTitle } from "hooks/useDocumentTitle";

const initialTextAreaHeight = "42px";

export const SinglePost = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loading, commentLoading, currentPost } = usePosts();
  const [comment, setComment] = useState("");
  const textAreaRef = useAutoResize(comment, initialTextAreaHeight);
  useDocumentTitle(
    currentPost?.author?.firstname
      ? `${currentPost.author.firstname} / Moments`
      : ""
  );

  useEffect(() => {
    dispatch(getPostById(params.id));
  }, [dispatch, params.id]);

  if (loading || !currentPost) {
    return <Loader />;
  }

  return (
    <>
      <button
        className="px-2 py-2 rounded text-2xl"
        onClick={() => navigate(-1)}
        title="Go back"
      >
        &larr;
      </button>
      <PostCard post={currentPost} />
      <div className="flex items-center">
        <img
          className="w-12 rounded-full"
          src={user.avatar || "http://www.gravatar.com/avatar/?d=mp"}
          alt={user.firstname}
        />
        <textarea
          ref={textAreaRef}
          className="w-full h-10 border-1 border-teal-500 border-solid rounded p-2 ml-2 shadow-md resize-none dark:text-white dark:bg-slate-700 focus:outline-none"
          value={comment}
          maxLength="280"
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <ButtonWithLoader
          className="btn-primary flex items-center mx-2 px-5 shadow-md"
          isLoading={commentLoading}
          disabled={!comment}
          onClick={() => {
            dispatch(
              addComment({ post_id: currentPost._id, comment: comment })
            );
            setComment("");
          }}
        >
          Post
        </ButtonWithLoader>
      </div>
      {currentPost.comments
        .map((comment) => (
          <Comment comment={comment} post_id={currentPost._id} />
        ))
        .reverse()}
    </>
  );
};
