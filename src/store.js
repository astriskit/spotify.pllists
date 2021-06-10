import { configureStore } from '@reduxjs/toolkit';

import playlistSlice from './slices/playlists';
import localPlaylistSlice from './slices/stored';

import { getLocalItems } from './utils/localstore';

const store = configureStore({
  reducer: {
    [playlistSlice.name]: playlistSlice.reducer,
    [localPlaylistSlice.name]: localPlaylistSlice.reducer,
  },
  preloadedState: {
    [playlistSlice.name]: { items: [], loading: false },
    [localPlaylistSlice.name]: { items: getLocalItems() },
  },
});

export default store;
