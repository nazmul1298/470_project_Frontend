import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import logo from '../../../public/photos/Screenshot_418.png';

const SocialLogin = () => {
    const {googleSignIN}=useContext(AuthContext);
    const navigate=useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    const handleGooglesignIN=()=>{
        googleSignIN()
        .then(res=>{
            const loggeduser= res.user;
            console.log(loggeduser);
            const saveUser={name:loggeduser.displayName,email:loggeduser.email}
            fetch('https://summer-camp-server-gray-nine.vercel.app/users',{
                            method: 'POST',
                            headers:{
                                'content-type':'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(()=> {
                                    navigate(from,{replace:true});
                            })

        })
    }
    return (
        <div>
            <div className="divider w-60 ml-16"></div>
            <button onClick={handleGooglesignIN} className="ml-20 mb-5">
                <img src={logo} alt="" />
            </button>
        </div>
    );
};

export default SocialLogin;