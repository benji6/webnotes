import { ResendVerificationPage } from "eri";
import { RouteComponentProps, navigate } from "@reach/router";
import * as React from "react";
import { createCognitoUser } from "../../cognito";
import useRedirectAuthed from "../hooks/useRedirectAuthed";
import { ERRORS } from "../../constants";

const resendConfirmation = ({ email }: { email: string }) =>
  new Promise((resolve, reject) => {
    createCognitoUser(email).resendConfirmationCode((err, result) =>
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
        } catch (e: any) {
          switch (e.code) {
            case "NetworkError":
              setSubmitError(ERRORS.network);
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
