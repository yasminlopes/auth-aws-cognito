import { bodyParser } from "@/utils/bodyParser";
import { response } from "@/utils/response";
import type { APIGatewayProxyEventV2 } from "aws-lambda";

import { cognitoClient } from "@/libs/cognitoClient";
import { handleError } from "@/utils/errorHandler";
import { ForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";
import { ErrorMessages } from "@/utils/errorMessages";

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const { email } = bodyParser(event.body ?? "");

    const command = new ForgotPasswordCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
    });

    await cognitoClient.send(command);

    return response(200, {
      message: ErrorMessages.CODE_SENT,
    });
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return response(statusCode, body);
  }
}
