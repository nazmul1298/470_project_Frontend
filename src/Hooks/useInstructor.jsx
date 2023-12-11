import { useEffect, useState } from "react";


const useInstructor = () => {
    const [instructor, setInstructor]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        fetch('https://summer-camp-server-gray-nine.vercel.app/instructor')
            .then(res=>res.json())
            .then(data=>{
                setInstructor(data);
                setLoading(false);
            })
    },[])
    return [instructor,loading]
};

export default useInstructor;