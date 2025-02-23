import { UsernameExistsException, InvalidPasswordException } from "@aws-sdk/client-cognito-identity-provider";
import { ErrorMessages } from "@/utils/errorMessages";

const errorMap = new Map<new (...args: any[]) => Error, { statusCode: number; message: string }>([
  [UsernameExistsException, { statusCode: 409, message: ErrorMessages.USERNAME_EXISTS }],
  [InvalidPasswordException, { statusCode: 400, message: ErrorMessages.INVALID_PASSWORD }],
]);

export function handleError(error: any) {
  for (const [ErrorType, { statusCode, message }] of errorMap) {
    if (error instanceof ErrorType) {
      return {
        statusCode,
        body: { message },
      };
    }
  }

  return {
    statusCode: 500,
    body: {
      message: ErrorMessages.INTERNAL_SERVER_ERROR,
    },
  };
}
