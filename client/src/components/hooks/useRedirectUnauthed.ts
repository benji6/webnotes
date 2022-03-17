import * as React from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../AppState";

export default function useRedirectUnauthed() {
  const { userEmail } = React.useContext(StateContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userEmail) navigate("/");
  }, []);
}
