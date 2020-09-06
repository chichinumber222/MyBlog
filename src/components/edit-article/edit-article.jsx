import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Alert } from 'antd';
import classNames from 'classnames';
import Form from '../../subcomponents/form-edit-or-create-article';
import isMyArticle from '../../services/is-my-article';
import styles from './edit-article.module.scss';

function EditArticle(props) {
  const {
    match,
    asyncGetArticleWithDispatch,
    successGettingArticle,
    errorGettingArticle,
    asyncEditArticleWithDispatch, 
    resetWithDispatch, 
    user, 
    successEditing,
    errorEditing,
    article,
  } = props;

  const { url, params: { slug } } = match;

  const {
    author: { username },
    title,
    description,
    body,
    tagList,
  } = article;

  useEffect(() => {
    asyncGetArticleWithDispatch(slug);
    return resetWithDispatch;
  }, [asyncGetArticleWithDispatch, resetWithDispatch, slug]);

  if (!Object.keys(user).length) {
    return <Redirect to="/sign-in" />;
  }
  
  if (!isMyArticle(username) || successEditing) {
    const index = url.lastIndexOf("edit");
    const previousURL = url.slice(0, index - 1);
    return <Redirect to={previousURL}/>;
  }

  if (!(successGettingArticle || errorGettingArticle)) {
    return <div className={classNames(styles.spinner, styles.centered)} />;
  }

  if (errorGettingArticle) {
    return <Alert className={styles.errorNotification} message="Sorry, no article" type="error" />;
  }

  return (
    <Form 
      mission="edit" 
      actionCreatorWithDispatch={asyncEditArticleWithDispatch} 
      defaultValues={{title, description, text: body}}
      defaultTags={tagList}
      user={user}
      error={errorEditing}
    />
  );
}

EditArticle.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
    isExact: PropTypes.bool,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  asyncGetArticleWithDispatch: PropTypes.func.isRequired,
  successGettingArticle: PropTypes.bool.isRequired,
  errorGettingArticle: PropTypes.bool.isRequired,
  asyncEditArticleWithDispatch: PropTypes.func.isRequired,
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
  successEditing: PropTypes.bool.isRequired,
  errorEditing: PropTypes.bool.isRequired,
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
}

export default EditArticle;