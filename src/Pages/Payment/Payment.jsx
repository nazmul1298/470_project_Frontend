import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../Hooks/useCart";
import { useLoaderData, useParams } from "react-router-dom";
import useClass from "../../Hooks/useClass";
import CheckoutForm from "./CheckoutForm";
import CreditCard from "../CreditCard/CreditCard";
import img from '../../../public/photos/Screenshot_420.png'


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {

    const [cart] = useCart();
    const params = useParams();
    const [classList] = useClass();
    const { id } = params;

    // console.log(id);
    // const userdata = useLoaderData();
    // const { _id,name, sname, email, categoty, price, rating, quantity, detail, photo } = userdata;
    // console.log(userdata._id);


    const item = cart.find(item => (item._id)==id);
    const itemPrice = item ? item.price : 0;
    const enrollCount= item ? item.enrollCount : 0;
    const availableSeats = item ? item.availableSeats: 0;
    const price = parseInt(itemPrice.toFixed(2))


    const filteredClassList = classList.filter(item => cart.some(cartItem => cartItem.classId === item._id));
    return (
        <div>
            <img className=" w-96 ml-96 mt-20 relative mb-10" src={img} alt="" />
            <h2 className="text-3xl absolute ml-96 -mt-28 text-cyan-600 font-serif font-bold"> Payment Money:<span className=" badge badge-secondary text-3xl text-white">{price}</span> $</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm cart={cart} price={price} enrollCount={enrollCount} availableSeats={availableSeats}  classid={filteredClassList}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;