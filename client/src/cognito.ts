import {
  CognitoIdToken,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

export const userPool = new CognitoUserPool({
  ClientId: "6fh45en2j6ulcthio9uncgrmtp",
  UserPoolId: "us-east-1_nGOzNfxNc",
});

export const getIdToken = (): Promise<CognitoIdToken> =>
  new Promise((resolve, reject) => {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser) return reject(Error("no current user"));
    currentUser.getSession(
      async (err: Error | void, session: CognitoUserSession) => {
        if (!err) return resolve(session.getIdToken());
        if (err.message === "User does not exist.") {
          currentUser.signOut();
          return reject(Error("no current user"));
        }
        reject(err);
      }
    );
  });
