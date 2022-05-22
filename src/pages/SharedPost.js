import axios from "axios";
import { Comment, PostCard, PostSkeleton } from "components";
import { useAuth } from "hooks/selectors";
import { useAutoResize } from "hooks/useAutoResize";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

const initialTextAreaHeight = "42px";

export const SharedPost = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const textAreaRef = useAutoResize(comment, initialTextAreaHeight);
  useDocumentTitle(
    post?.author?.firstname ? `${post.author.firstname} / Moments` : ""
  );

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/${id}`
      );
      setPost(data);
    })();
  }, [id]);

  if (user) {
    return <Navigate to={`/post/${id}`} replace />;
  }

  return (
    <div className="grid-container container mx-auto max-w-screen-xl">
      <div className="hidden md:block sticky top-[10vh] h-[85vh] bg-white rounded mt-16 mx-auto p-4 w-full max-w-[18rem] dark:bg-slate-800">
        <Link
          to="/login"
          className="btn-primary w-full p-4 inline-block text-center"
        >
          Login to explore more
        </Link>
      </div>
      <main className="min-h-screen w-full px-4 pt-[10vh] pb-[10vh] md:pb-4 rounded">
        {post ? (
          <>
            <PostCard post={post} />
            <div className="flex items-center">
              <img
                className="w-12 rounded-full"
                src={"http://www.gravatar.com/avatar/?d=mp"}
                alt="avatar"
              />
              <textarea
                ref={textAreaRef}
                className="w-full h-10 border-1 border-teal-500 border-solid rounded p-2 ml-2 shadow-md resize-none dark:text-white dark:bg-slate-700 focus:outline-none"
                value={comment}
                maxLength="280"
                placeholder="Login to add a comment..."
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <Link
                to="/login"
                className="btn-primary flex items-center mx-2 px-5 shadow-md disabled:bg-teal-600"
              >
                Login
              </Link>
            </div>
            {post.comments
              .map((comment) => (
                <Comment comment={comment} post_id={post._id} />
              ))
              .reverse()}
          </>
        ) : (
          <PostSkeleton />
        )}
      </main>
    </div>
  );
};
