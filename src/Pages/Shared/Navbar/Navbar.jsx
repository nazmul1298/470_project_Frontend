import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import logo from '../../../../public/photos/MusicSchool_Logo.png'
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useCart from '../../../Hooks/useCart';
import UseInstructorCheck from '../../../Hooks/UseInstructorCheck';
import useAdmin from '../../../Hooks/UseAdmin';


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isInstructor] = UseInstructorCheck();
    const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    const handleTheme = () => {
        const htmlElement = document.querySelector('html');
        if (htmlElement.getAttribute('data-theme') === 'light') {
            htmlElement.setAttribute('data-theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
        }
    }
    const navOptions = <>
        <li className=" no-underline hover:underline hover:text-amber-400"><NavLink to='/'> Home </NavLink></li>
        <li className="no-underline hover:underline  hover:text-amber-400"><NavLink to='instructor'> Instructors</NavLink></li>
        <li className="no-underline hover:underline"><NavLink to='class'>Classes</NavLink></li>
        <li className="no-underline hover:underline"><NavLink to='dashboard'>Dashboard</NavLink></li>
        {(!isAdmin && !isInstructor && user) && (
            <li>
                <NavLink to="/dashboard/selectedclass">
                    <button className="btn">
                        <FaShoppingCart></FaShoppingCart>
                        <div className="badge badge-secondary">+{cart?.length || 0}</div>
                    </button>
                </NavLink>
            </li>
        )}

        {/* <li><NavLink to='/signup'>Sign Up</NavLink></li> */}
        {
            user ? <>
                <span>
                    <div className="avatar">
                        <div className="w-10 mr-10 ml-5 mt-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL} />
                        </div>
                    </div>
                </span>
                <button onClick={handleLogOut} className="btn btn-outline btn-primary">LOG OUT</button></> : <><li><NavLink to='/login'>Log IN</NavLink></li></>
        }
        <li>
            <button className=' btn btn-secondary btn-sm text-white ml-3' onClick={() => handleTheme()}>Dark</button>
        </li>
    </>

    return (
        <div className="navbar sticky top-0 z-10  mx-auto px-4 lg:px-0 w-full bg-[#121640] text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className=" lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <img className=" w-32 ml-32" src={logo} alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-xl">
                    {navOptions}

                </ul>
            </div>

        </div>
    );
};

export default Navbar;