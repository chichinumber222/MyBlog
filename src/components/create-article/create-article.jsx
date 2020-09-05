import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import CustomFormField from '../../subcomponents/custom-form-field';
import TagField from './tag-field';
import styles from './create-article.module.scss';
import newId from '../../services/create-id';

function CreateArticle() {
  const { register, handleSubmit, watch, errors } = useForm();
  const [tags, changeTags] = useState([]);

  const submit = () => {
    const tagsValues = tags.map((tag) => {
      return watch(tag.name);
    });
    console.log(tagsValues);
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

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.createArticle}>
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
          className={tags.length ? classnames(styles.addTagButton, styles.indent) : styles.addTagButton}
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

export default CreateArticle;
