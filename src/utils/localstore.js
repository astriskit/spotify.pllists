/* eslint-disable import/prefer-default-export */

export const setLocalItem = (item) => {
  const stored = JSON.parse(sessionStorage.getItem('playlists')) || [];
  stored.push(item);
  sessionStorage.setItem('playlists', JSON.stringify(stored));
};

export const setAllLocalItems = (items) => {
  sessionStorage.setItem('playlists', JSON.stringify(items));
};

export const getLocalItems = () => {
  const stored = JSON.parse(sessionStorage.getItem('playlists')) || [];
  return stored;
};
