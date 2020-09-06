import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Form from '../../subcomponents/form-edit-or-create-article';

function CreateArticle(props) {
  const { asyncCreateArticleWithDispatch, resetWithDispatch, user, successCreating, errorCreating } = props;

  useEffect(() => {
    return resetWithDispatch;
  }, [resetWithDispatch]);

  if (!Object.keys(user).length) {
    return <Redirect to="/sign-in" />;
  }

  if (successCreating) {
    return <Redirect to="/" />;
  }

  return (
    <Form
      mission="create"
      actionCreatorWithDispatch={asyncCreateArticleWithDispatch}
      user={user}
      error={errorCreating}
    />
  );
}

CreateArticle.propTypes = {
  asyncCreateArticleWithDispatch: PropTypes.func.isRequired,
  resetWithDispatch: PropTypes.func.isRequired,
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
  successCreating: PropTypes.bool.isRequired,
  errorCreating: PropTypes.bool.isRequired,
};

export default CreateArticle;
