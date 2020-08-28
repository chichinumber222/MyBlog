import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CustomFormField from '../../utils/custom-form-field';
import styles from './sign-in.module.scss';

function SignIn() {
  const { register, handleSubmit, errors } = useForm();

  const handlerSubmit = () => {
    console.log('submit');
  };

  return (
    <form className={styles.signIn} onSubmit={handleSubmit(handlerSubmit)}>
      <h2>Sign In</h2>
      <CustomFormField 
        name="email" 
        id="signIn__email" 
        ref={register({ pattern: /\S+@\S+\.\S+/i, required: true })} 
        placeholder="Email address"
        errorMessage={errors.email && 'Enter correct email'}
      >
        Email address
      </CustomFormField>
      <CustomFormField 
        name="pass" 
        id="signIn__pass" 
        type="password"
        ref={register({ required: true })}
        placeholder="Password"
        errorMessage={errors.pass && 'Your password needs to be at least 8 characters.'}
      >
        Password
      </CustomFormField>
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
