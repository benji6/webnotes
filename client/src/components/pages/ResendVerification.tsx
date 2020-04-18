import { CognitoUser } from "amazon-cognito-identity-js";
import { ResendVerificationPage } from "eri";
import { RouteComponentProps, navigate } from "@reach/router";
import * as React from "react";
import { userPool } from "../../cognito";
import { networkErrorMessage } from "../../constants";
import useRedirectAuthed from "../hooks/useRedirectAuthed";

const resendConfirmation = ({ email }: { email: string }) =>
  new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Pool: userPool,
      Username: email,
    });
    cognitoUser.resendConfirmationCode((err, result) =>
      err ? reject(err) : resolve(result)
    );
  });

export default function ResendVerification(_: RouteComponentProps) {
  useRedirectAuthed();
  return (
    <ResendVerificationPage
      onSubmit={async ({ email, setSubmitError }) => {
        try {
          await resendConfirmation({ email });
          navigate("/verify");
        } catch (e) {
          switch (e.code) {
            case "NetworkError":
              setSubmitError(networkErrorMessage);
              break;
            case "InvalidParameterException":
              setSubmitError(
                "Email address not recognised, try signing up instead"
              );
              break;
            case "UserNotFoundException":
              setSubmitError(
                "Email address has already been confirmed, please sign in"
              );
              break;
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
