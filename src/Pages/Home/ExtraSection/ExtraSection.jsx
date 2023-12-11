import img from '../../../../public/photos/fixedImage1.png';
import img1 from '../../../../public/photos/extrasectionimage2.jpg';
import './ExtraSection.css';
const ExtraSection = () => {
    return (
        <div className='extrasection text-center' style={{ backgroundImage: `url(${img})`, backgroundRepeat: 'no-repeat', backgroundSize: '100% auto', backgroundPosition: 'center top -120px' }}>
            <div className=' pt-60'>
                <h2 className='titl text-3xl text-amber-500'>SUmmer Camp Music Den</h2>
                <h3 className='title1 text-5xl text-white '>Have a Glimps of Our Musical Camp</h3>
                <p className='mt-5 text-slate-400'>At our musical summer camp, kids embark on a melodic journey, <div /> discovering the magic of music and harmonizing their talents.</p>
            </div>
            <div className="flex justify-center mt-10 relative">
                <img className="w-96 rounded-3xl" src={img1} alt="" />
                <button
                    className="btn btn-active btn-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    onClick={() => window.my_modal_4.showModal()}
                >
                    Watch
                </button>
                <dialog id="my_modal_4" className="modal">
                    <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">Intro Video Of Our CAMP</h3>
                        <div className="py-4 ">
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/ifPAX00PRRk"
                                title="YouTube Video"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={() => window.my_modal_4.close()}>
                                Close
                            </button>
                        </div>
                    </form>
                </dialog>
            </div>

        </div>
    );
};

export default ExtraSection;