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
    setItem(state, action) {
      if (state.items.some(({ id }) => action.payload.id === id)) {
        state.items = state.items.filter(({ id }) => action.payload.id !== id);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export default playlistSlice;
