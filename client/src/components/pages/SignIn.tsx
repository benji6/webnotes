import { SignInPage } from "eri";
import * as React from "react";
import { createAuthenticatedUserAndSession } from "../../cognito";
import { DispatchContext } from "../AppState";
import { ERRORS } from "../../constants";
import { Link, useNavigate } from "react-router-dom";

// The properties declared here are by no means exhaustive
interface TokenPayload {
  email: string;
  sub: string;
}

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = React.useContext(DispatchContext);

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
                </>
              );

            case "NotAuthorizedException":
              return setSubmitError("Incorrect email/password");
            default:
              setSubmitError(
                "Something went wrong, check the data you have entered and try again"
              );
          }
        }
      }}
    />
  );
}
