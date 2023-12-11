import './SelectedClass.css';
import useCart from "../../../../Hooks/useCart";
import Swal from 'sweetalert2';
import { Link, useParams } from 'react-router-dom';

const SelectedClass = () => {
    const [cart, refetch] = useCart();
    const { id } = useParams();

    const total = cart.reduce((sum, item) => item.price + sum, 0);
    // console.log(total);
    const handleDelete = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://summer-camp-server-gray-nine.vercel.app/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deleteCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <>
            <div>
                <div className=" divider w-60 " style={{ marginLeft: '700px' }}></div>
                <h2 className=" text-center text-3xl font-bold text-cyan-700 ml-16">My selected Class</h2>
                <div className=" divider w-60" style={{ marginLeft: '700px' }}></div>
            </div>
            <div className="CartContainer container mx-auto">
                <div className="Header">
                    <h3 className="Heading text-center">Image</h3>
                    <h3 className="Heading text-center ml-32">Email</h3>
                    <h3 className="Heading text-center ">Instructor</h3>
                    <h3 className="Heading text-center">Course</h3>
                    <h3 className="Heading text-center">Action</h3>

                </div>
                {
                    cart.map(item => <div key={item._id}
                        className="Cart-Items">
                        <div className="image-box">
                            <img src={item.image} style={{ height: "120px" }} />
                        </div>
                        <div className="about mt-44">
                            <h1 className="title">{item.email}</h1>

                        </div>
                        <div className="counter">
                            <div className="count">{item.instructorName}</div>
                        </div>
                        <div className="counter">
                            <div className="count">{item.className}</div>
                        </div>
                        <div className="prices mt-20">
                            <div className="amount">${item.price}</div>
                            <div className=' flex flex-col'>
                                <button onClick={() => handleDelete(item)} className="remove"><u>Remove</u></button>
                                <Link to={`/dashboard/payment/${item._id}`} ><button className="button">Checkout</button></Link>
                            </div>

                        </div>

                    </div>

                    )
                }


                <hr />
                <div className="checkout">
                    <div className="total">
                        <div>
                            <div className="Subtotal">Sub-Total</div>
                            <div className="items">{cart.length}</div>
                        </div>
                        <div className="total-amount">${total}</div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default SelectedClass;