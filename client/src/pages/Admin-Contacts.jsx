import { useEffect,useState } from "react"
import { useAuth } from "../store/auth"
export const AdminContacts=()=>{
    const [contacts,setContacts]=useState([])
    const {authorizationToken} =useAuth()
    const getAllcontactsData=async() =>{
   try {
    
      
       const response=await fetch("http://localhost:3000/api/admin/contacts",{
        method:"GET",
        headers:
        {
            authorization:authorizationToken
        }
       });
       const data=await response.json();
       console.log(data)
       setContacts(data)
   } catch (error) {
     console.log(error)
   }
    }
    const deleteContact=async(id) =>{
        try{
    
            const reponse=await fetch(`http://localhost:3000/api/admin/contact/delete/${id}`,{
                method:"DELETE",
                headers:{
                    authorization:authorizationToken
                }
            });
            const data=await reponse.json();
             
            setContacts(contacts.filter(u => u._id !==id));
            if (Response.ok){
                getAllcontactsData()
            }
            
        }catch(error){
            console.log(error)
        }
       }
   useEffect(()=>{
    getAllcontactsData()
   },[]);
   return(
    <>
        <h1>All Contact</h1>
        <div className="contacts">
        {contacts.map((curUser, index) => {

                return(
                   <div className="singleContact" key={index}>
                   <p>{curUser.username}</p>
                   <p>{curUser.email}</p>
                   <p>{curUser.message}</p>
                   <button className="edit-btn" onClick={() => deleteContact(curUser._id)}>Delete</button>
                   </div>
                )

            })}
        </div>
    </>
   )
}