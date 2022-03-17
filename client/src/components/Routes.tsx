import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import _404 from "./pages/_404";
import About from "./pages/About";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import Home from "./pages/Home";
import ResendVerification from "./pages/ResendVerification";
import SeeAlso from "./pages/SeeAlso";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="add" element={<AddNote />} />
      <Route path="change-password" element={<ChangePassword />} />
      <Route path="edit/:dateCreated" element={<EditNote />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="see-also" element={<SeeAlso />} />
      <Route path="resend-verification" element={<ResendVerification />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="verify" element={<Verify />} />
      <Route path="*" element={<_404 />} />
    </ReactRouterRoutes>
  );
}
