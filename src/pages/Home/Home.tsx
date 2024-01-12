import { Header } from "../../components";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Header title="ALCHEMY" />
      <div className="flex flex-col items-center justify-center h-full w-full -translate-y-10">
        <p className=" font-chakraPetch text-white text-2xl md:text-4xl">
          Chemical Engineering Symposium of NIT Trichy
        </p>
        <div className="relative flex justify-center items-center">
          <p className="font-airnt translate-y-2 text-4xl md:text-7xl text-outline">
            ALCHEMY
          </p>

          <p className="font-airnt absolute text-4xl md:text-7xl text-cyan ">
            ALCHEMY
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
