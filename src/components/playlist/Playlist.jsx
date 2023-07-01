import Tracklist from "../tracklist/Tracklist.jsx";
import styles from "./Playlist.module.css";
import removeIcon from "../../assets/icons/removeIcon.svg";
import { useState, useContext, useRef, useEffect } from "react";
import { context } from "../../App.jsx";
import { authenticate, savePlaylist, refreshToken } from "../../util/Spotify";


export default function Playlist({ checkInvalidCharacters }) {
    const [inputValue, setInputValue] = useState("");
    const [errorContent, setErrorContent] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [tracks, playlistTracks, setPlaylistTracks] = useContext(context);
    const nameInputRef = useRef();
    const saveButtonRef = useRef();

    const handleChange = ({ target: { value } }) => {
        if (checkInvalidCharacters(value) && value.trim() !== '') {
            return;
        } else if (value.trim() !== '') {
            nameInputRef.current.setCustomValidity('');
        }
        successMessage && setSuccessMessage(false);
        setInputValue(value);
    }
    const handleSubmit = async e => {
        e.preventDefault();
        if (inputValue.trim() === '') {
            e.target.blur();
            nameInputRef.current.setCustomValidity(' ');
            setErrorContent('Oops! Invalid playlist name. \
            Please enter a value that is not just whitespace.');
            return;
        }
        if (playlistTracks.length < 1) {
            e.target.blur();
            saveButtonRef.current.setCustomValidity(' ');
            setErrorContent('Oops! Your playlist is empty. \
            To save your playlist, please add 1 or more tracks.');
            return;
        }
        let accessToken = JSON.parse(localStorage.getItem('access_token'));
        if (accessToken === null) {
            accessToken = await authenticate();
        }
        else if (accessToken.expDate + 3600000 < (new Date()).getTime()) {
            accessToken = refreshToken();

        }
        savePlaylist(accessToken, inputValue, playlistTracks) && setSuccessMessage(true);
        e.target.blur();
        setInputValue("");
        setPlaylistTracks([]);
    }
    useEffect(() => {
        // Makes sure no track number error or success message is displayed after tracks are added to the playlist
        saveButtonRef?.current?.setCustomValidity('');
        successMessage && playlistTracks.length > 0 && setSuccessMessage(false);
    }, [playlistTracks, successMessage])
    
    return (<form className={styles.playlist} onSubmit={handleSubmit} data-content={errorContent}>
        <input className={styles.playlistHeading} id="playlistName" value={inputValue} name="playlistName" onChange={handleChange} placeholder="Enter your playlist name" ref={nameInputRef} />
        <label htmlFor="playlistName" className="visually-hidden">Playlist name:</label>
        <hr className={styles.playlistRule} />
        <Tracklist icon={removeIcon} />
        {successMessage && <p className={styles.successParagraph}>Success! Your playlist has been saved.</p>}
        <button type="submit" className={styles.saveButton} ref={saveButtonRef} formNoValidate>Save to Spotify</button>
    </form>);
}