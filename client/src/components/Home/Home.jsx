import { useEffect, useRef } from "react";
import NET from "vanta/src/vanta.net";
import "./home.css";
import "animate.css";
import Typed from "typed.js";
import Flowchart from "../Flowchart/Flowchart";

function Home() {
  const el = useRef(null);

  useEffect(() => {
    // Initialize Vanta.js effect
    const vantaEffect = NET({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: window.innerHeight,
      minWidth: window.innerWidth,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xcf1f77,
      maxDistance: 30.0,
      spacing: 17.0,
      fullscreen: true,
    });

    // Initialize Typed.js
    const typedInstance = new Typed(el.current, {
      strings: [
        "<i>Exploring the world of finance...</i>",
        "Discovering investment opportunities...",
      ],
      typeSpeed: 100,
      smartBackspace: true,
      loop: true,
      showCursor: false,
    });

    // Clean up Typed instance
    return () => {
      typedInstance.destroy();

      // Clean up Vanta.js effect
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <>
      <section id="vanta">
        <div className="2xl:container mx-auto">
          <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center h-[100vh] gap-3">
              {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-50 flex items-center justify-center"> */}
              <h1 className="tracking-in-expand-fwd text-white font-extrabold text-6xl">
                HYPER<span className="text-[#B239C8]">TRADE</span>X
              </h1>
              <p
                className="tracking-in-expand-fwd text-[#c2b630] text-3xl hover:z-auto"
                ref={el}></p>
            </div>
            <div className="flex justify-center items-center">
              <img
                className=""
                src="https://ik.imagekit.io/0oeuxr64bc/19197351-removebg-preview.png?updatedAt=1714489445903"
                alt="img"
              />
            </div>
          </div>
        </div>
      </section>
      <div>
        <Flowchart />
      </div>
    </>
  );
}

export default Home;
