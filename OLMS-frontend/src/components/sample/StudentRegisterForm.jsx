import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from "yup";
import FormikControl from '../FormikControl';
import axios from 'axios';

const StudentRegisterForm = () => {

    const onSubmit = async (values) => {
      try{
        const response = await axios.post(`http://localhost:8080/api/student`,values);
        console.log(response.data);
        return response.data;
      }catch(error){
        console.error("Some error was occuried while saving the student",error);
      }

      

  

    }
  return (
    <div className='flex items-center justify-center'>
      <Formik
      initialValues={
        {
            studentId:"",
            studentName:"",
            studentPhone:""
        }
      }
      validationSchema={
        Yup.object({
            studentId:Yup.string()
                .required("Student Id is Required")
                .length(7, "Must be exactly 7 characters"),
            studentName:Yup.string()
                .min(5,"Student Name atleast 5 characters").required("Student Name is Required"),
            studentPhone:Yup.string().required("Student phone number is Required")
        })
      }
      onSubmit={onSubmit}>
      <div className='w-full max-w-sm'>
        <h2 className='text-center mt-5'>Register Student</h2>
        <Form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <FormikControl control="input" name="studentId" label="Student ID:" type="text" placeholder="Student ID"/>
          <FormikControl control="input" name="studentName" label="Student Name:" type="text" placeholder="Student Name"/>
          <FormikControl control="input" name="studentPhone" label="Student Phone:" type="text" placeholder="Student Phone Number"/>
          
          <button type="submit" className='bg-blue-600 text-white px-3 py-1 rounded-md'>Submit</button>
        </Form>
      </div>
      </Formik>
    </div>
  )
}

export default StudentRegisterForm
