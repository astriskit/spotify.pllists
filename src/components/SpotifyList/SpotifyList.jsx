import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List from '../List/List';
import SpotifyItem from '../SpotifyItem/SpotifyItem';

import { tkPlaylists as getPlaylists } from '../../services/playlists';

import playlistSlice from '../../slices/playlists';

import './SpotifyList.scss';

const SpotifyList = ({ fetchPlaylists, playlists, loading }) => {
  React.useEffect(() => {
    fetchPlaylists();
  }, []);

  if (!playlists.length) return null;

  if (loading) return <h6>fetching ...</h6>;

  const key = (data) => data.id;

  return (
    <List
      data={playlists}
      cls="spotify-list"
      itemProps={SpotifyItem.props}
      getKey={key}
      ItemEl={SpotifyItem}
    />
  );
};

SpotifyList.propTypes = {
  fetchPlaylists: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};

SpotifyList.defaultProps = {
  playlists: [],
  loading: false,
};

const WrappedSpotifyList = connect(
  (state) => ({
    loading: state[playlistSlice.name].loading,
    playlists: state[playlistSlice.name].items,
  }),
  (dispatch) => ({
    fetchPlaylists: async () => {
      try {
        dispatch(playlistSlice.actions.setLoading(true));
        const {
          playlists: { items },
        } = await getPlaylists();
        dispatch(playlistSlice.actions.set(items));
      } catch (err) {
        console.error(`Error while fetching the playlists: ${err.message}`);
        alert('Error while fetching the playlists');
      } finally {
        dispatch(playlistSlice.actions.setLoading(false));
      }
    },
  }),
)(SpotifyList);

export default WrappedSpotifyList;
