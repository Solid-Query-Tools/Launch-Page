import type { Component } from 'solid-js';
import YarnLogo from "./assets/YarnLogo.png"
import SquidLogo from "./assets/SquidLogo.png"
import BackgroundBubbles from "./assets/BackgroundBubbles.mp4"
import SolidLogo from "./assets/SolidLogo.png"
import Header from './header';

const App: Component = () => {
  return (
    <>
      <Header />
      <main class="relative flex mb-12 overflow-hidden h-64">
        <div class="relative flex flex-row justify-center items-center z-30 p-5 text-6xl justify-center text-sky-200 text-center bg-opacity-50 rounded-xl w-screen">
          <img class="h-14 w-14" src={SolidLogo}></img>
          olid Query Devtools
        </div>
        <video
          autoplay
          loop
          muted
          class="absolute z-10"
        >
          <source
            src={BackgroundBubbles}
            type="video/mp4"
          />
        </video>

      </main>



    </>

  );
};

export default App;
