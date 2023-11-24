import {
  Route,
  Routes as ReactRouterRoutes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
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
import { Spinner } from "eri";
import RedirectHome from "./shared/RedirectHome";
import Layout from "./Layout";

function Root() {
  const { isNotesLoading, isUserLoading, userEmail } = useContext(StateContext);
  const userIsLoggedIn = Boolean(userEmail);

  return (
    <ReactRouterRoutes>
      <Route element={<Layout />}>
        <Route path="about" element={<About />} />
        <Route path="see-also" element={<SeeAlso />} />
        {isUserLoading ? (
          <Route path="*" element={<Spinner />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            {userIsLoggedIn ? (
              <>
                {isNotesLoading ? (
                  <Route path="*" element={<Spinner />} />
                ) : (
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
                <Route
                  path="resend-verification"
                  element={<ResendVerification />}
                />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="verify" element={<Verify />} />
              </>
            )}
            <Route path="*" element={<RedirectHome />} />
          </>
        )}
      </Route>
    </ReactRouterRoutes>
  );
}

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  return <RouterProvider router={router} />;
}
