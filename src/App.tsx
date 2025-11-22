import { RouterProvider } from "react-router-dom";
import { Provider } from "./components/ui/provider";
import { router } from "./router";
import { useEffect } from "react";
import { useColorMode } from "./components/ui/color-mode";

function App() {
  const { setColorMode } = useColorMode();
  useEffect(() => {
    setColorMode("dark");
  });
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
