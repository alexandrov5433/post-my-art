import { ArtCardData } from "@/lib/definitions";
import styles from '@/ui/styles/art-card.module.css';
import Image from "next/image";
import Button from "./button";
import HeartIcon from "./svgs/heart";
import CommentBubblesIcon from "./svgs/commentBubbles";
import StarIcon from "./svgs/star";

export default function ArtCard(
    data: ArtCardData,
    showTags: boolean = false,
    showAddComment: boolean = false
) {

    return (
        <article
            key={data.artId}
            className={`${styles.container}`}>

            <section className={`${styles.topUser}`}>
                <a href="#" className={`${styles.anchorTopUser}`}>
                    <div className={`${styles.profilePicAndNameContainer}`}>
                        <div className={`${styles.picContainer}`}>
                            <Image
                                className={`${styles.pic}`}
                                src={data.profilePictureUrl}
                                alt="The profile picture of this user."
                                width={50}
                                height={50}
                            ></Image>
                        </div>
                        <div className={`${styles.nameContainer}`}>
                            <p
                                className={`${styles.name}`}
                            >@{data.userName}</p>
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
                <div className={`${styles.artNameContainer}`}>
                    <p
                        className={`${styles.artName}`}
                    >{data.artName}</p>
                </div>
                {showTags ? (
                    <div className={`${styles.tags}`}>
                        {data.artTags.map((t, i) => <p className={`${styles.tag}`} key={i}>{t}</p>)}

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
                        <HeartIcon className={`${styles.icon} ${styles.generalIcons}`}></HeartIcon>
                        <span>{data.likesCount || 0}</span>
                    </a>
                    <a href="#">
                        <CommentBubblesIcon className={`${styles.icon} ${styles.generalIcons}`}></CommentBubblesIcon>
                        <span>{data.commentsCount || 0}</span>
                    </a>
                    <a href="#">
                        <StarIcon className={`${styles.icon} ${data.isInFavorites ? styles.yellowStar : styles.star}`}></StarIcon>
                    </a>
                </div>
            </section>
        </article>
    );
}