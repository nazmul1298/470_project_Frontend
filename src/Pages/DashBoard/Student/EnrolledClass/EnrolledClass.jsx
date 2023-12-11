import { useEffect, useState } from "react";
import UseAuth from "../../../../Hooks/UseAuth";


const EnrolledClass = () => {
    const { user } = UseAuth();
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // console.log(history);

    // const myHistory=history.find(item=>item.email==user.email);
    // console.log(myHistory);

    useEffect(() => {
        fetch('https://summer-camp-server-gray-nine.vercel.app/payments')
            .then(res => res.json())
            .then(data => {
                setHistory(data);
                const filteredData = data.filter((item) => item.email === user.email);
                setFilteredHistory(filteredData);
            })
    }, [user.email]);

    const updateCountdown = () => {
        const targetDate = new Date('2023-06-30T00:00:00');
        const now = new Date();
        const timeDifference = targetDate - now;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        }
    };

    useEffect(() => {
        updateCountdown();

        const countdownInterval = setInterval(updateCountdown, 1000);

        return () => {
            clearInterval(countdownInterval);
        };
    }, []);

    return (
        <div>
            <div className=" divider w-52 " style={{marginLeft:'700px'}}></div>
            <h2 className=" text-center text-3xl font-bold text-cyan-700">My Enrolled Class</h2>
            <div className=" divider w-52" style={{marginLeft:'700px'}}></div>
            <div className="overflow-x-auto mt-20 ml-20 mr-20">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className=" bg-yellow-500">
                            <th>
                                Index
                            </th>
                            <th>Image</th>
                            <th>Course</th>
                            <th>E-mail</th>
                            <th>Instructor</th>
                            <th>Payment</th>
                            <th>Go To Course</th>
                            {/* <th><button className=" btn btn-accent btn-sm"></button></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredHistory.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.itemImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.itemNames}
                                </td>
                                <td>{item.email} </td>
                                <td>{item.itemInstructor} </td>
                                <td>
                                    {item.price} $
                                    <br />
                                    <span className="badge badge-ghost badge-sm bg-success">Paied 🗸</span>
                                </td>
                                <th>
                                    <label htmlFor="my_modal_6" className="btn btn-accent btn-sm">Explore</label>
                                </th>
                            </tr>)
                        }
                        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Keep Paitence!</h3>
                                <p className="py-4">The course will unlock after </p>
                                <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                                    <div className="flex flex-col p-2 bg-warning bg-opacity-80 rounded-box text-neutral-content w-36 font-bagel-fat-one">
                                        <span className="countdown font-mono text-5xl value">
                                            <span className='mr-5' style={{ '--value': countdown.days }}></span>
                                        </span>
                                        <span className='mt-3'>------</span>
                                        days
                                    </div>
                                    <div className="flex flex-col p-2 bg-warning bg-opacity-80 rounded-box text-neutral-content w-36 h-36">
                                        <span className="countdown font-mono text-6xl value">
                                            <span style={{ '--value': countdown.hours }}></span>
                                        </span>
                                        <span>------</span>
                                        hours
                                    </div>
                                    <div className="flex flex-col p-2 bg-warning bg-opacity-80 rounded-box text-neutral-content w-36 h-36">
                                        <span className="countdown font-mono text-6xl value">
                                            <span style={{ '--value': countdown.minutes }}></span>
                                        </span>
                                        <span>------</span>
                                        min
                                    </div>
                                    <div className="flex flex-col p-2 bg-warning bg-opacity-80 rounded-box text-neutral-content w-36 h-36">
                                        <span className="countdown font-mono text-6xl value">
                                            <span style={{ '--value': countdown.seconds }}></span>
                                        </span>
                                        <span>------</span>
                                        sec
                                    </div>
                                </div>
                                <div className="modal-action">
                                    <label htmlFor="my_modal_6" className="btn">Close!</label>
                                </div>
                            </div>
                        </div>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnrolledClass;