import dayjs from "dayjs";
import { LATEST_FIRST, OLDEST_FIRST, TRENDING } from "./constants";

export const sortPosts = (posts, sortBy = LATEST_FIRST) => {
  if (posts.length === 0) return [];
  switch (sortBy) {
    case LATEST_FIRST:
      return posts;
    case OLDEST_FIRST:
      return [...posts].sort((a, b) =>
        dayjs(a.createdAt).diff(dayjs(b.createdAt))
      );
    case TRENDING:
      return [...posts].sort(
        (a, b) =>
          b.likes.length +
          b.comments.length -
          (a.likes.length + a.comments.length)
      );
    default:
      break;
  }
  return posts;
};
