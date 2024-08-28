import { NavLink,Outlet } from "react-router-dom"
import { HiUsers } from "react-icons/hi2";
import { TiContacts } from "react-icons/ti";
import { AiOutlineProduct } from "react-icons/ai";
export  const AdminLayout=()=>{
    return(
        <>
        <header>
            <div className="container">
            <nav>
                <ul>
                <li>
                    <NavLink to="/admin/users"><HiUsers />users</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/contacts"><TiContacts />contacts</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/services"><AiOutlineProduct />services</NavLink>
                </li>
                </ul>
            </nav>
            </div>
            
        </header>
        <Outlet />
        </>

    )}
