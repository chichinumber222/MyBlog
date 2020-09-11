import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Popconfirm, message } from 'antd';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';
import StyledLink from '../../subcomponents/styled-link';
import UserDataWithAvatar from '../../subcomponents/user-data-with-avatar';
import { favoriteOrUnfavoriteArticle } from '../../services/article-service';
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
    disableFavoritingArticle,
    articleDeleteHandler,
    token,
  } = props;

  const [stateOfFavorites, setStateOfFavorites] = useState({ active: favorited, count: favoritesCount });
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      setStateOfFavorites((prevState) => ({
        active: !prevState.active,
        count: prevState.active ? prevState.count - 1 : prevState.count + 1,
      }));
    }
    return setError(false);
  }, [error]);

  const changeCheckbox = () => {
    if (disableFavoritingArticle) return;
    setStateOfFavorites((prevState) => ({
      active: !prevState.active,
      count: prevState.active ? prevState.count - 1 : prevState.count + 1,
    }));
    favoriteOrUnfavoriteArticle(token, slug, !stateOfFavorites.active).catch(() => {
      setError(true);
      message.error('Failed to add favorites', 1.3);
    });
  };

  return (
    <div className={styles.article}>
      <div className={classNames(styles.main, isList ? styles.mainForList : styles.mainForPage)}>
        <div className={styles.header}>
          <StyledLink to={`/articles/${slug}`} className={styles.title} isActive={isList}>
            {title}
          </StyledLink>
          <label className={styles.customCheckbox}>
            <input className={styles.checkbox} type="checkbox" onChange={changeCheckbox} />
            <span className={classNames(styles.heart, stateOfFavorites.active && styles.heartActive)} />
            <span className={styles.heartsCount}>{stateOfFavorites.count}</span>
          </label>
          <div className={styles.tags}>{tagsCreator(tagList)}</div>
          <p
            className={classNames(styles.description, isList ? styles.descriptionForList : styles.descriptionForPage)}
          >
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
                onConfirm={() => articleDeleteHandler(token, slug)}
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
  token: '',
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
  disableFavoritingArticle: PropTypes.bool.isRequired,
  token: PropTypes.string,
};

export default Article;
