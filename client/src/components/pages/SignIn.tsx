import { SignInPage } from "eri";
import { createAuthenticatedUserAndSession } from "../../cognito";
import { DispatchContext } from "../AppState";
import { ERRORS } from "../../constants";
import { Link, useNavigate } from "react-router";
import { use } from "react";

// The properties declared here are by no means exhaustive
interface TokenPayload {
  email: string;
  sub: string;
}

export default function SignIn() {
  const dispatch = use(DispatchContext);
  const navigate = useNavigate();

  return (
    <SignInPage
      onSubmit={async ({ email, password, setSubmitError }) => {
        try {
          const { cognitoUserSession } =
            await createAuthenticatedUserAndSession(email, password);
          const { email: tokenEmail } = cognitoUserSession.getIdToken()
            .payload as TokenPayload;
          dispatch({ type: "user/setEmail", payload: tokenEmail });
          navigate("/");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
          switch (e.code) {
            case "NetworkError":
              return setSubmitError(ERRORS.network);
            case "UserNotConfirmedException":
              return setSubmitError(
                <>
                  Check your email to verify your email address or{" "}
                  <Link to="/resend-verification">
                    resend the verification email
                  </Link>
                </>,
              );

            case "NotAuthorizedException":
              return setSubmitError("Incorrect email/password");
            default:
              setSubmitError(
                "Something went wrong, check the data you have entered and try again",
              );
          }
        }
      }}
    />
  );
}
