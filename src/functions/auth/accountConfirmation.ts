import { bodyParser } from "@/utils/bodyParser";
import { response } from "@/utils/response";
import type { APIGatewayProxyEventV2 } from "aws-lambda";

import { handleError } from "@/utils/errorHandler";
import { ConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from '@/libs/cognitoClient';

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const { email, code } = bodyParser(event.body ?? "");

    const command = new ConfirmSignUpCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: email,
        ConfirmationCode: code,
    })

    await cognitoClient.send(command);

    return response(204, {
    });
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return response(statusCode, body);
  }
}
