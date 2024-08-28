import { createContext, useContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState("");
  const [services,setServices]=useState([])
  const authorizationToken=`Bearer ${token}`


  // Function to store the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;
     
  const logoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser(null); // Clear user data on logout
  };


  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // our main goal is to get the user data 👇
        setUser(data.userData);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  };
const getServiceData = async () => {
try {
const response =await fetch("http://localhost:3000/api/data/service", { method: "GET",
});
if (response.ok) {
const services =await response.json();
setServices(services.data);
}
console.log("service", response);
} catch (error) {
console.log(error);
}
};
useEffect(() => {
getServiceData();
userAuthentication();
}, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, logoutUser, user,services,authorizationToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
