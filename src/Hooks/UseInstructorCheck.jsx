import { useQuery } from "react-query";
import UseAuth from "./UseAuth";
import UseAxios from "./UseAxios";


const UseInstructorCheck = () => {
    const { user, loading } = UseAuth();
    const [axiosSecure] = UseAxios();
  
    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
      queryKey: ["isInstructor", user?.email],
      enabled: !loading && !!user?.email && !!localStorage.getItem("access-token"),
      queryFn: async () => {
          if(!user){
              return false
          }
        const res = await axiosSecure.get(`/users/Instructor/${user?.email}`);
        // console.log(res.data.result)
        return res.data.result.instructor;
      },
    });
  
    return [isInstructor, isInstructorLoading];
  };

export default UseInstructorCheck;