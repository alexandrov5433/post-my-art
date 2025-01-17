import Image from "next/image";
import searchIcon from '../../public/icons/search.svg';
import styles from '@/ui/styles/search.module.css';

export default function Search() {
    return (
        <div className={styles.container}>
            <span className={styles.imageContainer}>
                <Image
                className={styles.imageElem} 
                unoptimized 
                src={searchIcon} 
                alt="A search icon."></Image>
            </span>
            <input
                type="text"
                className={styles.search}
                placeholder="Search Art Pieces..."
            />
        </div>
    );
}