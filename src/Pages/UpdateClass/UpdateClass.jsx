import { useForm } from "react-hook-form";
import UseAxios from "../../Hooks/UseAxios";
import UseAuth from "../../Hooks/UseAuth";
import { useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import useClass from "../../Hooks/useClass";
import Swal from "sweetalert2";


const img_token = import.meta.env.VITE_IMAGE_TOKEN;
const UpdateClass = () => {
    const { user } = UseAuth();
    const [classList] = useClass();
    const [axiosSecure] = UseAxios();
    // const [selectedItem, setSelectedItem] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const { id } = useParams();

    // console.log(id)

    // const selectedItem = classList.find(item => item._id === id);


    // const {image}=selectedItem ;

    // console.log(image)

    const onSubmit = (data) => {
        const { className, price, availableSeats } = data;
      
        const selectedData = {
          className,
          price,
          availableSeats,
        };
      
        console.log(selectedData);
        fetch(`https://summer-camp-server-gray-nine.vercel.app/class/update/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedData),
        })
          .then((res) => res.json())
          .then((data) => {
            
            if (data.modifiedCount > 0) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Successfully Updated',
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>',
              });
            }
          });
      };
      



    return (
        <div className=" container mx-auto mt-32">
            <h2 className=' font-bold text-5xl text-center text-cyan-600 mb-20'>Add Class</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gradient-to-br from-blue-100 to-white border border-gradient shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="flex mb-4">
                    <div className="w-3/5 pr-4">
                        <label htmlFor="className" className="block text-gray-700 text-sm font-bold mb-2">
                            <span className="input__label">Class Name <span className=' font-extrabold text-red-700'>[Update]*</span></span>

                        </label>
                        <input
                            type="text"
                            id="className"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...register('className', { required: true })}
                        />

                    </div>
                    <div className="w-3/5 pl-4">
                        <label htmlFor="classImage" className="block text-gray-700 text-sm font-bold mb-2">
                            Class Image
                        </label>
                        <input
                            type="file"
                            id="classImage"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            {...register('image')} disabled

                        />
                    </div>
                </div>

                <div className="flex mb-4">
                    <div className="w-3/5 pr-4">
                        <label htmlFor="instructorName" className="block text-gray-700 text-sm font-bold mb-2">
                            Instructor name
                        </label>
                        <input
                            type="text"
                            id="instructorName"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...register('instructorName', { required: true })}
                            readOnly
                            value={user?.displayName}
                        />
                    </div>
                    <div className="w-3/5 pl-4">
                        <label htmlFor="instructorEmail" className="block text-gray-700 text-sm font-bold mb-2">
                            Instructor email
                        </label>
                        <input
                            type="email"
                            id="instructorEmail"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...register('instructorEmail', { required: true })}
                            readOnly
                            value={user?.email}
                        />
                    </div>
                </div>

                <div className="flex mb-4">
                    <div className="w-3/5 pr-4">
                        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                            <span className="input__label">Price <span className=' font-extrabold text-red-700'>[Update]*</span></span>

                        </label>
                        <input
                            type="number"
                            id="price"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder='$'
                            {...register('price', { required: true })}
                        />

                    </div>
                    <div className="w-3/5 pl-4">
                        <label htmlFor="availableSeats" className="block text-gray-700 text-sm font-bold mb-2">
                            <span className="input__label">Available seats <span className=' font-extrabold text-red-700'>[Update]*</span></span>

                        </label>
                        <input
                            type="number"
                            id="availableSeats"
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            {...register('availableSeats', { required: true })}
                        />

                    </div>
                </div>

                <input
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    value="Add"
                />
            </form>
        </div>
    );
};

export default UpdateClass;