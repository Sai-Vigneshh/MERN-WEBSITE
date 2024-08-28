import { useState ,navigate} from "react";
import { useNavigate } from "react-router-dom";
import imgsrc from "../images/reg.jpeg"
import { useAuth } from "../store/auth.jsx";
export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const { storeTokenInLS} = useAuth();
  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("fhdj",user);
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("response data : ", response);
      const responseData =await response.json();

     
      console.log("sfhsg",responseData);
      if (response.ok) {
       
        //storeTokenInLS(responseData.token)
        setUser({ username: "", email: "",password: "" });
        navigate("/login")
     
      } else {
        alert(responseData.extraDetails?responseData.extraDetails:responseData.message)
      }
    } catch (error) {
      console.error("Error", error);
    }
  };



return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src={imgsrc}
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"  
                      required="@"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};