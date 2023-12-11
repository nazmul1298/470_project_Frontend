import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/UseAdmin";
import UseAuth from "../Hooks/UseAuth";


const AdminRoute = ({children}) => {
    const {user,loading}=UseAuth();
    const [isAdmin,isAdminLoading]=useAdmin();
    const location = useLocation();
    if (loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }
    if (user && isAdmin){
        return children;
    }
    
    return (
        <Navigate to="/" state={{from:location}}  replace></Navigate>
    );
};

export default AdminRoute;