/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import cx from 'classnames';

import SpotifyItem from '../SpotifyItem/SpotifyItem';

import './DragSpotifyItem.scss';

const DragSpotifyItem = ({ itemData, cls, ...props }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'playlist-item',
    item: itemData,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <SpotifyItem
      {...props}
      ref={dragRef}
      cls={cx(cls, { dragging: isDragging })}
    />
  );
};

DragSpotifyItem.props = (data) => ({
  ...SpotifyItem.props(data),
  itemData: data,
});

DragSpotifyItem.propTypes = {
  ...SpotifyItem.props,
  // eslint-disable-next-line react/forbid-prop-types
  itemData: PropTypes.object.isRequired,
};

export default DragSpotifyItem;
