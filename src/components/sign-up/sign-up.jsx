import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import { Divider } from 'antd';
import CustomFormField from '../../subcomponents/custom-form-field';
import PersonalInfoCheckbox from '../../subcomponents/personal-info-checkbox';
import styles from './sign-up.module.scss';

function SignUp({ asyncRegistrationWithDispatch, serverValidations, resetWithDispatch, errorRegistration, user }) {
  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    return resetWithDispatch;
  }, [resetWithDispatch]);

  const submit = () => {
    asyncRegistrationWithDispatch(watch('username'), watch('email'), watch('pass'));
  };

  if (Object.keys(user).length) {
    return <Redirect to="/" />;
  }

  return (
    <form className={styles.signUp} onSubmit={handleSubmit(submit)}>
      {serverValidations && <p className={styles.serverValidations}>{serverValidations}</p>}
      {errorRegistration && <p className={styles.errorRegistration}>Failed Registration</p>}
      <h2>Create new account</h2>
      <CustomFormField
        name="username"
        id="signUp__username"
        ref={register({ minLength: 3, maxLength: 20, required: true })}
        placeholder="Username"
        errorMessage={
          (errors.username?.type === 'required' && 'Enter username') ||
          (errors.username?.type === 'minLength' && 'Your username needs to be at least 3 characters.') ||
          (errors.username?.type === 'maxLength' && 'Your username too long') ||
          ''
        }
      >
        Username
      </CustomFormField>
      <CustomFormField
        name="email"
        id="signUp__email"
        ref={register({ validate: () => isEmail(watch('email')) })}
        placeholder="Email address"
        errorMessage={errors.email && 'Enter correct email'}
      >
        Email address
      </CustomFormField>
      <CustomFormField
        name="pass"
        id="signUp__pass"
        type="password"
        ref={register({ minLength: 8, maxLength: 40, required: true })}
        placeholder="Password"
        errorMessage={
          (errors.pass?.type === 'required' && 'Enter password') ||
          (errors.pass?.type === 'minLength' && 'Your password needs to be at least 8 characters.') ||
          (errors.pass?.type === 'maxLength' && 'Your password too long') ||
          ''
        }
      >
        Password
      </CustomFormField>
      <CustomFormField
        name="repeat"
        id="signUp__repeat"
        type="password"
        ref={register({ validate: () => watch('pass') === watch('repeat') })}
        placeholder="Password"
        errorMessage={errors.repeat && 'Passwords must match'}
      >
        Repeat Password
      </CustomFormField>

      <Divider className={styles.divider} />

      <PersonalInfoCheckbox
        name="processingInformation"
        id="signUp__processingInformation"
        ref={register({ required: true })}
        errorMessage={errors.processingInformation && 'Please accept the terms and conditions to continue.'}
      >
        I agree to the processing of my personal information
      </PersonalInfoCheckbox>

      <button className={styles.submit} type="submit">
        Create
      </button>
      <p className={styles.haveAnAccount}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </p>
    </form>
  );
}

SignUp.propTypes = {
  asyncRegistrationWithDispatch: PropTypes.func.isRequired,
  serverValidations: PropTypes.string.isRequired,
  resetWithDispatch: PropTypes.func.isRequired,
  errorRegistration: PropTypes.bool.isRequired,
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
};

export default SignUp;
