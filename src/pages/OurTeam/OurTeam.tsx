import { Swiper, SwiperSlide } from "swiper/react";
import li from "../../assets/liLogo.svg";
import ig from "../../assets/igLogo.svg";
import gh from "../../assets/github-mark-white.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import myData from "./team_data";
const OurTeam: React.FC = () => {
  return (
    <div className=" overflow-hidden ">
      <h1 className=" font-airnt text-4xl text-cyan sm:p-12 lg:pl-28 p-5 pb-20">
        TEAMS
      </h1>
      <div className="flex-col text-center items-center sm:w-3/4 sm:ml-32 px-6 h-3/4 shadow-white shadow-lg bg-blue lg:py-10 py-6 w-4/6 ml-18 ">
        <h2 className="font-airnt text-3xl font-bold sm:mb-16 mb-3 ">
          Our Team
        </h2>
        <Swiper
          spaceBetween={window.innerWidth > 1440 ? 30 : 20}
          slidesPerView={
            window.innerWidth > 1440 ? 3 : window.innerWidth > 900 ? 2 : 1
          }
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="flex justify-center"
        >
          {myData.map((member) => {
            return (
              <SwiperSlide>
                {Profile(member.name, member.position, member.image)}
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="absolute top-24 sm:left-24 left-10 w-16 h-20 bg-black rotate-45"></div>
      </div>
    </div>
  );
};

function Profile(name?: string, position?: string, image?: string) {
  console.log(image);
  return (
    <div className="sm:text-left flex sm:justify-center text-center justify-start">
      <div>
        <div
          className={`sm:w-56 sm:h-56 w-48 h-48 mb-4 shadow-lg shadow-cyan flex justify-center rounded-3xl`}
        >
          <img
            src={image ? image : "../../src/assets/profile.png"}
            className=" sm:h-56 sm:w-56 h-48 w-48 rounded-2xl"
          />
        </div>
        <h2 className=" font-montserrat font-bold text-xl ">
          {name ? name : "lorem"}
        </h2>
        <p className=" font-chakraPetch font-thin">
          {position ? position : "lorem ipsum"}
        </p>
        <div className="flex justify-between w-56">
          <button className="w-6 h-6 md:w-8 md:h-8 ml-2 mr-6 mb-4 py-2">
            <img src={li} />
          </button>
          <button className="w-6 h-6 md:w-8 md:h-8 ml-2 mr-6 mb-4 py-2">
            <img src={ig} />
          </button>
          <button className="w-6 h-6 md:w-8 md:h-8 ml-2 mr-6 mb-4 py-2">
            <img src={gh} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default OurTeam;
