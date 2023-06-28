import SearchBar from './components/searchBar/SearchBar';
import SearchResults from './components/searchResults/searchResults';
import Playlist from './components/playlist/Playlist';
import React, { useState } from 'react';

export const context = React.createContext()

function App() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(false);

  const checkInvalidCharacters = value => !/^[a-zA-Z\s]+$/.test(value);

  return (
    <main>
      <context.Provider value={[tracks, playlistTracks, setPlaylistTracks]}>
        <SearchBar setTracks={setTracks} setError={setError} checkInvalidCharacters={checkInvalidCharacters} />
        <SearchResults error={error} />
        <Playlist checkInvalidCharacters={checkInvalidCharacters} />
      </context.Provider>
    </main>
  );
}

export default App
