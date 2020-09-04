import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomFormField from '../../subcomponents/custom-form-field';
import TagField from './tag-field';
import styles from './create-article.module.scss';

function CreateArticle() {
  const { register, handleSubmit, watch, errors } = useForm();
  const [tags, changeTags] = useState([]);

  const submit = () => {
    console.log('submit');
  };

  function addTagFunction() {
    const tag = <TagField key={Date.now()} placeholder='Tag'/>;
    changeTags((prevTags) => [...prevTags, tag]);
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
        name='text' 
        id='createArticle__text' 
        type='textarea'
        ref={register({ required: true })} 
        placeholder="Text" 
        errorMessage={errors.text && 'Please, enter your text article'}
      >
        Text
      </CustomFormField>

      <div className={styles.tagging}>
        <div>{tags}</div> 
        <button className={styles.addTagButton} type='button' onClick={addTagFunction}>Add tag</button>
      </div> 

    </form>
  );
}

export default CreateArticle;
