import React, { useState } from 'react'
import addteacher from '../assets/hodpage/addt.png'
import FormikControl from './FormikControl'
import { Formik,Form } from 'formik';
import * as Yup from 'yup';
import axiosInstance from './axiosInstance';
import CustomSnackbar from './CustomSnackbar';
const AddTeacher = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const onSubmit = async (values,{resetForm}) =>{
    const { agreeTerms, ...submitValues } = values;
    try{
      const response = await axiosInstance.post("http://localhost:8080/api/teacher/teacher",submitValues);
      setSnackbarOpen(true);
      resetForm();
      return response.data
    }catch(error){
      console.error("e",error)
    }
  }
  
  return (
    <div>
      <div className='bg-gradient-to-r from-hodleft via-hodcenter to-hodright min-h-44 flex flex-nowrap relative '>
          
          <div className='flex absolute top-7 left-20  justify-center items-center'>
              <img className='w-24 h-auto mt-6' src={addteacher} alt="Add Teacher" />
            </div>
          <div className='ml-3 absolute top-20 left-40  font-bold text-4xl '>Adding Teacher</div>
        
      </div>
      <div>
      <Formik 
      initialValues={
        {
            teacherId:"",
            teacherName:"",
            teacherPhone:"",
            teacherEmail:"",
            teacherAddedBy:"",
            agreeTerms:false,
            
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
            teacherPhone:Yup.string().required("Teacher phone no. is required"),
            teacherEmail:Yup.string().required("Teacher mail id"),
            agreeTerms: Yup.bool().oneOf(
              [true],
              'You must confirm your consent to proceed'
            ),
        })
      }
      onSubmit={onSubmit}>
        <div className='flex justify-center relative'>

          <div className='min-w-lg px-64 py-20'>
              <Form className='bg-inputback shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4  relative'>
                <div className='grid grid-flow-row  auto-rows-auto'>
                  <FormikControl control="textfield" label="Teacher Id" name="teacherId" classNam="w-52 bg-login placeholder-black " type="text" placeholder="Teacher ID" fieldcls="bg-login" />
                  <FormikControl control="textfield" label="Teacher Name" name="teacherName" classNam="w-52 bg-login placeholder-black" type="text" placeholder="Teacher Name" fieldcls="bg-login"/>
                  {/* <FormikControl control="textfield" name="teacherPhone" classNam="w-52 bg-login placeholder-black" type="text" placeholder="Teacher Phone Number" fieldcls="bg-login"/>  */}

                {/* </div>
                <div className='flex justify-evenly mt-4 mb-4'> */}
                  <FormikControl control="textfield" label="Teacher Mail Id" name="teacherEmail" classNam="w-52  border-black bg-login placeholder-black" type="text" placeholder="Teacher Mail ID" fieldcls="bg-login"/> 
                  <FormikControl control="textfield" label="Teacher Teacher Phone" name="teacherPhone" classNam="w-52 bg-login placeholder-black" type="text" placeholder="Teacher Phone Number" fieldcls="bg-login"/> 
                  
                </div>
                <div>
                    <div className='my-4' >
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

export default AddTeacher
