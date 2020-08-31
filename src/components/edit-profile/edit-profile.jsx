import React from 'react';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';
import CustomFormField from '../../utils/custom-form-field';
import styles from './edit-profile.module.scss';

function EditProfile() {
  const { register, handleSubmit, watch, errors } = useForm();

  const submit = () => {
    console.log("submit!");
  }

  console.log(errors.newPass);

  return (
    <form className={styles.editProfile} onSubmit={handleSubmit(submit)}>
      <h2>Edit Profile</h2>
      <CustomFormField 
        name="username" 
        id="editProfile__username" 
        ref={register({ required: true })}
        placeholder="Username"
        errorMessage={errors.username && 'Enter username'}
      >
        Username
      </CustomFormField>
      <CustomFormField 
        name="email" 
        id="editProfile__email" 
        ref={register({ validate: () => isEmail(watch("email")) })}
        placeholder="Email address"
        errorMessage={errors.email && 'Enter correct email'}
      >
        Email address
      </CustomFormField>
      <CustomFormField 
        name="newPass" 
        id="editProfile__newPass"
        ref={register({ minLength: 8, maxLength: 40, required: true })} 
        placeholder="New password"
        errorMessage={(errors.newPass?.type === 'required' && 'Enter new password') || (errors.newPass?.type === 'minLength' && 'Your new password needs to be at least 8 characters.') || (errors.newPass?.type === 'maxLength' && 'Your new password too long')}
      >
        New password
      </CustomFormField>
      <CustomFormField 
        name="avatar" 
        id="editProfile__avatar" 
        ref={register({ validate: () => isURL(watch("avatar")) })}
        placeholder="Avatar image"
        errorMessage={errors.avatar && 'Enter correct URL'}
      >
        Avatar image (url)
      </CustomFormField>
      <button className={styles.submit} type="submit">Save</button>
    </form>
  )
}

export default EditProfile;