import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import AuthProvider from "./components/AuthProvider";
import Navbar from "./components/Navbar";
import PrivateRouter from "./components/PrivateRouter";
import Unauthorized from "./components/Unauthorized";
import Hom from "./components/Hom";
import HodDashboardcards from "./components/HodDashboardcards";
import Teacherpage from "./components/Teacherpage";
import AddStudent from "./components/AddStudent";
import TeacherLeavePanel from "./components/TeacherLeavePanel";
import TeacherDashboardCards from "./components/TeacherDashboardCards";
import StudentPage from "./components/StudentPage";
import LeaveComponent from "./components/LeaveComponent";
import StudentApplicationStatus from "./components/StudentApplicationStatus";
import GraphToggle from "./components/GraphToggle";
import Hodpage from "./components/Hodpage";
import AddTeacher from "./components/AddTeacher";
import FeaturesComonent from "./components/FeaturesComonent";
import Footer from "./components/Footer";
import Layout from "./components/Layout";

function App() {
  return (
    <RecoilRoot>
      <AuthProvider>
        <BrowserRouter>
          
          <Routes>
            <Route path="/" element={<Layout><Hom /></Layout>} />
            <Route path="/leave" element={<Layout><FeaturesComonent /></Layout>} />

            <Route path="/teacherDashboard" 
            element={<Layout>
              <PrivateRouter role="TEACHER">
               <Teacherpage />
              </PrivateRouter></Layout>} 
            />
            <Route path="/teacherDashboard/addStudent" 
            element={<Layout>
              <PrivateRouter role="TEACHER">
                <AddStudent left="#efa2ff" center="#a3caff" right="#a9f3ff"  />
              </PrivateRouter></Layout>}
            />
            <Route path="/teacherDashboard/leavePanel" 
            element={<Layout>
              <PrivateRouter role="TEACHER">
                <TeacherLeavePanel left="#efa2ff" center="#a3caff" right="#a9f3ff" />
              </PrivateRouter></Layout>}
            />
            <Route path="/teacherDashboard/viewDashboard" 
            element={<Layout>
              <PrivateRouter role="TEACHER">
                <TeacherDashboardCards />
              </PrivateRouter>
              </Layout>}
            />

            <Route path="/studentDashboard" 
            element={<Layout>
              <PrivateRouter role="STUDENT">
                <StudentPage />
              </PrivateRouter>
              </Layout>}
            />
            <Route path="/studentDashboard/applyLeave" 
            element={<Layout>
              <PrivateRouter role="STUDENT">
                <LeaveComponent />
              </PrivateRouter>
              </Layout>}
            />
            <Route path="/studentDashboard/applications" 
            element={<Layout>
              <PrivateRouter role="STUDENT">
                <StudentApplicationStatus />
              </PrivateRouter>
              </Layout>}
            />
            <Route path="/studentDashboard/details" 
            element={<Layout>
              <PrivateRouter role="STUDENT">
                <GraphToggle />
              </PrivateRouter>
              </Layout>}
            />

            <Route path="/hodDashboard" 
            element={<Layout>
              <PrivateRouter role="HOD">
                <Hodpage />
            </PrivateRouter>
            </Layout>}
            />

            <Route path="/hodDashboard/addStudentDetails"
             element={<Layout>
              <PrivateRouter role="HOD">
                <AddStudent left="#a7ffbb" center="#b8fde0" right="#a9f2ff" />
              </PrivateRouter>
              </Layout>}
             />

            <Route path="/hodDashboard/addTeacher" 
            element={<Layout>
              <PrivateRouter role="HOD">
                <AddTeacher />
            </PrivateRouter>
            </Layout>}
            />

            <Route path="/hodDashboard/applications" 
            element={<Layout>
              <PrivateRouter role="HOD">
                <TeacherLeavePanel left="#a7ffbb" center="#b8fde0" right="#a9f2ff" />
              </PrivateRouter>
              </Layout>}
            />

            <Route path="/hodDashboard/viewDashboard" 
            element={<Layout>
              <PrivateRouter role="HOD">
                <HodDashboardcards />
              </PrivateRouter>
              </Layout>}
              
           />

            <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />
            

            
          </Routes>
          
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;
