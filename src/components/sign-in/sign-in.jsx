import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import CustomFormField from '../../utils/custom-form-field';
import styles from './sign-in.module.scss';

function SignIn() {
  return (
    <form className={styles.signIn}>
      <h2>Sign In</h2>
      <CustomFormField placeholder='Email address'>Email address</CustomFormField>
      <CustomFormField placeholder='Password'>Password</CustomFormField>
      <Button className={styles.submit} type='primary' size='large'>Login</Button>
      <p className={styles.notHaveAnAccount}>Don’t have an account? <Link to='/sign-up'> Sign Up.</Link></p>
    </form>
  )
}

export default SignIn;