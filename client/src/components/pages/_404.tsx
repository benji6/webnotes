import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function _404() {
  const navigate = useNavigate();
  React.useEffect(() => navigate("/"));
  return null;
}
