import { createBrowserRouter } from "react-router-dom";
import Root, { AuthGuard } from "./Root";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Vote from "./pages/Vote";
import Recap from "./pages/Recap";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <AuthGuard />,
        children: [
          {
            path: "/game",
            element: <Game />,
          },
          {
            path: "/vote",
            element: <Vote />,
          },
          {
            path: "/recap",
            element: <Recap />,
          },
        ],
      },
    ],
  },
]);
