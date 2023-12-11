import { useContext } from "react";
import useClass from "../../Hooks/useClass";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../../../public/photos/Class Header 2.svg';
import './Class.css';

import useAdmin from "../../Hooks/UseAdmin";
import UseInstructorCheck from "../../Hooks/UseInstructorCheck";
import { useState } from "react";

const Class = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = UseInstructorCheck();
  const [classList] = useClass();

  // console.log(classList.length);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [noofElem, setnoOfElem] = useState(6);
  const slice = classList.slice(0, noofElem);
  // const selectedItem = { classId: _id, name, className, image, instructorName, price, email: user.email };
  const handleAddToCart = item => {
    const { _id, name, instructorName, enrollCount, availableSeats, price, className, image } = item;
    console.log(name);
    console.log(item);
    if (user && user.email) {
      const selectedItem = { classId: _id, name, className, image, instructorName, enrollCount, availableSeats, price, email: user.email }
      fetch('https://summer-camp-server-gray-nine.vercel.app/carts', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(selectedItem)
      })
        .then(res => res.json())
        .then(data => {
          if (data.insertedId) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Added to cart',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            <div className="toast">
              <div className="alert alert-info">
                <span>Please Login</span>
              </div>
            </div>
            navigate('/login', { state: { from: location } })
          }
        })
    }
  }
  const loadMore = () => {
    setnoOfElem(noofElem + noofElem);
  }
  return (
    <div>
      <div className=" relative overflow-hidden h-96">
        <img className=" w-full " src={logo} alt="" />
        <div className="absolute bottom-0 top-36 p-4 class-header">
          <p className="text-white text-5xl font-bold">Classes</p>
          <p className=" text-yellow-600 class-sub text-3xl font-bold">Enroll Now</p>
        </div>
      </div>
      <div>

      </div>
      <div className=" grid grid-cols-3 mt-20 pb-20 container mx-auto ">
        {
          slice.map(item =>
            item.status === "approve" ? (
              <div
                key={item._id}
                className={`card card-side bg-base-100 shadow-xl mb-10 mr-10 ${item.availableSeats === 0 ? "bg-red-500" : ""
                  }`}
              >
                <figure>
                  <img src={item.image} alt="Movie" />
                </figure>
                <div className="card-body w-full">
                  <h2 > <span className="ml-32 class-sub text-3xl text-orange-400">Course</span><span className='card-title font-serif mb-2'>{item.className}</span> </h2>
                  <p>Instructor: <span className=" font-bold">{item.instructorName}</span></p>
                  <div className=" flex justify-between">
                    <h2>
                      Price: <span className="badge badge-secondary">{item.price}</span>{" "}
                    </h2>
                    <h2>
                      Seats:{" "}
                      <span className="badge badge-accent">{item.availableSeats}</span>{" "}
                    </h2>
                  </div>
                  <div className="card-actions justify-center">
                    {/* {(!isAdmin && !isInstructor) && ( */}
                    <button onClick={() => handleAddToCart(item)} className="btn btn-primary btn-sm">
                      Enroll
                    </button>
                    {/* )} */}
                  </div>
                </div>
              </div>
            ) : null
          )
        }

      </div>
      <div className="flex justify-center mb-20">
        <button className="btn btn-warning" onClick={(() => loadMore())}>Show More</button>
      </div>
    </div>
  );
};

export default Class;