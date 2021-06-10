import React from 'react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import SpotifyList from './components/SpotifyList/SpotifyList';
import StoredList from './components/StoredList/StoredList';

import store from './store';

import playlistSlice from './slices/playlists';
import storedSlice from './slices/stored';

import './App.scss';

const App = () => {
  const [counts, setCounts] = React.useState({
    countFeatured: 0,
    countStored: 0,
  });

  const updateCounts = React.useCallback(() => {
    const currentState = store.getState();
    const countFeatured = currentState[playlistSlice.name].items.length || 0;
    const countStored = currentState[storedSlice.name].items.length || 0;
    setCounts({ countFeatured, countStored });
  }, []);

  React.useEffect(() => {
    const unsubscribe = store.subscribe(updateCounts);
    return () => {
      unsubscribe();
    };
  }, [updateCounts]);

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="app">
          <center>
            <h2>Bookmark favourite playlists from spotify</h2>
          </center>
          <center>
            <div className="table-container">
              <div className="spotify">
                <center>
                  <h4>Latest featured playlists ({counts.countFeatured})</h4>
                </center>
                <SpotifyList />
              </div>
              <div className="local">
                <center>
                  <h4>Locally stored playlists ({counts.countStored})</h4>
                </center>
                <StoredList />
              </div>
            </div>
          </center>
        </div>
      </DndProvider>
    </Provider>
  );
};

export default App;
