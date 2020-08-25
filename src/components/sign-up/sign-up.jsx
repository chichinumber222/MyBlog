import React from 'react';
import { Divider, Button } from 'antd';
import CustomFormField from '../../utils/custom-form-field';
import PersonalInfoCheckbox from '../../utils/personal-info-checkbox';
import styles from './sign-up.module.scss';

function SignUp() {
  return (
    <form className={styles.signUp}>
      <h2>Create new account</h2>
      <CustomFormField placeholder='Username'>Username</CustomFormField>
      <CustomFormField placeholder='Email address'>Email address</CustomFormField>
      <CustomFormField placeholder='Password'>Password</CustomFormField>
      <CustomFormField placeholder='Password'>Repeat Password</CustomFormField>
      <Divider className={styles.divider} />
      <PersonalInfoCheckbox>I agree to the processing of my personal information</PersonalInfoCheckbox>
      <Button className={styles.submit} type='primary' size='large'>Create</Button>
      <p className={styles.haveAnAccount}>Already have an account? <a href='#'>Sign In.</a></p>
    </form>
  )
}

export default SignUp;