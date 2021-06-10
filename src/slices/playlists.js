/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const playlistSlice = createSlice({
  name: 'playlists',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    set(state, action) {
      state.items = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export default playlistSlice;
