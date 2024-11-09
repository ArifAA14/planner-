'use client'
import React from 'react'
import RegisterForm from './register-form'
import { motion } from 'framer-motion'
function RegisterComponent({ setFormSelected }: { setFormSelected: React.Dispatch<React.SetStateAction<string>> }) {
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
          Register
        </h1>
        <p className='text-gray-400 font-medium text-md'>
          Register up for a free account to start your journey.
        </p>
      </div>
      <div className=''>
        <RegisterForm />
      </div>
      <div className='flex flex-col w-full items-center justify-center'>
        <a className='font-medium text-base text-center px-6 py-1 w-full text-gray-400 '
          onClick={() => setFormSelected('login')}
        >
          Already have an account?  <span className='text-red-700 cursor-pointer'>Login</span>
        </a>
      </div>
    </motion.div>
  )
}

export default RegisterComponent