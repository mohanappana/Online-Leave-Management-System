import { Form, Formik, Field, ErrorMessage } from 'formik'
import React from 'react';
import * as Yup from "yup";
import FormikControl from '../FormikControl';
import axios from 'axios';

const TeacherRegisterForm = () => {
    const onSubmit = async (values) =>{
      try{
        const response = await axios.post("http://localhost:8080/api/teacher",values)
        return response.data
      }catch(error){
        console.error("e",error)
      }
    }
  return (
    <div className='flex items-center justify-center'>
      <Formik 
      initialValues={
        {
            teacherId:"",
            teacherName:"",
            teacherPhone:""
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
            teacherPhone:Yup.string().required("Teacher phone number is required")
        })
      }
      onSubmit={onSubmit}>
        <div className='w-full max-w-sm'>
            <h2 className='text-center mt-5'>Register Teacher</h2>
            <Form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <FormikControl control="input" name="teacherId" label="Teacher ID:" type="text" placeholder="Teacher ID"/>
                <FormikControl control="input" name="teacherName" label="Teacher Name:" type="text" placeholder="Teacher Name"/>
                <FormikControl control="input" name="teacherPhone" label="Teacher Phone:" type="text" placeholder="Teacher Phone Number"/>               
                <button type="submit" className='bg-blue-500 border-b rounded-md text-white px-3 py-1 '>
                    Submit
                </button>
            </Form>
        </div>

      </Formik>
    </div>
  )
}

export default TeacherRegisterForm
