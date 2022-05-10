import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail, BiBookmark } from "react-icons/bi";
import { useAuth } from "hooks/selectors";
import { PostOptions } from "./PostOptions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const PostCard = ({ post }) => {
  const { user } = useAuth();
  return (
    <article className="bg-white dark:bg-gray-800 rounded border-1 mx-2 md:mx-0 mb-5">
      <section className="flex items-center px-4 py-2 justify-between">
        <div className="flex items-center">
          <img
            className="w-12 rounded-full"
            src={post.author.avatar || "https://i.pravatar.cc/300"}
            alt={post.author.firstname}
          />
          <div>
            <Link to={`profile/${post.author._id}`} className="px-4 text-lg">
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
        <div>
          <button
            className="p-2 mr-2 rounded-full text-2xl hover:bg-teal-50 hover:text-teal-500"
            title="like"
          >
            <AiOutlineLike />
          </button>
          <button
            className="p-2 mr-2 rounded-full text-2xl hover:bg-teal-50 hover:text-teal-500"
            title="comment"
          >
            <BiCommentDetail />
          </button>
        </div>
        <button
          className="p-2 mr-2 rounded-full text-2xl hover:bg-teal-50 hover:text-teal-500"
          title="save"
        >
          <BiBookmark />
        </button>
      </section>
    </article>
  );
};
