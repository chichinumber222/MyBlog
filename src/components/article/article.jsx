import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
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
    favoritesCount,
    author,
    createdAt,
    slug,
    body,
    isList,
    showEditAndDelete,
  } = props;

  return (
    <div className={styles.article}>
      <div className={classNames(styles.main, isList ? styles.mainForList : styles.mainForPage)}>
        <div className={styles.header}>
          <StyledLink to={`/articles/${slug}`} className={styles.title} isActive={isList}>
            {title}
          </StyledLink>
          <label className={styles.customCheckbox}>
            <input className={styles.checkbox} type="checkbox" />
            <span className={styles.heart} />
            <span className={styles.heartsCount}>{favoritesCount}</span>
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
              <button className={styles.delete} type="button">
                Delete
              </button>
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
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
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
};

export default Article;

// .person + .buttons {
//   margin-top: 30px;
// }
