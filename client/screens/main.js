import Task from "./task";
import { useSelector } from "react-redux";

import Login from "./login";

function Main() {
  const { auth } = useSelector((state) => state.auth);

  return (
    <>
      {auth && <Task />}
      {!auth && <Login />}
    </>
  );
}

export default Main;
