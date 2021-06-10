import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import storedSlice from '../../slices/stored';

import List from '../List/List';
import StoredItem from '../StoredItem/StoredItem';

import './StoredList.scss';

const StoredList = ({ playlists, onRemoveItem }) => {
  if (!playlists.length)
    return (
      <div className="empty-stored">Drag from left-list to store locally!</div>
    );
  const getKey = ({ id }) => id;
  const itemProps = StoredItem.props(onRemoveItem);
  return (
    <List
      data={playlists}
      ItemEl={StoredItem}
      getKey={getKey}
      itemProps={itemProps}
    />
  );
};

StoredList.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

const WrappedStoredList = connect(
  (state) => ({ playlists: state[storedSlice.name].items }),
  (dispatch) => ({
    onRemoveItem: (item) => {
      dispatch(storedSlice.actions.setItem(item));
    },
  }),
)(StoredList);

export default WrappedStoredList;
