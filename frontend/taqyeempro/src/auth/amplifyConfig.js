export const getConfigByRole = (role) => {
  if (role === 'student') {
    return {
      Auth: {
        Cognito: {
          userPoolId: 'us-east-1_47NVNWV8G', // Pool ID
          userPoolClientId: '15ufc1evo8egl0heekd34r3kqn', // App Client ID
          loginWith: {
            username: false, // Optional
            email: true,   // Required
            phone: false    // Optional
          }
        },
      },
    };
  }

  return {
    Auth: {
      Cognito: {
        userPoolId: 'us-east-1_BbzxcR7Pb',
        userPoolClientId: '6ep9c58fkorog0bf587dit7qpb',
        loginWith: {
          username: false,
          email: true,
          phone: false,
        },
      },
    },
  };  
};
