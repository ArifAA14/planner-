import { registerUser } from '@/src/app/actions/register'
import React from 'react'
import { Input } from '../../ui/Inputs/Input'
import { useTranslations } from 'next-intl';

function RegisterForm() {
  const t = useTranslations('RegisterPage');
  return (
    <form action={registerUser} className=' w-full flex flex-col gap-5 h-full'>
      <div className='flex flex-col gap-1 '>
        <label htmlFor='name' className='px-2 font-light text-gray-500 text-sm lowercase'>
          {t('FullName')}
        </label>
        <Input
          id='name'
          name='name'
          placeholder={t('FullName')}
          required
          type='text'
        />

      </div>
      <div className='flex flex-col gap-1 '>
        <label htmlFor='email' className='px-2 font-light text-gray-500 text-sm lowercase'>
          {t('Email')}
        </label>
        <Input
          id='email'
          name='email'
          placeholder={t('Email')}
          required
          type='email'
        />
      </div>

      <div className='flex flex-col gap-1 '>
        <label htmlFor='name' className='px-2 font-light text-gray-500 text-sm lowercase'>
          {t('Password')}
        </label>
        <Input
          id='password'
          name='password'
          placeholder={t('Password')}
          required
          type='password'
        />
        <p className='text-gray-600 text-sm px-2'>
          {t('PasswordMessage')}
        </p>
      </div>


      <button type="submit" className='font-medium text-lg mt-4 px-6 py-2 w-full bg-red-700 
       text-white rounded-lg shadow-sm'>
        {t('Title')}
      </button>
    </form>
  )
}

export default RegisterForm