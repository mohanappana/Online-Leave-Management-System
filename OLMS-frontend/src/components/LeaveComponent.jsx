import study from '../assets/hodpage/study.png';
import FormikControl from './FormikControl';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import axiosInstance from './axiosInstance';
import { useRecoilValue } from 'recoil';
import { userState } from './atom';

const LeaveComponent = () => {
  const studentId = useRecoilValue(userState)
  const onSubmit = async (values, { setSubmitting, setFieldError }) => {
    const { agreeTerms, ...submitValues } = values;
    const formattedValues = {
      ...submitValues,
      fromDate: values.fromDate ? values.fromDate.format('DD-MM-YYYY') : null,
      toDate: values.toDate ? values.toDate.format('DD-MM-YYYY') : null,
      
    };
    console.log(formattedValues,'hello');
    try {
      const response = await axiosInstance.post('/leave/applyLeave', formattedValues);
      alert('Leave applied successfully!',formattedValues);
      console.log('Response:', response.data);
      //console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
      setFieldError('apiError', 'Failed to submit the leave. Please try again.');
    } finally {
      //console.log(formattedValues);
      ;
      setSubmitting(false);
    }
  };
  const validateTodate = (values) =>{
    let error;
    
    if(values.fromDate <= values.toDate){
      console.log("from date")
    }else{
      throw "it is not in good format";
    }
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-teacherleft via-teachercenter to-teacherright min-h-44 flex flex-nowrap relative">
        <div className="flex absolute top-7 left-20 justify-center items-center">
          <img className="w-24 h-auto mt-6" src={study} alt="study" />
        </div>
        <div className="ml-3 absolute top-20 left-40 font-bold text-4xl">
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
                <Form className="bg-inputback shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 relative">
                  <div className='flex flex-row'>
                    <div className="mt-7 mb-5 basis-1/4">
                      <div className='grid grid-rows-2 gap-4'>
                        <FormikControl
                          control="date"
                          name="fromDate"
                          label="From Date"
                          classNam="w-52 bg-login placeholder-black"
                        />
                        <FormikControl
                          control="date"
                          name="toDate"
                          label="To Date"
                          minDate={values.fromDate}
                          classNam="w-52 bg-login placeholder-black"
                        />
                      </div>
                    </div>
                    <div className=" basis-3/4 mx-10">
                      <FormikControl
                        control="textarea"
                        name="leaveReason"
                        label="Reason for Leave"
                        placeholder="Enter the reason for your leave"
                        classNam="w-full border-black bg-login placeholder-black"
                      />
                    </div>
                  </div>
                    
                  <div className="absolute bottom-5 left-4 flex gap-3">
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
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-500 border-b border rounded-md absolute bottom-4 right-[72px] text-white px-3 py-1"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LeaveComponent;
