import React, { useState } from 'react'
import Date from '../Date'
import { Form, Formik } from 'formik';

const Home = () => {
    const [prevLeave, setPrevLeave] = useState(false);
    const intialValues ={
        
    }
    const handleSave = () => {

    }
  return (
    <div className=''>
        <Formik 
        initialValues={intialValues}
        onSubmit={handleSave}>

        <Form>

        <h1 className='text-center text-blue-500 font-bold text-4xl'>Leave Application</h1>
        <div className='pt-6'>
            <Date prepositon={"From Date"}/>
        </div>
        <div className='pt-4'>
            <Date prepositon={"To Date"}/>
        </div>
        <div className='text-center pt-5'>
            <textarea 
            placeholder='Reason for applying Leave' 
            className='bg-yellow-100 w-3/6 h-40 outline-blue-300 outline-8 '/>
        </div>
        <div className='text-center mt-6'>
           <button className='bg-blue-600 py-3 px-10 text-white font-bold rounded-md text-center'>Apply for leave</button> 
        </div>
        <div className='text-center mt-6'
        onClick={() => setPrevLeave(!prevLeave)}>
           <button className='bg-yellow-500 py-3 px-10 text-white font-bold rounded-md text-center'>Check previous leaves</button> 
        </div>
        <div>
            
        </div>
        </Form>
        </Formik>
    </div>
  )
}

export default Home
