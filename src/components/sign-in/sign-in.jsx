import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import CustomFormField from '../../utils/custom-form-field';
import styles from './sign-in.module.scss';

function SignIn({ asyncAuthenticationWithDispatch, serverValidations, resetWithDispatch, user, errorAuthentication }) {
  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    return resetWithDispatch;
  }, [resetWithDispatch]);

  const submit = () => {
    asyncAuthenticationWithDispatch(watch('email'), watch('pass'));
  };

  if (Object.keys(user).length) {
    return <Redirect to="/" />;
  }

  return (
    <form className={styles.signIn} onSubmit={handleSubmit(submit)}>
      {serverValidations && <p className={styles.serverValidations}>{serverValidations}</p>}
      {errorAuthentication && <p className={styles.errorAuthentication}>Failed Authentication</p>}
      <h2>Sign In</h2>
      <CustomFormField
        name="email"
        id="signIn__email"
        ref={register({ validate: () => isEmail(watch('email')) })}
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
        errorMessage={errors.pass && 'Enter your password'}
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
  serverValidations: PropTypes.string.isRequired,
  resetWithDispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
  errorAuthentication: PropTypes.bool.isRequired,
};

export default SignIn;
