// // src/utils/decodeJWT.js
// import jwt_decode from 'jwt-decode';

// export function getUserFromToken() {
//   const token = localStorage.getItem('idToken'); // Make sure you're saving idToken during login
//   if (!token) return null;

//   try {
//     const decoded = jwt_decode(token);
//     return {
//       sub: decoded.sub,
//       grade: decoded['custom:grade'],
//       email: decoded.email,
//       name: decoded.name
//     };
//   } catch (error) {
//     console.error("Failed to decode JWT:", error);
//     return null;
//   }
// }
