// src/logic/registerLogic.js
import { useState } from 'react';
import { signUp, confirmSignUp, signIn } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { getConfigByRole } from '../auth/amplifyConfig';

export function useRegisterLogic(role) {
  const [step, setStep] = useState('signup');
  const [message, setMessage] = useState('');
  const [code, setCode] = useState('');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    grade: "",
    schoolId: "",
    gender: "",
    email: "",
    password: "",
    phoneNumber: "", // only used for moderator
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const signUpUser = async (data) => {
    try {
      Amplify.configure(getConfigByRole(role)); 

      const userAttributes = {
        given_name: data.firstName,
        family_name: data.lastName,
        gender: data.gender,
        birthdate: data.dateOfBirth,
        email: data.email,
      };

      // Add role-specific attributes
      if (role === 'student') {
        userAttributes['custom:grade'] = data.grade;
        userAttributes['custom:school'] = data.schoolId;
      } else if (role === 'moderator') {
        userAttributes['phone_number'] = data.phoneNumber;
      }

      await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes,
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
      Amplify.configure(getConfigByRole(role));
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
      Amplify.configure(getConfigByRole(role));
      const user = await signIn({
        username: formData.email,
        password: formData.password
      });
      setMessage(`Signed in as ${formData.firstName}`);
    } catch (err) {
      setMessage(`Sign in error: ${err.message}`);
    }
  };

  return {
    step, message, code, formData,
    setCode, handleChange, setFormData,
    signUpUser, confirmUser, signInUser
  };
}
