import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import CustomFormField from '../../utils/custom-form-field';
import PersonalInfoCheckbox from '../../utils/personal-info-checkbox';
import styles from './sign-up.module.scss';

function SignUp() {
  const { register, handleSubmit, watch, errors } = useForm();

  const mySubmit = () => {
    console.log('submit');
  };

  return (
    <form className={styles.signUp} onSubmit={handleSubmit(mySubmit)}>
      <h2>Create new account</h2>
      <CustomFormField
        name="username"
        refAttribute={register({ minLength: 3, maxLength: 20, required: true })}
        placeholder="Username"
        error={errors.username && 'Username needs to be at least 3'}
      >
        Username
      </CustomFormField>
      <CustomFormField
        name="email"
        refAttribute={register({ pattern: /\S+@\S+\.\S+/i, required: true })}
        placeholder="Email address"
        error={errors.email && 'Enter correct email'}
      >
        Email address
      </CustomFormField>
      <CustomFormField
        name="pass"
        type="password"
        refAttribute={register({ minLength: 6, maxLength: 40, required: true })}
        placeholder="Password"
        error={errors.pass && 'Your password needs to be at least 6 characters.'}
      >
        Password
      </CustomFormField>
      <CustomFormField
        name="repeat"
        type="password"
        refAttribute={register({ validate: () => watch('pass') === watch('repeat') })}
        placeholder="Password"
        error={errors.repeat && 'Passwords must match'}
      >
        Repeat Password
      </CustomFormField>
      <Divider className={styles.divider} />
      <PersonalInfoCheckbox 
        name="processingInformation" 
        refAttribute={register({required: true})} 
        error={errors.processingInformation && 'You have to agree'}
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

export default SignUp;
