import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { SignUpPage } from "eri";
import { userPool } from "../../cognito";
import useRedirectAuthed from "../hooks/useRedirectAuthed";
import { ERRORS } from "../../constants";
import { useNavigate } from "react-router-dom";

const signUp = ({
  attributeList,
  email,
  password,
}: {
  attributeList: CognitoUserAttribute[];
  email: string;
  password: string;
}) =>
  new Promise((resolve, reject) => {
    userPool.signUp(
      email,
      password,
      attributeList,
      null as any,
      (err: Error | void, result) => (err ? reject(err) : resolve(result))
    );
  });

export default function SignUp() {
  useRedirectAuthed();
  const navigate = useNavigate();

  return (
    <SignUpPage
      onSubmit={async ({ email, password, setSubmitError }) => {
        const attributeList = [
          new CognitoUserAttribute({ Name: "email", Value: email }),
        ];
        try {
          await signUp({ attributeList, email, password });
          navigate("/verify");
        } catch (e: any) {
          switch (e.code) {
            case "NetworkError":
              setSubmitError(ERRORS.network);
              break;
            case "UsernameExistsException":
              setSubmitError("Username already exists, try signing in instead");
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
