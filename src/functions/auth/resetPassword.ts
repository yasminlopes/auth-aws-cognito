import { bodyParser } from "@/utils/bodyParser";
import { response } from "@/utils/response";
import type { APIGatewayProxyEventV2 } from "aws-lambda";

import { cognitoClient } from "@/libs/cognitoClient";
import { handleError } from "@/utils/errorHandler";
import { ErrorMessages } from "@/utils/errorMessages";
import { ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const { email, code, newPassword } = bodyParser(event.body ?? "");

    const command = new ConfirmForgotPasswordCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
      Password: newPassword,
    });

    await cognitoClient.send(command);

    return response(200, {
      message: ErrorMessages.PASSWORD_RESET,
    });
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return response(statusCode, body);
  }
}
