/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import SpotifyItem from '../SpotifyItem/SpotifyItem';

import './StoredItem.scss';

const StoredItem = ({ onRemove, cls, ...props }) => (
  <div className={cx('stored-item', cls)}>
    <SpotifyItem {...props} />
    <button onClick={onRemove} type="button" style={{ color: 'red' }}>
      ×
    </button>
  </div>
);

StoredItem.props =
  ({ onRemoveItem }) =>
  (data) => ({
    ...SpotifyItem.props(data),
    onRemove: () => onRemoveItem(data),
  });

StoredItem.propTypes = {
  ...SpotifyItem.propTypes,
  onRemove: PropTypes.func.isRequired,
};

export default StoredItem;
