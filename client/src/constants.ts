if (!process.env.BUILD_TIME) throw Error("BUILD_TIME is undefined");
export const BUILD_TIME = process.env.BUILD_TIME;
export const ERRORS = {
  network: "Something went wrong, check your internet connection and try again",
  required: "Required",
} as const;
export const GH_USER_URL = "https://github.com/benji6";
export const REPO_URL = `${GH_USER_URL}/webnotes`;
export const REPO_ISSUES_URL = `${REPO_URL}/issues`;
