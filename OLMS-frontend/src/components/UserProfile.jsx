import { useRecoilState, useRecoilValue } from "recoil";
import { profileState, userState } from "./atom";
import axiosInstance from "./axiosInstance";
import avatar from "../assets/avatar.png";
const UserProfile = () => {
    const [showProfile, setShowProfile] = useRecoilState(profileState);
    const userId = useRecoilValue(userState);

    const handleLogout = async() => {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await axiosInstance.post('/auth/logout',{
        headers : {
          Authorization : `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.log("logout failed",error);
      }).finally(() => {
        
          // Clear persisted Recoil state
  localStorage.removeItem('recoil-persist');

  // Clear other stored data
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('role');

  // Optionally clear session storage
  sessionStorage.clear();

  // Redirect to login or home page
  window.location.href = '/'; // Redirect to login page
       
        
      })      
    }

    if (!showProfile) return null;

    return (
        <div className="absolute top-0 sm:top-16 right-0 bg-[#17152f] shadow-lg p-4 rounded-lg w-60 z-20">
          <div className="flex items-center justify-center ">
            <img className="size-24 bg-gray-300 p-4 rounded-full" src={avatar} alt="avatar" />

          </div>
            <h2 className="text-lg text-center mt-2 font-bold mb-2">User Profile</h2>
            <p><strong>User: </strong>{userId}</p>
            
            <button 
                onClick={() => handleLogout()}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full"
            >
                Logout
            </button>
        </div>
    );
};

export default UserProfile;
