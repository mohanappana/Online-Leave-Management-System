import React, { useState } from 'react'
import study from '../assets/hodpage/study.png'
import FormikControl from './FormikControl'
import { Formik,Form } from 'formik'
import * as Yup from 'yup';

import { useRecoilValue } from 'recoil';
import { userState } from './atom';
import axiosInstance from './axiosInstance';
import CustomSnackbar from './CustomSnackbar';

const AddStudent = ({left,center,right}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const userId = useRecoilValue(userState);
    const onSubmit = async (values,{resetForm}) =>{
      const { agreeTerms, ...submitValues } = values;
        try{
          const response = await axiosInstance.post("/api/student/student",submitValues)
          setSnackbarOpen(true);
          resetForm();
          return response.data
        }catch(error){
          console.error("e",error)
        }
      }
  return (
    <div>
     <div
        className="min-h-44 flex flex-nowrap relative"
        style={{
          background: `linear-gradient(to right, ${left}, ${center}, ${right})`,
        }}
      >
            <div className='flex absolute top-7 left-10 sm:left-20  justify-center items-center'>
              <img className='w-24 h-auto mt-6' src={study} alt="study" />
            </div>
          <div className='ml-3 absolute top-20 left-32 sm:left-40  font-bold text-4xl '>Adding Student</div>
        
      </div>
      <div>
      <Formik 
      initialValues={
        {
            studentId:"",
            studentName:"",
            studentPhone:"",
            studentEmail:"",
            studentAddedBy:userId,
            agreeTerms: false,
            
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
            agreeTerms: Yup.bool().oneOf(
              [true],
              'You must confirm your consent to proceed'
            ).required("Tick checkbox"),


        })
      }
      onSubmit={onSubmit}>
        <div className='flex  justify-center relative'>
            

            <div className='max-w-lg px-28 py-20'>
              <Form className='bg-inputback shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4  relative'>
                <div className='grid grid-flow-row justify-center auto-rows-auto'>
                  <FormikControl control="textfield" label="Student Id" name="studentId" classNam="w-40 bg-login placeholder-black " type="text" placeholder="Student ID" fieldcls="bg-login" />
                  <FormikControl control="textfield" label="Student Name" name="studentName" classNam="w-52 bg-login placeholder-black" type="text" placeholder="Student Name" fieldcls="bg-login"/>
                  

                
                  <FormikControl control="textfield" label="Student Email" name="studentEmail" classNam="w-52  border-black bg-login placeholder-black" type="text" placeholder="Student Mail ID" fieldcls="bg-login"/> 
                  <FormikControl control="textfield" label="Student Phone" name="studentPhone" classNam="w-52 bg-login placeholder-black" type="text" placeholder="Student Mail ID" fieldcls="bg-login"/> 
                  

                
                  <div className='mt-5'>
                    <div className='mb-5' >
                      <FormikControl
                        control="checkbox"
                        name="agreeTerms"
                        label="I confirm adding this with my consent"
                        classNam="text-xl text-clip"
                      />              
                      
                    </div>
                    <div className='flex justify-center'>
                      

                      <button type="submit" className='bg-green-500 border-b border rounded-md  text-white px-3 py-1 '>
                          Submit
                      </button>
                      
                    </div>
                    
                  </div>
                  
                </div>
              </Form>
          </div>
        </div>

      </Formik>
      </div>
      <CustomSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={1000}
        message="Leave Applied Successfully!"
        severity="success"
      />
    </div>
  )
}

export default AddStudent
