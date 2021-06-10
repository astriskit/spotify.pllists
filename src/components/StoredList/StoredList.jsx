/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';

import storedSlice from '../../slices/stored';

import List from '../List/List';
import StoredItem from '../StoredItem/StoredItem';

import './StoredList.scss';
import playlistSlice from '../../slices/playlists';

const StoredList = React.forwardRef(({ playlists, onRemoveItem }, ref) => {
  if (!playlists.length)
    return (
      <h5 className="empty-stored" ref={ref}>
        Drag from left-list to store locally!
      </h5>
    );
  const getKey = ({ id }) => id;
  const itemProps = StoredItem.props({ onRemoveItem });
  return (
    <List
      data={playlists}
      ItemEl={StoredItem}
      getKey={getKey}
      itemProps={itemProps}
      ref={ref}
      cls="stored-list"
    />
  );
});

StoredList.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

const DragStoredList = ({ onStorePlayList, ...props }) => {
  const drop = useDrop(
    () => ({
      accept: 'playlist-item',
      drop(data) {
        onStorePlayList(data);
      },
      collect(monitor) {
        return { isOver: !!monitor.isOver, canDrop: !!monitor.canDrop };
      },
    }),
    [onStorePlayList],
  );
  return <StoredList {...props} ref={drop[1]} />;
};

DragStoredList.propTypes = {
  ...StoredList.propTypes,
  onStorePlayList: PropTypes.func.isRequired,
};

const WrappedStoredList = connect(
  (state) => ({ playlists: state[storedSlice.name].items }),
  (dispatch) => ({
    onRemoveItem: (item) => {
      dispatch(storedSlice.actions.setItem(item));
      dispatch(playlistSlice.actions.setItem(item));
    },
    onStorePlayList: (item) => {
      dispatch(playlistSlice.actions.setItem(item));
      dispatch(storedSlice.actions.setItem(item));
    },
  }),
)(DragStoredList);

export default WrappedStoredList;
