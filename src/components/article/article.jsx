import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Popconfirm } from 'antd';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';
import StyledLink from '../../subcomponents/styled-link';
import UserDataWithAvatar from '../../subcomponents/user-data-with-avatar';
import styles from './article.module.scss';

function tagsCreator(tags) {
  return tags.map((tag) => <span className={styles.tag}>{tag}</span>);
}

function Article(props) {
  const {
    title,
    description,
    tagList,
    favorited,
    favoritesCount,
    author,
    createdAt,
    slug,
    body,
    isList,
    showEditAndDelete,
    disableLike,
    articleDeleteHandler,
    articleFavoriteHandler,
    errorLike
  } = props;

  const [like, changeLike] = useState({active: favorited, count: favoritesCount});

  const changeCheckbox = () => {
    if (disableLike) return;
    changeLike((prevLike) => {
      const {active, count} = prevLike;
      return {active: !active, count: active ? count - 1: count + 1};
    });
    articleFavoriteHandler(!like.active, slug);
  }

  useEffect(() => {
    if (errorLike && favorited !== like.active) {
      changeLike((prevLike) => {
        const {active, count} = prevLike;
        return {active: !active, count: active ? count - 1: count + 1};
      })
    }
  }, [errorLike, like.active, favorited])

  return (
    <div className={styles.article}>
      <div className={classNames(styles.main, isList ? styles.mainForList : styles.mainForPage)}>
        <div className={styles.header}>
          <StyledLink to={`/articles/${slug}`} className={styles.title} isActive={isList}>
            {title}
          </StyledLink>

          <label className={styles.customCheckbox}>
            <input className={styles.checkbox} type="checkbox" onChange={changeCheckbox} />
            <span className={classNames(styles.heart, like.active && styles.heartActive)} />
            <span className={styles.heartsCount}>{like.count}</span>
          </label>

          <div className={styles.tags}>{tagsCreator(tagList)}</div>
          <p className={classNames(styles.description, isList ? styles.descriptionForList : styles.descriptionForPage)}>
            {description}
          </p>
        </div>
        <div className={styles.container}>
          <UserDataWithAvatar
            className={styles.userDataWithAvatar}
            username={author.username}
            date={format(new Date(createdAt), 'LLLL d, y')}
            imageSrc={author.image || undefined}
          />
          {showEditAndDelete && (
            <div className={styles.buttons}>
              <Popconfirm 
                placement="rightTop"
                title="Are you sure to delete this article?"
                okText="Yes"
                cancelText="No"
                onConfirm={articleDeleteHandler}
                overlayClassName={styles.popconfirm}
              >
                <button className={styles.delete} type="button">
                  Delete
                </button>
              </Popconfirm>
              <Link className={styles.edit} to={`/articles/${slug}/edit`}>
                Edit
              </Link>
            </div>
          )}
        </div>
      </div>
      {!isList && <Markdown>{body}</Markdown>}
    </div>
  );
}

Article.defaultProps = {
  isList: true,
  showEditAndDelete: false,
  articleDeleteHandler: () => {},
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  favorited: PropTypes.bool.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  author: PropTypes.shape({
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    following: PropTypes.bool,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  isList: PropTypes.bool,
  showEditAndDelete: PropTypes.bool,
  articleDeleteHandler: PropTypes.func,
  articleFavoriteHandler: PropTypes.func.isRequired,
  errorLike: PropTypes.bool.isRequired,
  disableLike: PropTypes.bool.isRequired,
};

export default Article;