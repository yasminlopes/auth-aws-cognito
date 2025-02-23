import { cognitoClient } from "@/libs/cognitoClient";
import { handleError } from "@/utils/errorHandler";
import { response } from "@/utils/response";
import { AdminGetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import type { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";

export async function handler(event: APIGatewayProxyEventV2WithJWTAuthorizer) {
  try {
    const userId = event.requestContext.authorizer.jwt.claims.sub as string;

    const command = new AdminGetUserCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: userId,
    });

    const { UserAttributes } = await cognitoClient.send(command);

    const attributeMap: { [key: string]: string } = {
      given_name : 'firstName',
      family_name: 'lastName',
      sub        : 'userId',
    };

    const profile = UserAttributes?.reduce((obj, { Name, Value }) => {
      if (Name) {
        return {
          ...obj,
          [attributeMap[Name] || Name]: Value,
        }
      }
      return obj;
    }, {})

    return response(200, { profile });
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return response(statusCode, body);
  }
}
