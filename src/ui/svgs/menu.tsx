export default function MenuIcon({
    className = ''
}: {
    className: string
}) {
    return (
        <svg className={`${className}`} width="800px" height="800px" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}