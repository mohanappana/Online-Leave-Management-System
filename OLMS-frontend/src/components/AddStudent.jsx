import React from 'react'
import study from '../assets/hodpage/study.png'
import FormikControl from './FormikControl'
import { Formik,Form } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';

const AddStudent = () => {
    const onSubmit = async (values) =>{
        try{
          const response = await axios.post("http://localhost:8080/api/teacher",values)
          return response.data
        }catch(error){
          console.error("e",error)
        }
      }
  return (
    <div>
      <div className='bg-gradient-to-r from-teacherleft via-teachercenter to-teacherright min-h-44 flex flex-nowrap relative '>
            <div className='flex absolute top-7 left-20  justify-center items-center'>
              <img className='w-24 h-auto mt-6' src={study} alt="study" />
            </div>
          <div className='ml-3 absolute top-20 left-40  font-bold text-4xl '>Adding Student</div>
        
      </div>
      <div>
      <Formik 
      initialValues={
        {
            teacherId:"",
            teacherName:"",
            teacherPhone:"",
            teacherEmail:"",
        }
      }
      validationSchema={
        Yup.object({
            teacherId:Yup.string()
                .required("Teacher Id is Required")
                .length(7, "Must be exactly 7 characters"),
            teacherName:Yup.string()
                .min(5,"Teacher Name atleast 5 characters")
                .max(15,"Teacher Name atmost 5 characters")
                .required("Teacher Name is Required"),
            teacherPhone:Yup.string().required("Teacher phone number is required"),
            teacherEmail:Yup.string().required("Teacher mail id")
        })
      }
      onSubmit={onSubmit}>
        <div className='relative'>
            

            <div className='w-full px-64 py-20'>
              <Form className='bg-inputback shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4  relative'>
                <div className='flex justify-around'>
                  <FormikControl control="input" name="teacherId" classNam="w-52 bg-login placeholder-black " type="text" placeholder="Student ID" fieldcls="bg-login" />
                  <FormikControl control="input" name="teacherName" classNam="w-52 bg-login placeholder-black" type="text" placeholder="Teacher Name" fieldcls="bg-login"/>
                  <FormikControl control="input" name="teacherPhone" classNam="w-52 bg-login placeholder-black" type="text" placeholder="Teacher Phone Number" fieldcls="bg-login"/> 

                </div>
                <div className='flex justify-evenly mt-4 mb-4'>
                  <FormikControl control="input" name="teacherEmail" classNam="w-52  border-black bg-login placeholder-black" type="text" placeholder="Teacher Mail ID" fieldcls="bg-login"/> 
                  <FormikControl control="input" name="teacherEmail" classNam="w-52 bg-login placeholder-black" type="text" placeholder="Teacher Mail ID" fieldcls="bg-login"/> 

                </div>
                  <div className='absolute bottom-5 left-4 flex gap-3'>
                  <FormikControl control="checkbox" classNam="text-xl" />
                  <p>I confirm adding this wirth my consent</p>             
                    
                  </div>
                  <button type="submit" className='bg-green-500 border-b border rounded-md absolute bottom-4 right-10 text-white px-3 py-1 '>
                      Submit
                  </button>
              </Form>
          </div>
        </div>

      </Formik>
      </div>
    </div>
  )
}

export default AddStudent
