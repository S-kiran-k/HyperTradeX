import { stockimg } from "../../assets/images/images";
import "./Flowchart.css";

function Flowchart() {
  const data = [
    {
      key: 1,
      title: "Customer-First Approach",
      content:
        "No spam, gimmicks, or intrusive notifications. HyperTradex offers high-quality apps tailored to your preferences and pace",
    },
    {
      key: 2,
      title: "The HyperTradex Ecosystem",
      content:
        "HyperTradex isn't just an app; it's an entire ecosystem designed to offer unparalleled user experience. With its intuitive interface, advanced features, and user-centric approach, HyperTradex sets a new standard in trading platforms, making it the preferred choice for traders of all levels.",
    },
    {
      key: 3,
      title: "Empowering Your Financial Journey",
      content:
        "With features like Nudge and Kill Switch, HyperTradex goes beyond transactions to empower you in making better financial decisions.",
    },
  ];
  return (
    <div className="2xl-container py-10 bg-yellow-50">
      <div className=" w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="py-5 flex flex-col justify-center items-center gap-3 bg-purple-400 rounded-lg ">
          <div className="">
            <p className="text-[#23153C] text-2xl font-bold underline">
              Trust with confidence
            </p>
          </div>

          {data.map((data, index) => (
            <div className="w-96 scale-in-left" key={index}>
              <div className="bg-white rounded-lg shadow-md">
                <div className="px-6 py-4">
                  <i className=" text-3xl text-blue-500"></i>
                  <div className="mt-4">
                    <span className="block font-semibold text-lg">
                      {data.title}
                    </span>
                  </div>
                  <p className="mt-4 text-gray-600">{data.content}</p>
                  <div className="flex justify-between items-center mt-4">
                    <a href="#" className="text-blue-500 font-semibold">
                      Explore
                    </a>
                    <span className="text-gray-500"></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center sm:px-5">
          <img src={stockimg} alt="Stock Image" />
        </div>
      </div>
    </div>
  );
}

export default Flowchart;
