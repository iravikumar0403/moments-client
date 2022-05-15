import { Avatar } from "./Avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const Comment = ({ comment }) => {
  return (
    <div className="flex items-start bg-white p-2 rounded shadow my-2 dark:bg-slate-800">
      <div className="my-2">
        <Avatar
          profile={comment.author.avatar}
          name={comment.author.firstname}
        />
      </div>
      <div className="ml-4 mt-1">
        <p className="text-lg">
          {comment.author.firstname} {comment.author.lastname}
        </p>
        <p className="text-md text-slate-800 dark:text-slate-100">
          {comment.content}
        </p>
        <div className="flex items-center mr-2">
          <span className="text-xs text-slate-600 dark:text-slate-300">
            {dayjs(comment.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};
