import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { roleState, userState } from "./atom";

const AuthProvider = ({ children }) => {
  
  const handleBrowserClose = () => {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
  
    if (!sessionStorage.getItem("sessionActive") && !rememberMe) {
      localStorage.removeItem("recoil-persist"); 
    }
  };

  useEffect(() => {
    sessionStorage.setItem("sessionActive", "true");
  
    window.addEventListener("beforeunload", handleBrowserClose);
  
    return () => {
      window.removeEventListener("beforeunload", handleBrowserClose);
    };
  }, []);
  

  return <>{children}</>;
};

export default AuthProvider;
