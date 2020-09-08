import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Form from '../../subcomponents/form-edit-or-create-article';

function CreateArticle(props) {
  const { asyncCreateArticle, reset, user, creatingArticle } = props;
  const { success, error } = creatingArticle;

  useEffect(() => {
    return reset;
  }, [reset]);

  if (!Object.keys(user).length) {
    return <Redirect to="/sign-in" />;
  }

  if (success) {
    return <Redirect to="/" />;
  }

  return (
    <Form
      mission="create"
      actionCreatorWithDispatch={asyncCreateArticle}
      user={user}
      error={error}
    />
  );
}

CreateArticle.propTypes = {
  asyncCreateArticle: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
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
  creatingArticle: PropTypes.shape({
    success: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool,
  }).isRequired,
};

export default CreateArticle;
