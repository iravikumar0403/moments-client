import { AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail, BiBookmark } from "react-icons/bi";

export const PostCard = () => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded border-1 mx-2 md:mx-0 mb-5">
      <section className="flex items-center px-4 py-2">
        <img
          className="w-12 rounded-full"
          src="https://i.pravatar.cc/300"
          alt="author name"
        />
        <div>
          <p className="px-4 text-lg">Test user</p>
          <p className="px-4 text-sm text-slate-500">user bio if available</p>
        </div>
      </section>
      <section className="px-4 text-justify">
        <p className="py-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel
          libero eu nibh ullamcorper blandit.
        </p>
      </section>
      {"src" && (
        <img className="w-full" src="https://picsum.photos/500/300" alt="" />
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
