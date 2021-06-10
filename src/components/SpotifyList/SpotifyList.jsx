import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List from '../List/List';
import DragSpotifyItem from '../DragSpotifyItem/DragSpotifyItem';

import { tkPlaylists as getPlaylists } from '../../services/playlists';

import playlistSlice from '../../slices/playlists';
import storedlistSlice from '../../slices/stored';

import './SpotifyList.scss';

const SpotifyList = ({
  fetchPlaylists,
  playlists,
  storedPlaylists,
  loading,
}) => {
  React.useEffect(() => {
    fetchPlaylists(storedPlaylists);
  }, []);

  if (!playlists.length) return <h5>Nothing to show here!</h5>;

  if (loading) return <h5>fetching ...</h5>;

  const key = (data) => data.id;

  return (
    <List
      data={playlists}
      cls="spotify-list"
      itemProps={DragSpotifyItem.props}
      getKey={key}
      ItemEl={DragSpotifyItem}
    />
  );
};

SpotifyList.propTypes = {
  fetchPlaylists: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  storedPlaylists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SpotifyList.defaultProps = {
  playlists: [],
  loading: false,
};

const WrappedSpotifyList = connect(
  (state) => ({
    loading: state[playlistSlice.name].loading,
    playlists: state[playlistSlice.name].items,
    storedPlaylists: state[storedlistSlice.name].items,
  }),
  (dispatch) => ({
    fetchPlaylists: async (storedItems = []) => {
      try {
        dispatch(playlistSlice.actions.setLoading(true));
        const {
          playlists: { items },
        } = await getPlaylists({ limit: 50 });
        const fItems = items.filter(
          (item) => !storedItems.some((sItem) => sItem.id === item.id),
        );
        dispatch(playlistSlice.actions.set(fItems));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`Error while fetching the playlists: ${err.message}`);
        // eslint-disable-next-line no-alert
        alert('Error while fetching the playlists');
      } finally {
        dispatch(playlistSlice.actions.setLoading(false));
      }
    },
  }),
)(SpotifyList);

export default WrappedSpotifyList;
