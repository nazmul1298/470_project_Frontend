import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
// import banner1 from '../../../../public/photos/banner1-m.png';
import banner2 from '../../../../public/photos/banner2-m.png';
import banner3 from '../../../../public/photos/banner3-m.png';
import banner4 from '../../../../public/photos/bannerm-4.png';
const AutoplaySlider = withAutoplay(AwesomeSlider);

const Banner = () => {
    return (
        <div>
            <div>
                <style>
                    {`
          .awssld__bullets {
            display: none;
          }
        `}
                </style>
                <AutoplaySlider
                    play={true}
                    cancelOnInteraction={false} // should stop playing on user interaction
                    interval={6000}
                    className="slider"
                    style={{ height: '910px' }}
                >
                    <div className="slider-image">
                        <img className="object-contain h-full w-full" src={banner4} alt="" />
                    </div>
                    <div className="slider-image">
                        <img className="object-contain h-full w-full" src={banner2} alt="" />
                    </div>
                    <div className="slider-image">
                        <img className="object-contain h-full w-full" src={banner3} alt="" />
                    </div>
                </AutoplaySlider>
            </div>
        </div>


    );
};

export default Banner;