
import { useForm } from 'react-hook-form';
import UseAuth from '../../../../Hooks/UseAuth';
import UseAxios from '../../../../Hooks/UseAxios';
import Swal from 'sweetalert2';

const img_token = import.meta.env.VITE_IMAGE_TOKEN;
const AddClass = () => {

    const { user } = UseAuth();
    const [axiosSecure] = UseAxios();
    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_token}`
    const onSubmit = (data) => {
        console.log(data)
        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                // console.log(imgResponse);
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { className,availableSeats, price, instructorEmail, instructorName } = data;
                    const newItem = { className, price: parseFloat(price), availableSeats,enrollCount: 0,instructorEmail, instructorName, image: imgURL, status: 'pending' };
                    console.log(newItem);
                    axiosSecure.post('/class', newItem)
                        .then(data => {
                            console.log(data);
                            console.log('after posting new class', data.data);
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Added Class',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })
                            }
                        })
                }
            })
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
                            Class name
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
                            {...register('image', { required: true })}
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
                            Price
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
                            Available seats
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
}

export default AddClass;