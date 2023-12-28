import clsx from 'clsx'
import Link from 'next/link'

function Logo() {
  const afterContent = "relative after:content-['beta'] after:ml-1 after:-mt-2 after:px-1 after:text-[9px] after:font-semibold after:uppercase after:bg-black after:text-white"
  return (
    <Link data-info="logo" href='/'>
      <div className={clsx("h-full px-4 flex items-center", afterContent)}>
        <span className='font-display font-bold capitalize text-xl'>cookbook</span>
      </div>
    </Link>
  )
}

export default Logo
