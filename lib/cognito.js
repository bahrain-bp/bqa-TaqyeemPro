const { Stack, CfnOutput } = require('aws-cdk-lib');
const cognito = require('aws-cdk-lib/aws-cognito');

class CognitoTaqyeemProStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const smeUserPool = new cognito.UserPool(this, 'SMEUserPool', {
      userPoolName: 'SMEUserPool',
      selfSignUpEnabled: false,
      signInAliases: { email: true },
      autoVerify: { email: true },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY
    });

    const studentUserPool = new cognito.UserPool(this, 'StudentUserPool', {
      userPoolName: 'StudentUserPool',
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: true,
        requireUppercase: false,
        requireDigits: true,
        requireSymbols: false
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY
    });
  }
}

module.exports = { CognitoTaqyeemProStack };