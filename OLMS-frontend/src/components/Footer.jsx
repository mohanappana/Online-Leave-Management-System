import React from 'react'
import email from '../assets/email.png'
const Footer = () => {
  return (
    <div className='mt-10'>

      <footer className='bg-[#000931] text-white text-center flex flex-col items-center h-56 relative'>

        <div className='flex flex-col mt-5 items-center w-full'>
          <div className="flex justify-center items-center mt-5">
              <img className="w-20" src={email} alt="Logo" />
              <p className="text-4xl font-bold ml-1">
                  <span className="text-blue-400">O</span>LMS
              </p>
          </div>
          <div className='text-[#77bcfd]'>
          Paperless, Efficient, Secure leave management across educational institutions
          </div>
        
        

        
        </div>
      <div className='bg-[#0053bf] flex justify-center items-center absolute bottom-0 w-full h-10'>
      &copy; Copyright Appana Mohan
      </div>
      </footer>
    </div>
  )
}

export default Footer
