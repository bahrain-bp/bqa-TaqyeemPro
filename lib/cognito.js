const { Stack, CfnOutput } = require('aws-cdk-lib');
const cognito = require('aws-cdk-lib/aws-cognito');

class CognitoTaqyeemProStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const smeUserPool = new cognito.UserPool(this, 'SMEUserPool', {
      userPoolName: 'SMEUserPool',
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      standardAttributes: {
        givenName: { required: true, mutable: true },     // First Name
        familyName: { required: true, mutable: true },    // Last Name
        gender: { required: true, mutable: true },
        birthdate: { required: true, mutable: true },
        email: { required: true, mutable: true },
        phoneNumber: { required: true, mutable: true },
      },
    });

    const smeUserPoolClient = new cognito.UserPoolClient(this, 'SMEUserPoolClient', {
      userPool: smeUserPool,
      generateSecret: false
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
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      standardAttributes: {
        givenName: { required: true, mutable: true },     // First Name
        familyName: { required: true, mutable: true },    // Last Name
        gender: { required: true, mutable: true },
        birthdate: { required: true, mutable: true },
        email: { required: true, mutable: true },
      },
      customAttributes: {
        grade: new cognito.NumberAttribute({ mutable: true }),
        school: new cognito.StringAttribute({ mutable: true }),
      }
    });

    const studentUserPoolClient = new cognito.UserPoolClient(this, 'StudentUserPoolClient', {
      userPool: studentUserPool,
      generateSecret: false
    });

    // Outputs
    new CfnOutput(this, 'StudentUserPoolId', {
      value: studentUserPool.userPoolId,
    });

    new CfnOutput(this, 'StudentUserPoolClientId', {
      value: studentUserPoolClient.userPoolClientId,
    });

    new CfnOutput(this, 'SMEUserPoolId', {
      value: smeUserPool.userPoolId,
    });

    new CfnOutput(this, 'SMEUserPoolClientId', {
      value: smeUserPoolClient.userPoolClientId,
    });

  }
}

module.exports = { CognitoTaqyeemProStack };