import { Component, createSignal, Switch, Match, Show } from 'solid-js';
import { IoCopy } from 'solid-icons/io'
import { FaRegularCircleCheck } from 'solid-icons/fa'
import BackgroundBubbles from "./assets/BackgroundBubbles.mp4"
import SolidLogo from "./assets/SolidLogo.png"
import HowTo from "./assets/how-to-use.jpg"
import Header from './header';

const App: Component = () => {
  const [copyNPM, setCopyNPM] = createSignal(false)
  const [copiedNPM, setCopiedNPM] = createSignal(false)

  async function copyText(str, setSignal) {
    try {
      await navigator.clipboard.writeText(str);
      setSignal(true)
      setTimeout(() => {
        setSignal(false)
      }, 2000);
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Header />
      <main class="relative flex sm:mb-12 overflow-hidden h-32 sm:h-64">
        <div class="relative flex flex-col justify-center items-center z-30 p-5 text-3xl sm:text-6xl justify-center text-sky-200 text-center bg-opacity-50 rounded-xl w-screen">
          <img class="h-7 w-7 sm:h-14 sm:w-14" src={SolidLogo} />
          Solid Query Devkit
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
      <div class="flex flex-col">
        <p class="text-center font-bold sm:relative sm:mb-10 mt-3 mb-3">
          A lightweight NPM package that allows you to debug SolidJS applications using Tanstack's Solid Query.
        </p>
        <div class="flex flex-col lg:flex-row justify-around mt-10 sm:h-[20em]">
          <div class="bg-gray-800 lg:w-1/3 rounded-xl flex flex-col m-2">
            <h1 class="text-3xl sm:text-6xl text-sky-700 font-thin p-5">
              Features
            </h1>
            <ul class="list-outside list-disc text-sm px-9 mb-3">
              <li class="py-1">analyze information about query status, including whether a query is fresh, stale, paused, or inactive</li>
              <li class="py-1">sort queries by query keys and latest updated</li>
              <li class="py-1">refetch or remove queries</li>
              <li class="py-1">review the data received from each query as well as metadata about query update times and status</li>
            </ul>
          </div>
          <div class="lg:w-1/3 min-w-fit bg-gray-800 rounded-xl m-2">
            <div class="flex justify-between">
              <h1 class={` mx-1.5 sm:mx-6 max-6-xs text-3xl sm:text-6xl text-sky-700 font-thin p-5`}>Install</h1>
              
            </div>
              <div class="flex flex-col items-center justify-center mb-4">
                <div onMouseOver={() => setCopyNPM(true)} onMouseLeave={() => setCopyNPM(false)} class="rounded-lg px-2 flex items-center justify-between mt-10 bg-gray-700 w-3/5 p-1 font-['Roboto-mono']">
                  <p class="font-mono text-sm px-2">npm install solid-query-devkit</p>
                  <Show when={copyNPM() || copiedNPM()}>
                    <Switch>
                      <Match when={!copiedNPM()}>
                        <IoCopy class='cursor-pointer' size={18} color={"gray"} title="CopyOutlined" onClick={() => copyText('npm install solid-query-devkit', setCopiedNPM)} />
                      </Match>
                      <Match when={copiedNPM()}>
                        <FaRegularCircleCheck size={18} color={"green"} title="CopyOutlined" />
                      </Match>
                    </Switch>
                  </Show>
                </div>
                <p class="hover:border-b-2 hover:border-sky-600 mt-10 text-sky-700 font-bold"><a href="https://github.com/oslabs-beta/SQuiD">How to Use</a></p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
