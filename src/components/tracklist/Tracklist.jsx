import { useContext } from "react";
import Track from "../track/Track";
import styles from './Tracklist.module.css';
import { context } from "../../App";


export default function Tracklist({icon}) {
    const [tracks, playlistTracks, setPlaylistTracks] = useContext(context);

    return (<output key={icon} className={icon === '/src/assets/icons/addIcon.svg' ? styles.searchResultsPlaylist : styles.playlistTracklist}>
    {icon === '/src/assets/icons/addIcon.svg' ? tracks.map(track => <Track track={track} icon={icon} tracks={tracks} playlistTracks={playlistTracks} setPlaylistTracks={setPlaylistTracks} key={track.id} />) : playlistTracks.map(track => <Track track={track} icon={icon} tracks={tracks} playlistTracks={playlistTracks} setPlaylistTracks={setPlaylistTracks} key={track.id} />)
    }
    </output>)
}