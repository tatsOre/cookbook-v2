export default function Bookmark({
    size = 24,
    color = 'currentColor',
    ...restProps
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 13 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...restProps}
        >
            <path d="M0 0V16L6.5 12.0545L13 16V0H0Z" fill={color} />
        </svg>
    );
}
