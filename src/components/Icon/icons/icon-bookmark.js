export default function Bookmark({
    size = 32,
    color = 'currentColor',
    ...restProps
}) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            x="0px"
            y="0px"
            className='icon icon-bookmark'
            width={size}
            height={size}
            viewBox='0 0 28 28'
            fill={color}
            {...restProps}
        >
            <path d="M 7 5 L 7 28 L 8.59375 26.8125 L 16 21.25 L 23.40625 26.8125 L 25 28 L 25 5 Z M 9 7 L 23 7 L 23 24 L 16.59375 19.1875 L 16 18.75 L 15.40625 19.1875 L 9 24 Z" />
        </svg>
    )
}