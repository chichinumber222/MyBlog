import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Alert } from 'antd';
import classNames from 'classnames';
import Form from '../../subcomponents/form-edit-or-create-article';
import StyledSpinner from '../../subcomponents/styled-spinner';
import styles from './edit-article.module.scss';

function EditArticle(props) {
  const {
    match,
    asyncGetArticle,
    gettingArticle,
    asyncEditArticle,
    editingArticle,
    user,
    article,
    loadingLaunchForGettingArticle,
    resetForEditingArticle,
  } = props;

  const {
    url,
    params: { slug },
  } = match;

  useEffect(() => {
    asyncGetArticle(user.token, slug);
    return () => {
      loadingLaunchForGettingArticle();
      resetForEditingArticle();
    };
  }, [user.token, asyncGetArticle, loadingLaunchForGettingArticle, resetForEditingArticle, slug]);

  if (!Object.keys(user).length) {
    return <Redirect to="/sign-in" />;
  }

  if (gettingArticle.loading) {
    return <div className={classNames(styles.loading, styles.centered)} />;
  }

  if (gettingArticle.error) {
    return <Alert className={styles.errorNotification} message="Sorry, no article" type="error" />;
  }

  const {
    author,
    title,
    description,
    body,
    tagList,
  } = article;

  if (user.username !== author.username || editingArticle.success) {
    const index = url.lastIndexOf('edit');
    const previousURL = url.slice(0, index - 1);
    return <Redirect to={previousURL} />;
  }

  return (
    <div>
      <Form
        mission="edit"
        actionCreatorWithDispatch={(...data) => asyncEditArticle(...data, slug)}
        defaultValues={{ title, description, text: body }}
        defaultTags={tagList}
        user={user}
        error={editingArticle.error}
      />
      <StyledSpinner className={styles.location} title="Loading..." isLoading={editingArticle.loading}/>
    </div>
  );
}

EditArticle.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  asyncGetArticle: PropTypes.func.isRequired,
  asyncEditArticle: PropTypes.func.isRequired,
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
  gettingArticle: PropTypes.shape({
    success: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool
  }).isRequired,
  editingArticle: PropTypes.shape({
    success: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool
  }).isRequired,
  article: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    favorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string,
      bio: PropTypes.string,
      image: PropTypes.string,
      following: PropTypes.bool,
    }).isRequired,
  }).isRequired,
  loadingLaunchForGettingArticle: PropTypes.func.isRequired,
  resetForEditingArticle: PropTypes.func.isRequired,
};

export default EditArticle;
