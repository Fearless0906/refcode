export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  // Handle object errors with response structure
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response
  ) {
    const responseData = error.response.data;
    if (typeof responseData === "string") {
      return responseData;
    }
    if (typeof responseData === "object" && responseData !== null) {
      if ("detail" in responseData && typeof responseData.detail === "string") {
        return responseData.detail;
      }
      if (
        "message" in responseData &&
        typeof responseData.message === "string"
      ) {
        return responseData.message;
      }
    }
  }
  return "An unknown error occurred";
};
