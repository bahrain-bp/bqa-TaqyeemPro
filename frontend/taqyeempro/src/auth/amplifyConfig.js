export default {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_eEYD7dleP', // 🔁 Replace with your actual ID
      userPoolClientId: '1lf029ea976mg4hkj0chlro4i', // 🔁 Replace with your actual App Client ID
      loginWith: {
        username: false, // ✅ Required
        email: true,   // Optional
        phone: false    // Optional
      }
    }
  }
};


// export default{
//   region: 'us-east-1', // region
//   userPoolId: 'us-east-1_eEYD7dleP', // only use the StudentUserPool I
//   userPoolClientId: '1lf029ea976mg4hkj0chlro4i' // only the StudentUserPool App Client ID
// };

// import { configure } from 'aws-amplify/auth';
// configure({
//   region: 'us-east-1',
//   userPoolId: 'us-east-1_eEYD7dleP',
//   userPoolClientId: '1lf029ea976mg4hkj0chlro4i'
// });