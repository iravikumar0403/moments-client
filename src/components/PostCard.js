import { Link, useNavigate } from "react-router-dom";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useAuth, usePosts } from "hooks/selectors";
import { PostOptions } from "./PostOptions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch } from "react-redux";
import { bookmarkPost, likePost } from "redux/features/postSlice";
import { Avatar } from "./Avatar";
import { RiShareForwardLine } from "react-icons/ri";
import { toast } from "react-toastify";
dayjs.extend(relativeTime);

export const PostCard = ({ post }) => {
  const { user } = useAuth();
  const { bookmarks } = usePosts();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShare = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${id}`);
    toast.success("Link copied to clipboard");
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded border-1 mx-2 md:mx-0 mb-5 shadow-md">
      <section className="flex items-center px-4 py-2 justify-between">
        <div className="flex items-center">
          <Avatar profile={post.author.avatar} name={post.author.firstname} />
          <div>
            <Link
              to={`profile/${post.author.username}`}
              className="px-4 text-lg"
            >
              {post.author.firstname + " " + post.author.lastname}
            </Link>
            <div>
              <p className="inline-block text-xs ml-4 text-slate-500">
                {dayjs(post.createdAt).fromNow()}
                {post.isEdited && <span className="ml-1">&bull; Edited</span>}
              </p>
            </div>
          </div>
        </div>
        {user._id === post.author._id && <PostOptions post={post} />}
      </section>
      <section className="px-4 text-justify">
        <p className="py-2">{post.content}</p>
      </section>
      {post.images.length > 0 && (
        <img className="w-full" src={post.images[0]} alt="" />
      )}
      <section className="flex p-4 justify-between">
        <div className="flex">
          <div className="flex items-center mr-2">
            <button
              className="p-2 mr-1 rounded-full text-2xl hover:bg-teal-50 hover:text-teal-500"
              title="like"
              onClick={() =>
                dispatch(likePost({ post_id: post._id, user_id: user._id }))
              }
            >
              {post.likes.includes(user._id) ? (
                <AiFillLike className="text-teal-500" />
              ) : (
                <AiOutlineLike />
              )}
            </button>
            <span>{post.likes.length}</span>
          </div>
          <div className="flex items-center mr-2">
            <button
              className="p-2 mr-1 rounded-full text-2xl hover:bg-teal-50 hover:text-teal-500"
              title="comment"
              onClick={() => {
                navigate(`/post/${post._id}`);
              }}
            >
              <BiCommentDetail />
            </button>
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className="flex">
          <button
            className="p-2 mx-2 rounded-full text-2xl hover:bg-teal-50 hover:text-teal-500"
            title="share"
            onClick={() => handleShare(post._id)}
          >
            <RiShareForwardLine />
          </button>
          <button
            className="py-2 px-3 mr-2 rounded-full text-2xl hover:bg-teal-50 hover:text-teal-500"
            title="bookmark"
            onClick={() => dispatch(bookmarkPost(post))}
          >
            {bookmarks.find((bookmark) => bookmark._id === post._id) ? (
              <BsBookmarkFill className="text-teal-500" size="1.1rem" />
            ) : (
              <BsBookmark size="1.1rem" />
            )}
          </button>
        </div>
      </section>
    </article>
  );
};
