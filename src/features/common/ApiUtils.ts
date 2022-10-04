type CustomError = Error & { status: number };

export const handleApiError = async (
  error: Error | unknown,
): Promise<CustomError> => {
  if (error instanceof Error) {
    return error as CustomError;
  }
  console.log("予期せぬエラー", error);
  return error as CustomError;
};
