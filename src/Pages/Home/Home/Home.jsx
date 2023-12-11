
import Banner from "../Banner/Banner";
import ExtraSection from "../ExtraSection/ExtraSection";
import PopularClass from "../PopularClass/PopularClass";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import Timer from "../Timer/Timer";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Timer></Timer>
            <PopularClass></PopularClass>
            <ExtraSection></ExtraSection>
            <PopularInstructor></PopularInstructor>
        </div>
    );
};

export default Home;