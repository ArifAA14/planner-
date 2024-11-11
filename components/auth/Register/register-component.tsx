'use client'
import React from 'react'
import RegisterForm from './register-form'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl';
function RegisterComponent({ setFormSelected }: { setFormSelected: React.Dispatch<React.SetStateAction<string>> }) {
  const t = useTranslations('RegisterPage');
  return (
    <motion.div className='flex flex-col px-10 py-10 w-full h-full justify-between'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 1, y: -50 }}
      transition={{
        duration: 0.78,
        type: 'spring',
        damping: 10,
        bounce: 0.4
      }}
      key={'register'}
    >
      <div className='flex flex-col gap-1'>
        <h1 className='text-black font-medium text-3xl font-serif'>
          {t('Title')}
        </h1>
        <p className='text-gray-400 font-medium text-md'>
          {t('Subtitle')}
        </p>
      </div>
      <div className=''>
        <RegisterForm />
      </div>
      <div className='flex flex-col w-full items-center justify-center'>
        <a className='font-medium text-base text-center px-6 py-1 w-full text-red-700
          transition-all ease-linear duration-200 hover:text-black cursor-pointer hover:underline
          
        '
          onClick={() => setFormSelected('login')}
        >
          {t('BottomMessage')}
        </a>
      </div>
    </motion.div>
  )
}

export default RegisterComponent