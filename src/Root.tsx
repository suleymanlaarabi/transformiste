import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./hooks/useUser";

export default function Root() {
  return <Outlet />;
}

export function AuthGuard() {
  const user = useUser();

  if (!user.name) return <Navigate to={"/"} />;
  return <Outlet />;
}
