import { Layout, RequireAuth } from "components";
import { Bookmarks, Explore, Feed, Login, Signup } from "pages";
import { SinglePost } from "../pages/SinglePost";

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Feed />,
          },
          {
            path: "/explore",
            element: <Explore />,
          },
          {
            path: "/bookmarks",
            element: <Bookmarks />,
          },
          {
            path: "/post/:id",
            element: <SinglePost />,
          },
        ],
      },
    ],
  },
];
