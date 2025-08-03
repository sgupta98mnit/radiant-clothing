import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    try {
      console.log("Google sign in started");
      const { user } = await signInWithGooglePopup();
      console.log("Google sign in successful:", user);
      await createUserDocumentFromAuth(user);
    } catch (error) {
      console.log("Google sign in failed", error);
      alert("Google sign in failed. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Sign in form submitted");

    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
    } catch (error) {
      console.log("user sign in failed", error);
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        case "auth/invalid-email":
          alert("Invalid email address");
          break;
        case "auth/too-many-requests":
          alert("Too many failed attempts. Please try again later.");
          break;
        default:
          alert("Sign in failed. Please try again.");
          console.error("Sign in error:", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
