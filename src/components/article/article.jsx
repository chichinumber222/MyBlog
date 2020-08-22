import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import styles from './article.module.scss';

function Article({title, description, tagList, favoritesCount, author, createdAt, slug, body, isList}) {
  const descriptionStyle = isList ? {margin: '4px 0px'}: {margin: '14px 0px'};
  return (
    <div className={styles.article}>
      <div className={styles.main}>
        <div>
          <Link to={`/articles/${slug}`} className={styles.title}>{title}</Link>
          <label className={styles.container}>
            <input className={styles.checkbox} type='checkbox'/>
            <span className={styles.heart} />
            <span className={styles.heartsCount}>{favoritesCount}</span>
          </label>
          <div className={styles.tags}>{tagsCreator(tagList)}</div>
          <p className={styles.description} style={descriptionStyle}>{description}</p>
        </div>
        <div className={styles.person}>
          <div className={styles.info}>
            <span className={styles.username}>{author.username}</span>
            <span className={styles.date}>{format(new Date(createdAt), 'LLLL d, y')}</span>
          </div>
          <img className={styles.avatar} alt='avatar' src={author.image}/>
        </div>
      </div>
      {!isList && <div>{body}</div>}
    </div>
  )
}

function tagsCreator(tags) {
  return tags.map((tag) => <span className={styles.tag}>{tag}</span>)
}

export default Article;


