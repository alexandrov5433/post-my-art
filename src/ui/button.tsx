import styles from '@/ui/styles/button.module.css';

export default function Button({
    title,
    type,
    stylingType
}: {
    title: string,
    type: 'button' | 'submit',
    stylingType: 'generic' | 'outline' | 'follow' | string[]
}) {
    return (
        <button
            className={
                stylingType instanceof Array ?
                    `${styles.btn}${
                        (stylingType.map(cl => ` ${styles[cl]}`)).join('')
                    }`
                    : `${styles.btn} ${styles[stylingType]}`
            }
            type={type}
        >{title}</button>
    );
}