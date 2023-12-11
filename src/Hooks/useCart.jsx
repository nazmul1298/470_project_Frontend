import { useQuery } from "react-query";
import UseAuth from "./UseAuth";
import UseAxios from "./UseAxios";

const useCart = () => {
    const { user, loading } = UseAuth();
    // const token = localStorage.getItem('access-token');
    const [axiosSecure] = UseAxios();
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            // console.log('res from axios', res)
            return res.data;
        },
    })

    return [cart, refetch]

}

export default useCart;