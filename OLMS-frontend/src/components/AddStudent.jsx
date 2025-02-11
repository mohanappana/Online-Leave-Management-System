import React, { useState } from 'react'
import study from '../assets/hodpage/study.png'
import FormikControl from './FormikControl'
import { Formik,Form } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userState } from './atom';
import axiosInstance from './axiosInstance';

const AddStudent = () => {
  const [email,setEmail] = useState("");
  const teacherId = useRecoilValue(userState);
    const onSubmit = async (values) =>{
        try{
          const response = await axiosInstance.post("http://localhost:8080/api/student/student",values)
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
            studentId:"",
            studentName:"",
            studentPhone:"",
            studentEmail:"",
            studentAddedBy:teacherId,
            
        }
      }
      validationSchema={
        Yup.object({
            studentId:Yup.string()
                .required("Student Id is Required")
                .length(7, "Must be exactly 7 characters"),
            studentName:Yup.string()
                .min(3,"Student Name atleast 3 characters")
                .max(15,"Student Name atmost 5 characters")
                .required("Student Name is Required"),
            studentPhone:Yup.string().required("Student phone number is required"),
            studentEmail:Yup.string().email().required("Student mail id"),

        })
      }
      onSubmit={onSubmit}>
        <div className='flex  justify-center relative'>
            

            <div className='min-w-xl px-28 py-20'>
              <Form className='bg-inputback shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4  relative'>
                <div className='grid grid-flow-row  auto-rows-auto'>
                  <FormikControl control="textfield" label="Student Id" name="studentId" classNam="w-52 bg-login placeholder-black " type="text" placeholder="Student ID" fieldcls="bg-login" />
                  <FormikControl control="textfield" label="Student First Name" name="studentName" classNam="w-52 bg-login placeholder-black" type="text" placeholder="Student Name" fieldcls="bg-login"/>
                  {/* <FormikControl control="textfield" label="Student Second Name" name="studentPhone" classNam="w-52 bg-login placeholder-black" type="text" placeholder="Student Phone Number" fieldcls="bg-login"/>  */}

                {/* </div> */}
                {/* <div className='flex justify-evenly mt-4 mb-4'> */}
                  <FormikControl control="textfield" label="Student Email" name="studentEmail" classNam="w-52  border-black bg-login placeholder-black" type="text" placeholder="Student Mail ID" fieldcls="bg-login"/> 
                  <FormikControl control="textfield" label="Student Phone" name="studentPhone" classNam="w-52 bg-login placeholder-black" type="text" placeholder="Student Mail ID" fieldcls="bg-login"/> 
                  

                {/* </div> */}
                  {/* <div className='absolute bottom-5 left-4 flex gap-3'> */}
                  <div className='relative'>
                    <div className='mb-7' >
                    <FormikControl
                      control="checkbox"
                      name="agreeTerms"
                      label="I confirm adding this with my consent"
                      classNam="text-xl text-clip"
                    />              
                      
                    </div>
                    <div className=' absolute -bottom-5 right-0'>
                      <div className=''>

                      <button type="submit" className='bg-green-500 border-b border rounded-md  text-white px-3 py-1 '>
                          Submit
                      </button>
                      </div>
                    </div>
                    
                  </div>
                  
                </div>
              </Form>
          </div>
        </div>

      </Formik>
      </div>
    </div>
  )
}

export default AddStudent
