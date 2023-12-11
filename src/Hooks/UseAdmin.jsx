import { useQuery } from "react-query";
import UseAuth from "./UseAuth";
import UseAxios from "./UseAxios";

const useAdmin = () => {
  const { user, loading } = UseAuth();
  const [axiosSecure] = UseAxios();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
        if(!user){
            return false
        }
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      return res.data.result.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
