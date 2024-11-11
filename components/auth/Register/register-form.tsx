import { registerUser } from '@/src/app/actions/register'
import React from 'react'
import { Input } from '../../ui/Inputs/Input'

function RegisterForm() {
  return (
    <form action={registerUser} className=' w-full flex flex-col gap-5 h-full'>
      <div className='flex flex-col gap-1 '>
        <label htmlFor='name' className='px-2 font-light text-gray-500 text-sm lowercase'>
          Full Name
        </label>
        <Input
          id='name'
          name='name'
          placeholder='Username'
          required
          type='text'
        />

      </div>
      <div className='flex flex-col gap-1 '>
        <label htmlFor='email' className='px-2 font-light text-gray-500 text-sm lowercase'>
          Email Address
        </label>
        <Input
          id='email'
          name='email'
          placeholder='Email'
          required
          type='email'
        />
      </div>

      <div className='flex flex-col gap-1 '>
        <label htmlFor='name' className='px-2 font-light text-gray-500 text-sm lowercase'>
          Password
        </label>
        <Input
          id='password'
          name='password'
          placeholder='Password'
          required
          type='password'
        />
        <p className='text-gray-600 text-sm px-2'>
          Password must be at least 8 characters long.
        </p>
      </div>


      <button type="submit" className='font-medium text-lg mt-4 px-6 py-2 w-full bg-red-700 
       text-white rounded-lg shadow-sm'>Register</button>
    </form>
  )
}

export default RegisterForm