import { SignOut } from '../auth/signout-button'

async function Header() {


  return (


    <div className='flex w-full items-center justify-between px-10 py-10'>
      <div className='flex items-center'>
        <h2 className='font-sans text-md font-semibold tracking-tight text-black'>
          Planner
        </h2>
      </div>

      <div className='flex items-center gap-4'>
        <SignOut />
      </div>
    </div>

  )
}

export default Header