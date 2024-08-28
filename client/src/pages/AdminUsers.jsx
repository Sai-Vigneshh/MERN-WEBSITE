import { useEffect ,useState} from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
export const AdminUsers=()=>{
    const [users,setUser]=useState([])
    const {authorizationToken}=useAuth()
   const getAllUsersData=async()=>{
    try{

        const reponse=await fetch("http://localhost:3000/api/admin/users",{
            method:"GET",
            headers:{
                authorization:authorizationToken
            }
        });
        const data=await reponse.json();
        setUser(data)
    }catch(error){
        console.log(error)
    }
   };
   const deleteUser=async(id) =>{
    try{

        const reponse=await fetch(`http://localhost:3000/api/admin/users/delete/${id}`,{
            method:"DELETE",
            headers:{
                authorization:authorizationToken
            }
        });
        const data=await reponse.json();
         
        setUser(users.filter(u => u._id !==id));
        if (Response.ok){
            getAllUsersData()
        }
        
    }catch(error){
        console.log(error)
    }
   }
   useEffect(()=>{
    getAllUsersData()
   },[]);
   return(
    <>
        <section className="admin-users-section">

            <div className="container">

                <h1>Admin Users Data </h1>

            </div>

            <div className="container admin-users">

                <table>

                    <thead>
                        <tr>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Update</th>
                           <th>Delete</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((curUser, index) => {

                        return(
                            <tr key={index}>
                                <td>{curUser.username}</td>
                                <td>{curUser.email}</td>
                                <td>
                                <Link to={`/admin/users/${curUser._id}/edit`} className="edit-link">Edit</Link>
                                </td>
                                <td>
                                <button className="edit-btn" onClick={() => deleteUser(curUser._id)}>Delete</button>
                                </td>
                            </tr>
                        )

                    })}
                    </tbody>

                </table>

               

            </div>

        </section>
    </>
   )
}