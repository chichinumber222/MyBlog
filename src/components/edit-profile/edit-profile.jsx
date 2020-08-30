import React from 'react';
import CustomFormField from '../../utils/custom-form-field';
import styles from './edit-profile.module.scss';

function EditProfile() {
  return (
    <div className={styles.editProfile}>
      <h2>Edit Profile</h2>
      <CustomFormField 
        name="username" 
        id="editProfile__username" 
        placeholder="Username"
      >
        Username
      </CustomFormField>
      <CustomFormField 
        name="email" 
        id="editProfile__email" 
        placeholder="Email address"
      >
        Email address
      </CustomFormField>
      <CustomFormField 
        name="new-pass" 
        id="editProfile__new-pass" 
        placeholder="New password"
      >
        New password
      </CustomFormField>
      <CustomFormField 
        name="avatar" 
        id="editProfile__avatar" 
        placeholder="Avatar image"
      >
        Avatar image (url)
      </CustomFormField>
      <button className={styles.submit} type="submit">Save</button>
    </div>
  )
}

export default EditProfile;