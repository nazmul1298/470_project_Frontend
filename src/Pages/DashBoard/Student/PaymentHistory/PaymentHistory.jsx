import { useEffect, useState } from "react";


const PaymentHistory = () => {
    const [history, setHistory] = useState([]);

    // console.log(history);
    useEffect(() => {
        fetch('https://summer-camp-server-gray-nine.vercel.app/payments')
            .then(res => res.json())
            .then(data => setHistory(data))
    }, [])
    return (
        <div>
            <div className=" divider w-52 " style={{ marginLeft: '700px' }}></div>
            <h2 className=" text-center text-3xl font-bold text-cyan-700">Payment History</h2>
            <div className=" divider w-52" style={{ marginLeft: '700px' }}></div>
            <div className="overflow-x-auto mt-20 ml-20 mr-20">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className=" bg-red-600">
                        <tr className=" text-white text-xl">
                            <th>index</th>
                            <th>Course Name</th>
                            <th>INstructor</th>
                            <th>Price</th>
                            <th>transactionId</th>
                            <th>date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.sort((a, b) => new Date(b.date) - new Date(a.date))
                                .map((item, index) => <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.itemNames}</td>
                                    <td>{item.itemInstructor}</td>
                                    <td>{item.price}</td>
                                    <td>{item.transactionId}</td>
                                    <td>{item.date}</td>

                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;