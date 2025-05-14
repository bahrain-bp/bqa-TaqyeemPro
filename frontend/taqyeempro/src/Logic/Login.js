// Logic/Login.js
import { Amplify } from 'aws-amplify';
import { signIn } from 'aws-amplify/auth';
import { getConfigByRole } from '../auth/amplifyConfig';

export async function loginUser(role, email, password) {
  try {
    // Configure Amplify dynamically based on role
    Amplify.configure(getConfigByRole(role));
    // Attempt to sign in
    const user = await signIn({ username: email, password });

    // after successful login
    sessionStorage.setItem('userRole', role); // store 'student' or 'moderator'

    return { success: true, user };
  } catch (err) {
    console.error("Login failed", err);
    return { success: false, message: err.message };
  }
}

