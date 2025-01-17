import styles from '@/ui/styles/buttons/buttons.module.css';

export default function Button({
    title,
    type,
    stylingType
}: {
    title: string,
    type: 'button' | 'submit',
    stylingType: 'generic' | 'outline'
}) {
    return (
        <button
        className={`${styles.btn} ${styles[stylingType]}`}
        type={type}
        >{title}</button>
    );
}