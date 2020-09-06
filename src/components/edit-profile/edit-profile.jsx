import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';
import CustomFormField from '../../subcomponents/custom-form-field';
import styles from './edit-profile.module.scss';

function EditProfile(props) {
  const {
    user,
    asyncEditProfileWithDispatch,
    resetWithDispatch,
    serverValidations,
    errorEditing,
    successEditing,
  } = props;

  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
      avatar: user.image,
    },
  });

  useEffect(() => {
    return resetWithDispatch;
  }, [resetWithDispatch]);

  const submit = () => {
    asyncEditProfileWithDispatch(user.token, watch('username'), watch('email'), watch('newPass'), watch('avatar'));
  };

  if (!Object.keys(user).length || successEditing) {
    return <Redirect to="/" />;
  }

  return (
    <form className={styles.editProfile} onSubmit={handleSubmit(submit)}>
      {serverValidations && <p className={styles.serverValidations}>{serverValidations}</p>}
      {errorEditing && <p className={styles.errorEditing}>Failed Editing</p>}
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
        ref={register({ validate: () => isEmail(watch('email')) })}
        placeholder="Email address"
        errorMessage={errors.email && 'Enter correct email'}
      >
        Email address
      </CustomFormField>
      <CustomFormField
        name="newPass"
        id="editProfile__newPass"
        type="password"
        ref={register({ minLength: 8, maxLength: 40, required: true })}
        placeholder="New password"
        errorMessage={
          (errors.newPass?.type === 'required' && 'Enter new password') ||
          (errors.newPass?.type === 'minLength' && 'Your new password needs to be at least 8 characters.') ||
          (errors.newPass?.type === 'maxLength' && 'Your new password too long')
        }
      >
        New password
      </CustomFormField>
      <CustomFormField
        name="avatar"
        id="editProfile__avatar"
        ref={register({ validate: () => isURL(watch('avatar')) || watch('avatar') === '' })}
        placeholder="Avatar image"
        errorMessage={errors.avatar && 'Enter correct URL'}
      >
        Avatar image (url) (optional)
      </CustomFormField>
      <button className={styles.submit} type="submit">
        Save
      </button>
    </form>
  );
}

EditProfile.propTypes = {
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
  asyncEditProfileWithDispatch: PropTypes.func.isRequired,
  resetWithDispatch: PropTypes.func.isRequired,
  serverValidations: PropTypes.string.isRequired,
  errorEditing: PropTypes.bool.isRequired,
  successEditing: PropTypes.bool.isRequired,
};

export default EditProfile;
