import { ArtCardData } from "@/lib/definitions";
import styles from '@/ui/styles/art-card.module.css';
import Image from "next/image";
import Button from "./button";
import heartIcon from '../../public/icons/heart.svg';
import commentBubblesIcon from '../../public/icons/comment-bubbles.svg';
import starIcon from '../../public/icons/star.svg';

export default function ArtCard(
    data: ArtCardData,
    showTags: boolean = false,
    showAddComment: boolean = false
) {
    // const HeartSVG = ({ color = '#222'}) => {
    //     return (<svg width="800px" height="800px" viewBox="0 0 16 16" fill={`${color}`} xmlns="http://www.w3.org/2000/svg">
    //         <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" fill="#000000" />
    //     </svg>);
    // }
    return (
        <article
            key={data.artId}
            className={`${styles.container}`}>

            <section className={`${styles.topUser}`}>
                <a href="#" className={`${styles.anchorTopUser}`}>
                    <div className={`${styles.profilePicAndNameContainer}`}>
                        <div className={`${styles.pic}`}>
                            <Image
                                src={data.profilePictureUrl}
                                alt="The profile picture of this user."
                                width={50}
                                height={50}
                            ></Image>
                        </div>
                        <div className={`${styles.name}`}>
                            <p>@{data.userName}</p>
                        </div>
                    </div>
                </a>
                <div className={`${styles.buttonContainer}`}>
                    <Button
                        type="button"
                        stylingType="follow"
                        title="Follow"
                    ></Button>
                </div>
            </section>

            <a href="#">
                <Image
                    src={data.artUrl}
                    alt="An art piece from this user."
                    width={300}
                    height={300}
                    className={`${styles.artImage}`}
                ></Image>
            </a>

            <section className={`${styles.bottom}`}>
                <div className={`${styles.artName}`}>
                    <p>{data.artName}</p>
                </div>
                {showTags ? (
                    <div className={`${styles.tags}`}>
                        {data.artTags.map((t, i) => <p key={i}>{t}</p>)}

                    </div>
                ) : ('')}
                {showAddComment ? (
                    <div className={`${styles.addComment}`}>
                        <textarea name="comment" placeholder="Leave a comment..."></textarea>
                        <Button
                            type='button'
                            stylingType="follow"
                            title="Submit Comment"
                        ></Button>
                    </div>
                ) : ('')}
                <div className={`${styles.controls}`}>
                    <a href="#">
                        <Image
                            src={heartIcon}
                            alt="Like button in the shape of a heart."
                            // unoptimized
                        ></Image>
                    </a>
                </div>
            </section>
        </article>
    );
}