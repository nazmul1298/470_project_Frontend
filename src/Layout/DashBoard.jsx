import { FaWallet, FaCalendarAlt, FaHome, FaUtensilSpoon } from 'react-icons/fa';
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from '../Hooks/UseAdmin';
import UseInstructorCheck from '../Hooks/UseInstructorCheck';
import UseAuth from '../Hooks/UseAuth';
// import useAdmin from '../Hook/useAdmin';
// import useCart from '../Hooks/useCart';

const DashBoard = () => {
    // const [cart] = useCart();

    // const isAdmin = true;
    // const isinstructor = false;
    const { user } = UseAuth();
    const [isAdmin] = UseAdmin();
    const [isInstructor] = UseInstructorCheck();
    // console.log("isAdmin",isAdmin); 
    // console.log('isInstructor',isInstructor); 

    return (
        <>
            {/* <Helmet>
                <title>
                    Bistro Boss | My Cart
                </title>
            </Helmet> */}
            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side bg-violet-700">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <div className="avatar indicator">
                        {
                            isAdmin ? <span className="indicator-item badge badge-secondary mt-28 h-10 font-bold">Admin</span>: isInstructor? <span className="indicator-item badge badge-secondary mt-28 h-10 font-bold">Instructor</span> : <span className="indicator-item badge badge-secondary mt-28 h-10 font-bold">Student</span>
                        }
                        <div className="w-32 ml-24 mt-24 rounded-full ring ring-warning ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL} />
                        </div>
                    </div>
                    <div>
                        <h3 className=' text-white text-center uppercase font-serif font-bold text-2xl'>{user?.displayName}</h3>
                    </div>
                    <ul className="menu p-4 w-80 h-full  text-white">
                        {
                            isAdmin ? <>
                                <li><NavLink to='/dashboard/manageclass'><FaCalendarAlt></FaCalendarAlt>Manage Classes</NavLink></li>
                                <li><NavLink to='/dashboard/manageuser'><FaWallet></FaWallet>Manage Users</NavLink></li>
                            </> :
                                isInstructor ? <>
                                    <li><NavLink to='/dashboard/addclass'><FaUtensilSpoon></FaUtensilSpoon> Add a Class</NavLink></li>
                                    <li><NavLink to='/dashboard/myclass'><FaWallet></FaWallet>My Classes</NavLink></li>
                                </> : <>
                                    <li><NavLink to='/dashboard/selectedclass'><FaUtensilSpoon></FaUtensilSpoon>My Selected Classes</NavLink></li>
                                    <li><NavLink to='/dashboard/enrolledclass'><FaWallet></FaWallet>My Enrolled Classes</NavLink></li>
                                    <li><NavLink to='/dashboard/payhistory'><FaWallet></FaWallet>Payment History</NavLink></li>
                                </>
                        }


                        <div className="divider"></div>
                        <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
                        <li><NavLink to='/instructor'><FaHome></FaHome>Instructor</NavLink></li>
                        <li><NavLink to='/class'><FaHome></FaHome>Class</NavLink></li>
                    </ul>

                </div>
            </div>
        </>
    );
};

export default DashBoard;