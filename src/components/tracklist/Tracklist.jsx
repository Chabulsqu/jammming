import { useContext } from "react";
import Track from "../track/Track.jsx";
import styles from './Tracklist.module.css';
import { context } from "../../App.jsx";


export default function Tracklist({icon, isSearchResults}) {
    const [tracks, playlistTracks, setPlaylistTracks] = useContext(context);

    return (<output key={icon} className={isSearchResults ? '' : styles.playlistTracklist}>
    {isSearchResults ? tracks.map(track => <Track track={track} icon={icon} tracks={tracks} playlistTracks={playlistTracks} setPlaylistTracks={setPlaylistTracks} key={track.id} />) : playlistTracks.map(track => <Track track={track} icon={icon} tracks={tracks} playlistTracks={playlistTracks} setPlaylistTracks={setPlaylistTracks} key={track.id} />)
    }
    </output>)
}