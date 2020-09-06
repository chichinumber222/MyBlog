import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import StyledLink from '../../subcomponents/styled-link';
import UserDataWithAvatar from '../../subcomponents/user-data-with-avatar';
import styles from './article.module.scss';

function tagsCreator(tags) {
  return tags.map((tag) => <span className={styles.tag}>{tag}</span>);
}

function Article({ title, description, tagList, favoritesCount, author, createdAt, slug, body, isList, showEditAndDelete }) {
  const descriptionStyle = isList ? { margin: '4px 0px' } : { margin: '14px 0px' };
  return (
    <div className={styles.article}>
      <div className={styles.main}>
        <div className={styles.header}>
          <StyledLink to={`/articles/${slug}`} className={styles.title} isActive={isList}>
            {title}
          </StyledLink>
          <label className={styles.container}>
            <input className={styles.checkbox} type="checkbox" />
            <span className={styles.heart} />
            <span className={styles.heartsCount}>{favoritesCount}</span>
          </label>
          <div className={styles.tags}>{tagsCreator(tagList)}</div>
          <p className={styles.description} style={descriptionStyle}>
            {description}
          </p>
        </div>
        <UserDataWithAvatar
          username={author.username}
          date={format(new Date(createdAt), 'LLLL d, y')}
          imageSrc={author.image || undefined}
          showButtons={showEditAndDelete}
          pathToEdit={`articles/${slug}/edit`}
        />
      </div>
      {!isList && <Markdown>{body}</Markdown>}
    </div>
  );
}

Article.defaultProps = {
  isList: true,
  showEditAndDelete: false,
}

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