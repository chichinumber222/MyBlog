import React from 'react';
import { Link } from 'react-router-dom';
import CustomFormField from '../../utils/custom-form-field';
import styles from './sign-in.module.scss';

function SignIn() {
  const handlerSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
  };

  return (
    <form className={styles.signIn} onSubmit={handlerSubmit}>
      <h2>Sign In</h2>
      <CustomFormField placeholder="Email address">Email address</CustomFormField>
      <CustomFormField placeholder="Password">Password</CustomFormField>
      <button className={styles.submit} type="submit">
        Login
      </button>
      <p className={styles.notHaveAnAccount}>
        Don’t have an account? <Link to="/sign-up"> Sign Up.</Link>
      </p>
    </form>
  );
}

export default SignIn;
