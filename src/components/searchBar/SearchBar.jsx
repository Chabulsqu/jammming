import { authenticate, refreshToken, searchTracks } from '../../util/Spotify'
import styles from './SearchBar.module.css';
import { useState } from 'react';


export default function SearchBar({ setTracks, setError, checkInvalidCharacters }) {
  const [searchValue, setSearchValue] = useState('');
  const handleChange = ({target: {value}}) => {
    if (checkInvalidCharacters(value) && value.trim() !== '') {
      return;
    }
    setSearchValue(value);
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const formChildren = e.target.children;
    formChildren[1].blur();
    if (searchValue.trim() === '') {
      formChildren[0].setCustomValidity(' ')
      return;
    } 
    formChildren[0].setCustomValidity('')
    let accessToken = JSON.parse(localStorage.getItem('access_token'));
    if (accessToken === null) {
      accessToken = await authenticate()
    }
    else if (accessToken.expDate + 3600000 < (new Date()).getTime()) {
      accessToken = refreshToken();
    }
    const results = await searchTracks(accessToken, searchValue);
    if (results.tracks && results.tracks.items.length !== 0) {
      setTracks(results.tracks.items);
      setError(false);
      return;
    }
    setError(true);
    setTracks([])
  }

  return <form onSubmit={handleSubmit}>
    <input placeholder="Enter a song title" name="search-bar" className={styles.searchInput} value={searchValue} onChange={handleChange} />
    <button className={styles.searchButton} type="submit" formNoValidate>Search</button>
  </form>
}