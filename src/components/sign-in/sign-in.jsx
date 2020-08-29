import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CustomFormField from '../../utils/custom-form-field';
import styles from './sign-in.module.scss';

function SignIn({history, asyncAuthenticationWithDispatch}) {
  const { register, handleSubmit, watch, errors } = useForm();

  const submit = () => {
    asyncAuthenticationWithDispatch(watch("email"), watch("pass")).then(() => history.push("/"));
  };

  return (
    <form className={styles.signIn} onSubmit={handleSubmit(submit)}>
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

SignIn.propTypes = {
  asyncAuthenticationWithDispatch: PropTypes.func.isRequired,
}

export default SignIn;
