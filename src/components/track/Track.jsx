import React from 'react';
import styles from './Track.module.css';


export default function Track({track, icon, tracks, playlistTracks, setPlaylistTracks}) {
    const handleClick = () => {
        const filteredTracks = playlistTracks.slice().filter(element => element.id !== track.id); // Copies array without modifying it and then filters our track out of it
        filteredTracks.length === playlistTracks.length ? setPlaylistTracks([...playlistTracks, track]) : setPlaylistTracks(filteredTracks) // Checks if track isn't on array 
    }

    return (<React.Fragment>
    <h3 className={styles.songHeading}>{track.name}</h3>
    <img src={icon} alt="Add song to Playlist?" onClick={handleClick} />
    <p className={styles.songParagraph}>{track.artists[0].name} | {track.album.name}</p>
    <hr className={styles.songBreak}></hr>
    </React.Fragment>);
}