export default function Bookmark({
    size = 28,
    color = 'currentColor',
    ...restProps
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            className='icon icon-bookmark-filled'
            width={size}
            height={size}
            viewBox='0 0 28 28'
            stroke={color}
            strokeWidth='2'
            fill='none'
            {...restProps}
        >
            <path d="M25,27l-9-6.75L7,27V4h18V27z"></path>
        </svg>
    )
}
