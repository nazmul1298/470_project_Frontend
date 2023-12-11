import { useState } from "react";
import useClass from "../../../../Hooks/useClass";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ManageClass = () => {

    const [classList] = useClass();
    const { register, handleSubmit } = useForm();
    const [status, setStatus] = useState('pending');
    // console.log(status);
    const [modalOpen, setModalOpen] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);


    const handleApprove = (itemId) => {
        setStatus('approve')
        fetch(`https://summer-camp-server-gray-nine.vercel.app/class/approve/${itemId}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setIsUpdated(true);
                    setStatus('approve');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: ``,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };

    const handleDeny = (item_Id) => {
        setStatus('deny')
        fetch(`https://summer-camp-server-gray-nine.vercel.app/class/deny/${item_Id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setIsUpdated(true);
                    setStatus('deny');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: ``,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.reload();
                    });
                }
            })
    };

    const [feedback, setFeedback] = useState('');
    const [itemId, setItemId] = useState('');
    const storefeedback = { feedback };

    const handleSendFeedback = (itemId) => {
        setModalOpen(true);
        setItemId(itemId); // Set the item ID in state
    };

    const onSubmit = (data) => {
        const { feedback } = data;
        console.log('itemId', itemId);
        console.log('feedback', feedback);
        setFeedback(feedback);

        // Use itemId in the fetch request
        fetch(`https://summer-camp-server-gray-nine.vercel.app/class/feedback/${itemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feedback })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setIsUpdated(true);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: '',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };



    return (
        <div className="overflow-x-auto">
            <div className=" divider w-52 " style={{ marginLeft: '700px' }}></div>
            <h2 className=" text-center text-3xl font-bold text-cyan-700">Manage Class</h2>
            <div className=" divider w-52" style={{ marginLeft: '700px' }}></div>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            index
                        </th>
                        <th>Class Image</th>
                        <th>Class Name</th>
                        <th>Instructor Name</th>
                        <th>Instructor Email</th>
                        <th>Available Seats</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classList.map((item, index) => <tr key={item._id}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item?.image} />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{item?.className}</td>
                            <td>{item?.instructorName}</td>
                            <td>{item?.instructorEmail}</td>
                            <td>{item?.availableSeats}</td>
                            <td>{item?.price}</td>
                            <td>{item?.status}</td>
                            <td>
                                <div className="flex flex-col space-y-2">
                                    {item.status === 'pending' && (
                                        <>
                                            <button
                                                className="btn btn-primary btn-xs"
                                                onClick={() => handleApprove(item._id)}
                                                disabled={status !== 'pending'}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="btn btn-primary btn-xs"
                                                onClick={() => handleDeny(item._id)}
                                                disabled={status !== 'pending'}
                                            >
                                                Deny
                                            </button>
                                        </>
                                    )}
                                    {item.status === 'approve' && (
                                        <>
                                            <button className="btn btn-primary btn-xs" disabled>
                                                Deny
                                            </button>
                                            <button
                                                className="btn btn-tertiary btn-xs"
                                                onClick={() => handleSendFeedback(item._id)}
                                                disabled={status === 'pending' || status === 'approve'}
                                            >
                                                Send Feedback
                                            </button>
                                        </>
                                    )}
                                    {item.status === 'deny' && (
                                        <button
                                            className="btn btn-primary btn-xs"
                                            onClick={() => handleSendFeedback(item._id)}
                                        >
                                            FeedBack
                                        </button>
                                    )}

                                </div>

                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="w-96 p-4 rounded-md border bg-orange-400">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl text-center font-semibold">Send Feedback</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setModalOpen(false)}
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <textarea
                                className="w-full border border-gray-300 rounded-md p-2 mb-4"
                                rows={4}
                                placeholder="Enter feedback..."
                                {...register('feedback')}
                            />

                            <div className="flex justify-center space-x-4">
                                <input
                                    type="submit"
                                    className="btn btn-primary"
                                    value="Send"
                                />
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </div>
    );
};


export default ManageClass;