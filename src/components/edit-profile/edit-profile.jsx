import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';
import CustomFormField from '../../subcomponents/custom-form-field';
import StyledSpinner from '../../subcomponents/styled-spinner';
import styles from './edit-profile.module.scss';

function EditProfile(props) {
  const { user, asyncEditProfile, reset, editingProfile } = props;
  const { success, loading, error, serverValidation } = editingProfile;

  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
      avatar: user.image,
    },
  });

  useEffect(() => {
    return reset;
  }, [reset]);

  const submit = () => {
    asyncEditProfile(user.token, watch('username'), watch('email'), watch('newPass'), watch('avatar'));
  };

  if (!Object.keys(user).length) {
    return <Redirect to="sign-in" />;
  }

  if (success) {
    return <Redirect to="/" />;
  }

  return (
    <form className={styles.editProfile} onSubmit={handleSubmit(submit)}>
      {serverValidation && <p className={styles.serverValidations}>{serverValidation}</p>}
      {error && <p className={styles.errorEditing}>Failed Editing</p>}
      {<StyledSpinner className={styles.location} title="Editing..." isLoading={loading} />}

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
          (errors.newPass?.type === 'maxLength' && 'Your new password too long') ||
          ''
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
  asyncEditProfile: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  editingProfile: PropTypes.shape({
    success: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    serverValidation: PropTypes.string,
  }).isRequired,
};

export default EditProfile;
