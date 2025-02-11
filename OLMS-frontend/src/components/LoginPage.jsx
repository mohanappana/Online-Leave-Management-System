import React, { useEffect, useState } from "react";
import FormikControl from "./FormikControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import fig2 from "../assets/fig2.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { roleState, userState } from "./atom";



Modal.setAppElement("#root");

const LoginPage = ({ isOpen, onRequestClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [role,setRole ] = useRecoilState(roleState);
  
 
  const [user,setUser] = useRecoilState(userState);
  console.log("Current user:", user);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: values.studentId,
        password: values.studentPassword,
      });
      console.log("Login Response:", response.data)
  
      const { username, jwtToken, roles } = response.data;
      const role = roles.replace("ROLE_","")
      const token = jwtToken;
      //console.log("Token from backend",token);
      setRole(role);
      setUser(username);
      console.log(role,"hello");
      //console.log("Updated Role:", response.data);  // Check if the role is set
      //console.log("Updated val",values); // Check if the user is set
  
      if (values.rememberme) {
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("userId",username)
      } else {
        sessionStorage.setItem("jwtToken", token);
        sessionStorage.setItem("userId",username)
      }
      console.log("Stored JWT Token:", sessionStorage.getItem("jwtToken"));
  
      if (onRequestClose) {
        onRequestClose(); 
      }
    } catch (error) {
      console.error("Login failed", error);
    }
    
   
    
  };
  useEffect(() => {
    if(user && role){
      const roleRoutes = {
        "STUDENT":"/studentDashboard",
        "TEACHER":"/teacherDashboard",
        "HOD":"/hodDashboard",
      };

      navigate(roleRoutes[role] || "/");
  }
  
    
  }, [role,user,navigate])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      className="bg-white rounded-xl shadow-lg   md:max-w-screen-lg mx-auto relative overflow-hidden"
      
    >
      {/* Close Button */}
      <button
        onClick={onRequestClose}
        className="absolute top-2 right-2 bg-gray-100 flex items-center px-2 pb-1  text-xl border rounded hover:bg-red-300 hover:text-red-900"
      >
        &times;
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2">
        
        <div className="hidden md:block col-span-1 rounded-l-lg overflow-hidden">
          <img src={fig2} alt="Login illustration" className="w-full h-full" />
        </div>

       
        <div className="bg-white flex flex-col items-center justify-center p-6">
          <Formik
            initialValues={{
              studentId: "",
              studentPassword: "",
              rememberme:false,
            }}
            validationSchema={Yup.object({
              studentId: Yup.string()
                .max(16, "Invalid StudentID")
                .required("StudentId is Required"),
              studentPassword: Yup.string()
                .max(15, "Password too long")
                .required("Password is Required"),
            rememberme:Yup.boolean()

            })}
            onSubmit={onSubmit}
          >
            <div className="w-full md:w-72 justify-center items-center  flex flex-col">
                <div className="mt-10 sm:mx-auto  sm:w-full ">
                    <Form className="space-y-4  ">
                        <h1 className="text-center text-gray-800 text-2xl font-bold">
                        Sign In
                        </h1>
                        <FormikControl
                        control="input"
                        name="studentId"
                        
                        type="text"
                        placeholder="Enter User ID"
                        classNam="bg-inputfield text-black rounded-lg w-[275px]"
                        />                   
                        <FormikControl
                        control="input"
                        name="studentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        classNam="bg-inputfield text-black rounded-lg relative px-2"
                        rightIcon={<button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)} 
                            className={`absolute inset-y-0 right-2 flex items-center text-gray-500`}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />} 
                        </button>}
                        />
                        
                        <FormikControl 
                        control="checkbox" 
                        type="checkbox"
                        name="rememberme"
                        label=" Remember me"
                        />
                        

                        <button
                        type="submit"
                        className="bg-blue-300 w-full py-2 text-black font- text-center rounded-lg hover:bg-blue-400 hover:text-white"
                        >
                        Login
                        </button>

                        <div className="text-center">
                        <button type="button"
                        className="text-black hover:underline">
                            Forgot password?
                        </button>
                        </div>
                    </Form>
                </div>
            </div>
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default LoginPage;
