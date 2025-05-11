// src/logic/registerLogic.js
import { useState } from 'react';
import { signUp, confirmSignUp, signIn } from 'aws-amplify/auth';

export function useRegisterLogic() {
  const [step, setStep] = useState('signup');
  const [message, setMessage] = useState('');
  const [code, setCode] = useState('');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    grade: "",
    school: "",
    gender: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const signUpUser = async () => {
    try {
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            given_name: formData.firstName,
            family_name: formData.lastName,
            gender: formData.gender,
            birthdate: formData.dob,
            email: formData.email,
            'custom:grade': formData.grade,
            'custom:school': formData.school,
          }
        }
      });
      setMessage("Registered! Check your email.");
      setStep('confirm');
    } catch (err) {
      setMessage(`Sign up error: ${err.message}`);
    }
  };

  const confirmUser = async () => {
    try {
      await confirmSignUp({
        username: formData.email,
        confirmationCode: code
      });
      setMessage("Verified Successfully! You can now sign in.");
      setStep('signin');
    } catch (err) {
      setMessage(`Confirmation error: ${err.message}`);
    }
  };

  const signInUser = async () => {
    try {
      const user = await signIn({
        username: formData.email,
        password: formData.password
      });
      setMessage(`Signed in as ${user.firstName}`);
    } catch (err) {
      setMessage(`Sign in error: ${err.message}`);
    }
  };

  return {
    step, message, code, formData,
    setCode, handleChange,
    signUpUser, confirmUser, signInUser
  };
}
