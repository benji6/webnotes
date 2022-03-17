import { ResendVerificationPage } from "eri";
import { createCognitoUser } from "../../cognito";
import useRedirectAuthed from "../hooks/useRedirectAuthed";
import { ERRORS } from "../../constants";
import { useNavigate } from "react-router-dom";

const resendConfirmation = ({ email }: { email: string }) =>
  new Promise((resolve, reject) => {
    createCognitoUser(email).resendConfirmationCode((err, result) =>
      err ? reject(err) : resolve(result)
    );
  });

export default function ResendVerification() {
  useRedirectAuthed();
  const navigate = useNavigate();

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
