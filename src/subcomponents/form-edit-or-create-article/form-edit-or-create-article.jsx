import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import CustomFormField from '../custom-form-field';
import TagField from './tag-field';
import newId from '../../services/create-id';
import styles from './form-edit-or-create-article.module.scss';

function FormEditOrCreateArticle(props) {
  const {
    mission, 
    actionCreatorWithDispatch, 
    defaultValues, 
    defaultTags, 
    user, 
    error
  } = props;

  const { register, handleSubmit, watch, errors } = useForm({defaultValues});
  const [tags, changeTags] = useState(defaultTags);

  const submit = () => {
    const tagList = tags.map((tag) => watch(tag.name)).filter((tag) => Boolean(tag.trim()));
    actionCreatorWithDispatch(user.token, watch("title"), watch("description"), watch("text"), tagList);    
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

  const errorMessage = mission === "create" ? "Failed creating" : "Failed editing";
  const head = mission === 'create' ? "Create new article" : "Edit Article";
  
  return (
    <form onSubmit={handleSubmit(submit)} className={styles.createArticle}>
      {error && <p className={styles.error}>{errorMessage}</p>}
      <h2>{head}</h2>
      <CustomFormField
        name="title"
        id={`form-${mission}__title`}
        ref={register({ required: true })}
        placeholder="Title"
        errorMessage={errors.title && 'Please, enter title'}
      >
        Title
      </CustomFormField>
      <CustomFormField
        name="description"
        id={`form-${mission}__description`}
        ref={register({ required: true })}
        placeholder="Description"
        errorMessage={errors.description && 'Please, enter short description'}
      >
        Short description
      </CustomFormField>
      <CustomFormField
        name="text"
        id={`form-${mission}__text`}
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
  )
}

FormEditOrCreateArticle.defaultProps = {
  defaultValues: {},
  defaultTags: [],
}

FormEditOrCreateArticle.propTypes = {
  mission: PropTypes.oneOf(["create", "edit"]).isRequired,
  actionCreatorWithDispatch: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.string,
  }),
  defaultTags: PropTypes.arrayOf(PropTypes.string),
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
  error: PropTypes.bool.isRequired,
}

export default FormEditOrCreateArticle;
