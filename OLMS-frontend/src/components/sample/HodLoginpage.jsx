import { Form, Formik } from 'formik'
import React from 'react'
import FormikControl from '../FormikControl'


const HodLoginpage = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Formik>
        <div className='max-w-xs w-full'> 
            <Form>
                <FormikControl control="input" type="text" name="HodId" label="HOD ID:" placeholder="ID Number" />
                <FormikControl control="input" type="password" name="HodPassword" label="Password:" placeholder="Password"/>
            </Form>
        </div>
      </Formik>
    </div>
  )
}

export default HodLoginpage
