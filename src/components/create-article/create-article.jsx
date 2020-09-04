import React from 'react';
import { useForm } from 'react-hook-form';
import CustomFormField from '../../utils/custom-form-field';
import styles from './create-article.module.scss';

function CreateArticle() {
  const { register, handleSubmit, watch, errors } = useForm();

  const submit = () => {
    console.log('submit');
  };

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
      
    </form>
  );
}

export default CreateArticle;
