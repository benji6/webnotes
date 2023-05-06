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
import Tag from "./pages/Tag";
import { useContext } from "react";
import { StateContext } from "./AppState";

export default function Routes() {
  const { isNotesLoading, userEmail } = useContext(StateContext);
  const userIsLoggedIn = Boolean(userEmail);

  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Home />} />
      {userIsLoggedIn ? (
        <>
          {!isNotesLoading && (
            <>
              <Route path="add" element={<AddNote />} />
              <Route path="edit/:dateCreated" element={<EditNote />} />
              <Route path="tags" element={<Tag />} />
              <Route path="tags/:tag" element={<Tag />} />
            </>
          )}
          <Route path="change-password" element={<ChangePassword />} />
        </>
      ) : (
        <>
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="resend-verification" element={<ResendVerification />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="verify" element={<Verify />} />
        </>
      )}
      <Route path="about" element={<About />} />
      <Route path="see-also" element={<SeeAlso />} />
      <Route path="*" element={<_404 />} />
    </ReactRouterRoutes>
  );
}
