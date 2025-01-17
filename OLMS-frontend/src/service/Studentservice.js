
import axios from 'axios'
import React from 'react'

const STUDENT_BASE_API_URL =  "http://localhost:8080/"

 //funtion to save Student data
export const saveStudent = (student) => {
    return( 
        axios.post(STUDENT_BASE_API_URL,student)
            .then(respone => {
                return respone.data
            })
            .catch(error => {
                console.error("errror",error)
            })
   )    
}

export const getStudent = () => {
    
}
