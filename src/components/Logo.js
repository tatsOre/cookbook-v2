import Link from 'next/link'

function Logo() {
  return (
    <Link data-info="logo" href='/'>
      <div className="h-full px-4 flex items-center">
        <span className='font-display font-bold capitalize text-xl'>cookbook</span>
      </div>
    </Link>
  )
}

export default Logo
