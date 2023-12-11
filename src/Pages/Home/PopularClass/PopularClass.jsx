import { Link } from 'react-router-dom';
import useClass from '../../../Hooks/useClass';
import './PopularClass.css';
import { useState } from 'react';

const PopularClass = () => {
    
    const [classList] = useClass();
    const sortedClassList = classList.sort((a, b) => b.enrollCount - a.enrollCount);

    const limitedClassList = sortedClassList.slice(0, 6);



    
    return (
        <div className=' container mx-auto  mt-40 mb-40'>
            <div className='pb-20 '>
                <h2 className='Engage flex justify-center text-3xl text-amber-500'>Enroll Our</h2>
                <h3 className=' flex justify-center text-5xl font-bold'>Popular Classes</h3>
            </div>
            <div className=' grid grid-cols-3 mt-20'>
                {
                    limitedClassList.map(item => item.status === "approve" ? (<div key={item._id} className="card w-96 bg-base-100 shadow-xl mb-10">
                        <figure><img className=' h-96' src={item?.image} alt="Class" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{item?.className}</h2>
                            <h2 className="card-title">{item?.instructorName}</h2>
                            <p>For details Go to <Link to='class'><span className=' link link-primary'>Class</span></Link></p>
                        </div>
                    </div>) : null)
                }
            </div>
            

        </div>
    );
};

export default PopularClass;