import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import About from "./pages/About";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import PrivacyPolicy from "./pages/PrivacyPolicy";
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
import { use } from "react";
import { StateContext } from "./AppState";
import { Spinner } from "eri";
import RedirectHome from "./shared/RedirectHome";
import Layout from "./Layout";

function NotesDependantRoute() {
  const { isNotesLoading } = use(StateContext);
  return isNotesLoading ? <Spinner /> : <Outlet />;
}
function UserDependantRoute() {
  const { isUserLoading } = use(StateContext);
  return isUserLoading ? <Spinner /> : <Outlet />;
}
function UserSignedInRoute() {
  const { userEmail } = use(StateContext);
  return userEmail ? <Outlet /> : <RedirectHome />;
}
function UserNotSignedInRoute() {
  const { userEmail } = use(StateContext);
  return userEmail ? <RedirectHome /> : <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "about", element: <About /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "see-also", element: <SeeAlso /> },
      {
        element: <UserDependantRoute />,
        children: [
          { index: true, element: <Home /> },
          {
            element: <UserSignedInRoute />,
            children: [
              { path: "change-password", element: <ChangePassword /> },
              {
                element: <NotesDependantRoute />,
                children: [
                  { path: "add", element: <AddNote /> },
                  { path: "edit/:dateCreated", element: <EditNote /> },
                  { path: "tags", element: <Tag /> },
                  { path: "tags/:tag", element: <Tag /> },
                ],
              },
            ],
          },
          {
            element: <UserNotSignedInRoute />,
            children: [
              { path: "forgot-password", element: <ForgotPassword /> },
              { path: "resend-verification", element: <ResendVerification /> },
              { path: "reset-password", element: <ResetPassword /> },
              { path: "sign-in", element: <SignIn /> },
              { path: "sign-up", element: <SignUp /> },
              { path: "verify", element: <Verify /> },
            ],
          },
        ],
      },
    ],
  },
  { path: "*", element: <RedirectHome /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
