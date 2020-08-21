import React from 'react';
import { format } from 'date-fns';
import styles from './article.module.scss';

function Article({title, description, tagList, favoritesCount, author, createdAt}) {
  return (
    <div className={styles.article}>
      <div>
        <span className={styles.title}>{title}</span>
        <label className={styles.container}>
          <input className={styles.checkbox} type='checkbox'/>
          <span className={styles.heart} />
          <span className={styles.heartsCount}>{favoritesCount}</span>
        </label>
        <div className={styles.tags}>{tagsCreator(tagList)}</div>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.person}>
        <div className={styles.info}>
          <span className={styles.username}>{author.username}</span>
          <span className={styles.date}>{format(new Date(createdAt), 'LLLL d, y')}</span>
        </div>
        <img className={styles.avatar} alt='avatar' src={author.image}/>
      </div>
    </div>
  )
}

function tagsCreator(tags) {
  return tags.map((tag) => <span className={styles.tag}>{tag}</span>)
}

export default Article;


