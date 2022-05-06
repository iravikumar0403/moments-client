import { Layout, RequireAuth } from "components";
import { Feed, Login, Signup } from "pages";

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
        ],
      },
    ],
  },
];
