if (!process.env.BUILD_TIME) throw Error("BUILD_TIME is undefined");
export const BUILD_TIME = process.env.BUILD_TIME;
export const ERRORS = {
  network: "Something went wrong, check your internet connection and try again",
  required: "Required",
} as const;
