import { UsernameExistsException, InvalidPasswordException, CodeMismatchException, NotAuthorizedException, UserNotConfirmedException, UserNotFoundException, ExpiredCodeException, LimitExceededException, TooManyRequestsException } from "@aws-sdk/client-cognito-identity-provider";
import { ErrorMessages } from "@/utils/errorMessages";

const errorMap = new Map<new (...args: any[]) => Error, { statusCode: number; message: string }>([
  [UsernameExistsException, { statusCode: 409, message: ErrorMessages.USERNAME_EXISTS }],
  [InvalidPasswordException, { statusCode: 400, message: ErrorMessages.INVALID_PASSWORD }],
  [CodeMismatchException, { statusCode: 400, message: ErrorMessages.CODE_MISMATCH }],
  [NotAuthorizedException, { statusCode: 401, message: ErrorMessages.INVALID_CREDENTIALS }],
  [UserNotConfirmedException, { statusCode: 403, message: ErrorMessages.USER_NOT_CONFIRMED }],
  [UserNotFoundException, { statusCode: 404, message: ErrorMessages.USER_NOT_FOUND }],
  [ExpiredCodeException, { statusCode: 400, message: ErrorMessages.EXPIRED_CODE }],
  [LimitExceededException, { statusCode: 429, message: ErrorMessages.LIMIT_EXCEEDED }],
  [TooManyRequestsException, { statusCode: 429, message: ErrorMessages.TOO_MANY_REQUESTS }],
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
