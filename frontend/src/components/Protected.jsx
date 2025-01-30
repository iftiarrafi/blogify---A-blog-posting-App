import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NoPermission from "./NoPermission";

const Protected = () => {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);

    if (token) setOk(true);
    else setOk(false);
  }, []);

  return ok ? <Outlet /> : <NoPermission />;
};

export default Protected;
