import { Layout, RequireAuth } from "components";
import { Feed, Login } from "pages";

export const routes = [
  {
    path: "/login",
    element: <Login />,
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
