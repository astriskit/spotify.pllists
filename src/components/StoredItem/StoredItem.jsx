/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import SpotifyItem from '../SpotifyItem/SpotifyItem';

import './StoredItem.scss';

const StoredItem = ({ onRemove, ...props }) => (
  <div className="stored-item">
    <SpotifyItem {...props} />
    <button onClick={onRemove} type="button">
      &close;
    </button>
  </div>
);

StoredItem.props =
  ({ onRemoveItem }) =>
  (data) => ({
    ...SpotifyItem.props(data),
    onRemove: () => onRemoveItem(data.id),
  });

StoredItem.propTypes = {
  ...SpotifyItem.propTypes,
  onRemove: PropTypes.func.isRequired,
};

export default StoredItem;
