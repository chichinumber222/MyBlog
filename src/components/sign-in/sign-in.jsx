import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import CustomFormField from '../../subcomponents/custom-form-field';
import StyledSpinner from '../../subcomponents/styled-spinner';
import styles from './sign-in.module.scss';

function SignIn({ asyncAuthorization, reset, authorization }) {
  const { success, loading, error, serverValidation } = authorization;
  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    return reset;
  }, [reset]);

  const submit = () => {
    asyncAuthorization(watch('email'), watch('pass'));
  };

  if (success) {
    return <Redirect to="/" />;
  }

  return (
    <form className={styles.signIn} onSubmit={handleSubmit(submit)}>

      {serverValidation && <p className={styles.serverValidations}>{serverValidation}</p>}
      {error && <p className={styles.errorAuthentication}>Failed Authentication</p>}
      {<StyledSpinner className={styles.location} title="Loading..." isLoading={loading}/>}

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
  asyncAuthorization: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  authorization: PropTypes.shape({
    success: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    serverValidation: PropTypes.string,
  }).isRequired,
};

export default SignIn;
