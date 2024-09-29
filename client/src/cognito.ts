import {
  AuthenticationDetails,
  CognitoIdToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

export const userPool = new CognitoUserPool({
  ClientId: "6fh45en2j6ulcthio9uncgrmtp",
  UserPoolId: "us-east-1_nGOzNfxNc",
});

const authenticateUser = ({
  authenticationDetails,
  cognitoUser,
}: {
  authenticationDetails: AuthenticationDetails;
  cognitoUser: CognitoUser;
}): Promise<CognitoUserSession> =>
  new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onFailure: reject,
      onSuccess: resolve,
    });
  });

export const createAuthenticatedUserAndSession = async (
  email: string,
  password: string,
): Promise<{
  cognitoUser: CognitoUser;
  cognitoUserSession: CognitoUserSession;
}> => {
  const cognitoUser = createCognitoUser(email);
  const authenticationDetails = new AuthenticationDetails({
    Password: password,
    Username: email,
  });
  const cognitoUserSession = await authenticateUser({
    authenticationDetails,
    cognitoUser,
  });
  return { cognitoUser, cognitoUserSession };
};

export const createCognitoUser = (email: string): CognitoUser =>
  new CognitoUser({ Pool: userPool, Username: email });

export const getIdToken = (): Promise<CognitoIdToken> =>
  new Promise((resolve, reject) => {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser) return reject(Error("No current user"));
    currentUser.getSession((err: Error | null, session: CognitoUserSession) => {
      if (!err) return resolve(session.getIdToken());
      if (err.message === "User does not exist.") {
        currentUser.signOut();
        return reject(Error("No current user"));
      }
      reject(err);
    });
  });
