import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { Vote } from "./Vote";
import Results from "./Results";

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
        path: "/game",
        element: <Game />,
      },
      {
        path: "/vote",
        element: <Vote />,
      },
      {
        path: "/results",
        element: <Results />,
      }
    ],
  },
]);
