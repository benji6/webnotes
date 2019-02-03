import { CognitoUserPool } from 'amazon-cognito-identity-js'

export const apiUri = 'https://api.webnotes.link'

export const userPool = new CognitoUserPool({
  ClientId: '6fh45en2j6ulcthio9uncgrmtp',
  UserPoolId: 'us-east-1_nGOzNfxNc',
})
