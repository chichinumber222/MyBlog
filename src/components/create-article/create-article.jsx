import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
import CustomFormField from '../../subcomponents/custom-form-field';
import TagField from './tag-field';
import styles from './create-article.module.scss';
import newId from '../../services/create-id';

function CreateArticle(props) {
  const {
    asyncCreateArticleWithDispatch, 
    resetWithDispatch, 
    user, 
    successCreating,
    errorCreating,
  } = props;

  const { register, handleSubmit, watch, errors } = useForm();
  const [tags, changeTags] = useState([]);

  useEffect(() => {
    return resetWithDispatch;
  }, [resetWithDispatch]);

  const submit = () => {
    console.log(watch("text"));
    const tagList = tags.map((tag) => watch(tag.name)).filter((tag) => Boolean(tag.trim()));
    asyncCreateArticleWithDispatch(user.token, watch("title"), watch("description"), watch("text"), tagList);    
  };

  function deleteTag(event) {
    const { name } = event.target;
    changeTags((prevTags) => {
      const index = prevTags.findIndex((tag) => tag.name === name);
      return [...prevTags.slice(0, index), ...prevTags.slice(index + 1)];
    });
  }

  function addTag() {
    const name = `tag${newId()}`;
    const tag = <TagField key={name} name={name} placeholder="Tag" onClickButton={deleteTag} ref={register()} />;
    changeTags((prevTags) => [...prevTags, { name, node: tag }]);
  }

  if (!Object.keys(user).length) {
    return <Redirect to="/sign-in" />;
  }

  if (successCreating) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.createArticle}>
      {errorCreating && <p className={styles.errorCreating}>Failed Creating</p>}
      <h2>Create new article</h2>
      <CustomFormField
        name="title"
        id="createArticle__title"
        ref={register({ required: true })}
        placeholder="Title"
        errorMessage={errors.title && 'Please, enter title'}
      >
        Title
      </CustomFormField>
      <CustomFormField
        name="description"
        id="createArticle__description"
        ref={register({ required: true })}
        placeholder="Description"
        errorMessage={errors.description && 'Please, enter short description'}
      >
        Short description
      </CustomFormField>
      <CustomFormField
        name="text"
        id="createArticle__text"
        type="textarea"
        ref={register({ required: true })}
        placeholder="Text"
        errorMessage={errors.text && 'Please, enter your text article'}
      >
        Text
      </CustomFormField>

      <div className={styles.tagging}>
        <div className={styles.tags}>{tags.map((tag) => tag.node)}</div>
        <button
          className={classnames(styles.addTagButton, tags.length && styles.indent)}
          type="button"
          onClick={addTag}
        >
          Add tag
        </button>
      </div>

      <button className={styles.submit} type="submit">
        Send
      </button>
    </form>
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
}

export default CreateArticle;
