import { useState, useEffect } from 'react';
import './Time.css';
const Timer = () => {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date('2023-06-30T00:00:00');
        const updateCountdown = () => {
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

        const countdownInterval = setInterval(updateCountdown, 1000);

        return () => {
            clearInterval(countdownInterval);
        };
    }, []);

    return (
        <div>
            <style>
                {`
          .countdown {
            justify-content: space-around;
          }
        `}
            </style>
            <div className='bg-[#8E44AD] flex justify-around align-middle pb-20 pt-20'>
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
                <div className=' text-2xl font-bold font-bagel-fat-one'>
                    <h2 className='time text-3xl text-amber-500'>Before times up</h2>
                    <h2 className='enroll text-5xl text-white'>Enroll Our Classes <br /> For This <span className=' text-yellow-500  time'>SUMMER</span></h2>
                </div>
            </div>
        </div>
    );
};

export default Timer;
