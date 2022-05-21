import {
  Followers,
  Following,
  Layout,
  RequireAuth,
  UserPosts,
} from "components";
import {
  Bookmarks,
  Explore,
  Feed,
  Login,
  Notifications,
  Profile,
  SharedPost,
  Signup,
  SinglePost,
} from "pages";

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
    path: "/post/share/:id",
    element: <SharedPost />,
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
          {
            path: "/notifications",
            element: <Notifications />,
          },
          {
            path: "/profile",
            element: <Profile />,
            children: [
              {
                index: true,
                element: <UserPosts />,
              },
            ],
          },
          {
            path: "/profile/:username",
            element: <Profile />,
            children: [
              {
                index: true,
                element: <UserPosts />,
              },
              {
                path: "/profile/:username/followers",
                element: <Followers />,
              },
              {
                path: "/profile/:username/following",
                element: <Following />,
              },
            ],
          },
        ],
      },
    ],
  },
];
