import { CustomMessageTriggerEvent } from "aws-lambda";

const SIGN_UP_TEMPLATE = (code: string, userName: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: Arial, sans-serif;">

    <table role="presentation" style="width: 100%; background-color: #f4f7fa; padding: 20px;">
        <tr>
            <td align="center">
                <!-- Main container -->
                <table role="presentation" style="width: 600px; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td align="center">
                            <h1 style="font-size: 1.5em; color: #000000; margin: 0;">Bem-vindo(a), ${userName}</h1>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <h2 style="font-size: 1.2em; color: #000000; margin-top: 20px;">Seu código de confirmação é:</h2>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div style="font-size: 2em; font-weight: bold; color: #000000; margin-top: 20px; padding: 15px; background-color: #e9f7fe; border-radius: 5px;">
                                ${code}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top: 20px;">
                            <p style="font-size: 1em; color: #666666;">Por favor, use este código para confirmar sua ação. Se você não solicitou isso, ignore este e-mail.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top: 30px;">
                            <footer style="font-size: 0.8em; color: #888888;">
                                <p>Obrigado por usar o PrideCode.</p>
                            </footer>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>
</html>`;

const FORGOT_PASSWORD_TEMPLATE = (code: string, email: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperação de Conta</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: Arial, sans-serif;">

    <table role="presentation" style="width: 100%; background-color: #f4f7fa; padding: 20px;">
        <tr>
            <td align="center">
                <!-- Main container -->
                <table role="presentation" style="width: 600px; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td align="center">
                            <h1 style="font-size: 1.5em; color: #000000; margin: 0;">Recuperação de Conta</h1>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <div style="font-size: 1.2em; color: #000000; margin-top: 20px;">
                                Para recuperar sua conta, acesse: <a href="https://portal.pridecode.com.br/reset/?email=${encodeURIComponent(email)}&code=${code}">Recuperar Conta</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top: 20px;">
                            <p style="font-size: 1em; color: #666666;">Se você não solicitou essa recuperação, ignore este e-mail.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top: 30px;">
                            <footer style="font-size: 0.8em; color: #888888;">
                                <p>Obrigado por usar o PrideCode.</p>
                            </footer>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>
</html>`;

export async function handler(event: CustomMessageTriggerEvent) {
  const code     = event?.request?.codeParameter;
  const userName = event?.request?.userAttributes?.given_name;
  const email    = event?.request?.userAttributes?.email;

  if (event.triggerSource === 'CustomMessage_SignUp') {
    event.response.emailSubject = `Bem-vindo(a) ${userName} ao Portal Pride Code!`;
    event.response.emailMessage = SIGN_UP_TEMPLATE(code, userName);
  }

  if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    event.response.emailSubject = `Recuperação da Conta`;
    event.response.emailMessage = FORGOT_PASSWORD_TEMPLATE(code, email);
  }

  return event;
}
