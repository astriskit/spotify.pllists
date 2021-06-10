/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { setAllLocalItems } from '../utils/localstore';

const localPlaylistSlice = createSlice({
  name: 'local-playlists',
  initialState: {
    items: [],
  },
  reducers: {
    set(state, action) {
      state.items = action.payload;
      setAllLocalItems(state.items);
    },
    setItem(state, action) {
      if (state.items.some(({ id }) => action.payload.id === id)) {
        state.items = state.items.filter(({ id }) => action.payload.id !== id);
      } else {
        state.items.push(action.payload);
      }
      setAllLocalItems(state.items);
    },
  },
});

export default localPlaylistSlice;
