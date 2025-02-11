import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter,Route, Routes   } from 'react-router-dom'
import Home from './components/sample/Home'
import StudentRegisterForm from './components/sample/StudentRegisterForm'
import TeacherRegisterForm from './components/sample/TeacherRegisterForm'
import StudentLoginPage from './components/LoginPage'
import HodLoginpage from './components/sample/HodLoginpage'
import Footer from './components/Footer'
import Hom from './components/Hom'
import Hodpage from './components/Hodpage'
import AddTeacher from './components/AddTeacher'
import Teacherpage from './components/Teacherpage'
import AddStudent from './components/AddStudent'
import StudentPage from './components/StudentPage'
import StudentApplicationStatus from './components/StudentApplicationStatus'
import TeacherLeavePanel from './components/TeacherLeavePanel'
import { RecoilRoot } from 'recoil'
import PrivateRouter from './components/PrivateRouter'
import Unauthorized from './components/Unauthorized'
import LeaveComponent from './components/LeaveComponent'
import StudentDashboard from './components/StudentDashboard'
import GraphToggle from './components/GraphToggle'
import ApplicationsTable from './components/ApplicationsTable'
import DoughnutChart from './components/DoughnutChart'
import StudentDashboardCards from './components/StudentDashboardCards'
import TeacherDashboardCards from './components/TeacherDashboardCards'
import HodDashboardcards from './components/HodDashboardcards'

function App() {
  

  return (
    <>
    <RecoilRoot>
      <BrowserRouter>
        <Navbar/>
          <Routes>
            {/* Define your routes here */}
            <Route path="/" element={<Hom/>} />
            <Route path='/leave' element={<HodDashboardcards/>}></Route>
            <Route path="/teacherDashboard" 
              element={
                <PrivateRouter role="TEACHER" >
                  <Teacherpage/>
                </PrivateRouter>
              } 
            />
            <Route path="/teacherDashboard/addStudent" 
              element={
                <PrivateRouter role="TEACHER" >
                  <AddStudent/>
                </PrivateRouter>
              } 
            />
            <Route path="/teacherDashboard/leavePanel" 
              element={
                <PrivateRouter role="TEACHER" >
                  <TeacherLeavePanel/>
                </PrivateRouter>
              } 
            />
            <Route path="/teacherDashboard/viewDashboard" 
              element={
                <PrivateRouter role="TEACHER" >
                  <TeacherDashboardCards/>
                </PrivateRouter>
              } 
            />
            <Route path="/studentDashboard"
              element={
                <PrivateRouter role="STUDENT">
                  <StudentPage/>
                </PrivateRouter>
              } 
              />
              <Route path="/studentDashboard/applyLeave"
                element={
                  <PrivateRouter role="STUDENT">
                    <LeaveComponent/>
                  </PrivateRouter>
                } 
              />
              <Route path="/studentDashboard/applications"
                element={
                  <PrivateRouter role="STUDENT">
                    <StudentApplicationStatus/>
                  </PrivateRouter>
                } 
              />
              <Route path="/studentDashboard/details"
                element={
                  <PrivateRouter role="STUDENT">
                    <GraphToggle/>
                  </PrivateRouter>
                } 
              />
            <Route path='/hodDashboard' 
              element={
                <PrivateRouter role="HOD">
                  <Hodpage/>
                </PrivateRouter>
              }
            />
            <Route
              path="/hodDashboard/addStudent"
              element={
                <PrivateRouter role="HOD">
                  <AddStudent />
                </PrivateRouter>
              }
            />
            <Route
              path="/hodDashboard/addTeacher"
              element={
                <PrivateRouter role="HOD">
                  <AddTeacher />
                </PrivateRouter>
              }
            />
            <Route
              path="/hodDashboard/applications"
              element={
                <PrivateRouter role="HOD">
                  <TeacherLeavePanel />
                </PrivateRouter>
              }
            />
            <Route
              path="/hodDashboard/viewDashboard"
              element={
                <PrivateRouter role="HOD">
                  <HodDashboardcards />
                </PrivateRouter>
              }
            />

            <Route path='/unauthorized' element={<Unauthorized/>}/>

                
          </Routes>
        {/* <Footer/> */}
    

      </BrowserRouter>
    </RecoilRoot>
    
    </>
  )
}

export default App
