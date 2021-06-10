import React from 'react';
import { Provider } from 'react-redux';

import SpotifyList from './components/SpotifyList/SpotifyList';
import StoredList from './components/StoredList/StoredList';

import store from './store';

import './App.scss';

const App = () => (
  <Provider store={store}>
    <div className="app">
      <center>
        <h2>Bookmark favourite playlists from spotify</h2>
      </center>
      <center>
        <div className="table-container">
          <div className="spotify">
            <center>
              <h4>Latest featured playlists</h4>
            </center>
            <SpotifyList />
          </div>
          <div className="local">
            <center>
              <h4>Locally stored playlists</h4>
            </center>
            <StoredList />
          </div>
        </div>
      </center>
    </div>
  </Provider>
);

export default App;
