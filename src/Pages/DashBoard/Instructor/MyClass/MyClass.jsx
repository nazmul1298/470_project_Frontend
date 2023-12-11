import { useEffect, useState } from "react";
import useClass from "../../../../Hooks/useClass";

import UseInstructorCheck from "../../../../Hooks/UseInstructorCheck";
import UseAuth from "../../../../Hooks/UseAuth";
import { Link } from "react-router-dom";


const MyClass = () => {
    const [classList] = useClass();
    const [history, setHistory] = useState([]);

    const [matchedClass, setMatchedClass] = useState([]);
    // console.log(matchedClass)
    const ids = history.map(item => item.classItems);
    const {user}=UseAuth();
    

    useEffect(() => {
        fetch('https://summer-camp-server-gray-nine.vercel.app/payments')
            .then(res => res.json())
            .then(data => setHistory(data))
    }, [])

    useEffect(() => {
        if (user && user.email) {
          const matched = classList.filter(item => item?.instructorEmail === user.email);
          setMatchedClass(matched);
        }
      }, [classList, user]);


    return (
        <div className="overflow-x-auto">
            <h2 className=' font-bold text-5xl text-center text-cyan-600 mb-20'>My Class</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Class Image</th>
                        <th>Class Name</th>
                        <th>Available Seats</th>
                        <th>Status</th>
                        <th>Total Enrolled Students</th>
                        <th>Price</th>
                        <th>Feedback</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {matchedClass.map(item => {
                        const idCount = ids.filter(id => id == item._id.toString()).length;

                        return (
                            <tr key={item._id}>
                                <div className="avatar">
                                    <div className="w-24 rounded-xl">
                                        <td><img src={item?.image} /></td>
                                    </div>
                                </div>
                                <td>{item?.className}</td>
                                <td>{item?.availableSeats}</td>
                                <td className="badge badge-secondary -mt-2">{item?.status}</td>
                                <td>
                                    
                                    <span className="badge badge-accent ml-2">{idCount}</span>
                                </td>
                                <td>{item?.price}</td>
                                <div className="avatar indicator mt-8">
                                    {item?.feedback && (
                                        <span className="indicator-item badge badge-secondary">{item.feedback}</span>
                                    )}
                                    <div className="w-20 h-20 rounded-lg">
                                        <td>Feedback</td>
                                    </div>
                                </div>
                                <td>
                                    <Link to={`/dashboard/update/${item._id}`}><button  className="btn btn-error btn-sm">Update</button></Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>


            </table>
        </div>

    );
};

export default MyClass;