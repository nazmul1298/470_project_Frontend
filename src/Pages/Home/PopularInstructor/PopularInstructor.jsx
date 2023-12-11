import useInstructor from '../../../Hooks/useInstructor';
import './PopularInatructor.css';
const PopularInstructor = () => {
    const [instructor] = useInstructor();

    const limitedClassList = instructor.slice(0, 6);
    return (
        <div className=' container mx-auto mt-40 mb-40'>
            <div className='pb-20'>
                <h2 className='Engage flex justify-center text-3xl text-amber-500'>Engage with Our</h2>
                <h3 className=' flex justify-center text-5xl font-bold'>Popular Instructors</h3>
            </div>
            
            <div className=' grid grid-cols-3 mt-20 '>
            {
                limitedClassList.map(item=><div key={item._id} className="card w-96 bg-base-100 shadow-xl mb-20">
                <figure><img className=" w-fit h-60" src={item.image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title"> <span className='badge badge-secondary'>Instructor:</span> <span className=' font-serif'>{item.name}</span></h2>
                    <h2 className="card-title">Contact: {item.email}</h2>
                    {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                </div>
            </div>)
            }
                
            </div>
            <div className="flex justify-center mt-20">
                <button className="btn btn-warning">Show More</button>
            </div>

        </div>
    );
};

export default PopularInstructor;