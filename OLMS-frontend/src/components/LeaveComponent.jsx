import study from '../assets/hodpage/study.png';
import FormikControl from './FormikControl';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LeaveComponent = () => {
  const onSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/studentLeaves',
        values
      );
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
      setFieldError('apiError', 'Failed to submit the leave. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
            reason: '',
            agreeTerms: false,
          }}
          validationSchema={Yup.object({
            fromDate: Yup.date()
              .required('From Date is Required')
              .nullable(),
            toDate: Yup.date()
              .required('To Date is Required')
              .nullable(),
            reason: Yup.string().required('Reason is Required'),
            agreeTerms: Yup.bool().oneOf(
              [true],
              'You must confirm your consent to proceed'
            ),
          })}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors }) => (
            <div className="relative">
              <div className="w-full px-16 py-20">
                <Form className="bg-inputback shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 relative">
                  <div className='flex flex-row'>
                    <div className="mt-6 mb-4 basis-1/4">
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
                          classNam="w-52 bg-login placeholder-black"
                        />
                      </div>
                    </div>
                    <div className=" basis-3/4 my-4 mx-10">
                      <FormikControl
                        control="textarea"
                        name="reason"
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
