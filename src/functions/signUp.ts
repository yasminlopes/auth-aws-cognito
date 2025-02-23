import { bodyParser } from "@/utils/bodyParser";
import { response } from "@/utils/response";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from "@/libs/cognitoClient";
import { handleError } from "@/utils/errorHandler";
import { validatePassword } from "@/validators/passwordValidator";
import { ErrorMessages } from "@/utils/errorMessages";

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const body = bodyParser(event.body ?? "");

    if (!validatePassword(body.password)) {
      return response(400, {
        message: ErrorMessages.PASSWORD_CRITERIA,
      });
    }

    const command = new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: body.email,
      Password: body.password,
      UserAttributes: [
        { Name: "given_name", Value: body.firstName },
        { Name: "family_name", Value: body.lastName },
      ],
    });

    const { UserSub } = await cognitoClient.send(command);

    return response(201, {
      userId: UserSub,
    });
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return response(statusCode, body);
  }
}
