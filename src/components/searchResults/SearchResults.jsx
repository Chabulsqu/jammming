import Tracklist from '../tracklist/Tracklist';
import styles from './SearchResults.module.css';
import addIcon from '../../assets/icons/addIcon.svg';


export default function SearchResults({ error }) {
    return (<section className={styles.searchResults}>
        <h2>Results</h2>
        <Tracklist icon={addIcon} />
        {error && <p className={styles.searchError}>
        Oh-oh! Invalid Characters Detected. Please use only letters (lowercase or uppercase) in your search and avoid extremely long search terms. If the error persists, Spotify could also be down during this time.</p>}
    </section>);
}