import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NoPermission from "./NoPermission";
import { useSelector } from "react-redux";

const Protected = () => {
  const token = useSelector((state) => state.auth.token);

  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (token) setOk(true);
    else setOk(false);
  }, [token]);

  return ok ? <Outlet /> : <NoPermission />;
};

export default Protected;
