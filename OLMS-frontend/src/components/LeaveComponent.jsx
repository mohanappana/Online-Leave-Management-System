import study from '../assets/hodpage/study.png';
import FormikControl from './FormikControl';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import axiosInstance from './axiosInstance';
import { useRecoilValue } from 'recoil';
import { userState } from './atom';
import CustomSnackbar from './CustomSnackbar';
import { useState } from 'react';

const LeaveComponent = () => {
  const studentId = useRecoilValue(userState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const onSubmit = async (values, { setSubmitting, setFieldError,resetForm }) => {
    const { agreeTerms, ...submitValues } = values;
    const formattedValues = {
      ...submitValues,
      fromDate: values.fromDate ? values.fromDate.format('DD-MM-YYYY') : null,
      toDate: values.toDate ? values.toDate.format('DD-MM-YYYY') : null,
      
    };
    console.log(formattedValues,'hello');
    try {
      const response = await axiosInstance.post('/leave/applyLeave', formattedValues);
      
      console.log('Response:', response.data);
      
      setSnackbarOpen(true);
      resetForm();
     
    } catch (error) {
      console.error('Error:', error);
      if(error.response && error.response.data){
        setFieldError(error.response.data);
      }else{
        setFieldError('apiError',"An unexpected error occurred. Please try agian.");
      }
      
    } finally {
      
      
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-studentleft via-studentcenter to-studentright min-h-44 flex flex-nowrap relative">
        <div className="flex absolute top-7 left-14 sm:left-20 justify-center items-center">
          <img className="w-24 h-auto mt-6" src={study} alt="study" />
        </div>
        <div className="ml-5 absolute top-20 left-32 sm:left-40 font-bold text-4xl">
          Apply for Leave
        </div>
      </div>
      <div>
        <Formik
          initialValues={{
            fromDate: null,
            toDate: null,
            leaveReason: '',
            agreeTerms: false,
            student: {
              studentId: studentId
            },
          }}
          validationSchema={Yup.object({
            fromDate: Yup.date()
              .required('From Date is Required')
              .nonNullable(),
            toDate: Yup.date()
              .required('To Date is Required')
              .nonNullable(),
            leaveReason: Yup.string().required('Reason is Required'),
            agreeTerms: Yup.bool().oneOf(
              [true],
              'You must confirm your consent to proceed'
            ),
          })}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, values }) => (
            <div className="relative">
              <div className="w-full px-16 py-20">
                <Form className="bg-inputback shadow-md rounded-3xl px-8 pt-6 pb-10 mb-4 relative">
                  <div className='flex flex-col md:flex-row'>
                    <div className="mt-7 mb-5 basis-1/4">
                      <div className='grid grid-rows-2 gap-4'>
                        <FormikControl
                          control="date"
                          name="fromDate"
                          label="From Date"
                          classNam="w-full sm:w-52 bg-login placeholder-black"
                        />
                        <FormikControl
                          control="date"
                          name="toDate"
                          label="To Date"
                          minDate={values.fromDate}
                          classNam="w-full sm:w-52 bg-login placeholder-black"
                        />
                      </div>
                    </div>
                    <div className=" basis-3/4 sm:mx-10">
                      <FormikControl
                        control="textarea"
                        name="leaveReason"
                        label="Reason for Leave"
                        placeholder="Enter the reason for your leave"
                        classNam="w-full border-black bg-login placeholder-black"
                      />
                    </div>
                  </div>
                    
                  <div className="sm:absolute sm:bottom-5 sm:left-4 flex gap-3">
                    <FormikControl
                      control="checkbox"
                      name="agreeTerms"
                      label="I confirm adding this with my consent"
                      classNam="text-xl"
                    />
                  </div>
                  {errors.apiError && (
                    <div className="text-red-600 text-center mt-2">
                      {errors.apiError}
                    </div>
                  )}
                  <div className='flex justify-center'>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-green-500 border-b border rounded-md sm:absolute sm:bottom-[10px] sm:right-[72px] text-white px-3 py-1"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>
        <CustomSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={1000}
        message="Leave Applied Successfully!"
        severity="success"
      />
      </div>
    </div>
  );
};

export default LeaveComponent;
