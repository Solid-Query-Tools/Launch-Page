import { Component, createSignal, Switch, Match, Show } from 'solid-js';
import YarnLogo from "./assets/YarnLogo.png"
import SquidLogo from "./assets/SquidLogo.png"
import { IoCopy } from 'solid-icons/io'
import { FaRegularCircleCheck } from 'solid-icons/fa'
import BackgroundBubbles from "./assets/BackgroundBubbles.mp4"
import SolidLogo from "./assets/SolidLogo.png"
import Header from './header';
import { A } from '@solidjs/router';

const App: Component = () => {
  const [view, setView] = createSignal('install')
  const [copyNPM, setCopyNPM] = createSignal(false)
  const [copyYarn, setCopyYarn] = createSignal(false)
  const [copiedNPM, setCopiedNPM] = createSignal(false)
  const [copiedYarn, setCopiedYarn] = createSignal(false)

  async function copyText(str, setSignal) {
    try {
      await navigator.clipboard.writeText(str);
      setSignal(true)
      setTimeout(() => {
        setSignal(false)
      }, 2000);
    }
    catch (err) {
      console.log('error')
    }
  }

  const styling = switcher =>
  view() == switcher
    ? "border-sky-600"
    : "border-transparent hover:border-sky-600";

  return (
    <>
      <Header />
      <main class="relative flex sm:mb-12 overflow-hidden h-32 sm:h-64">
        <div class="relative flex flex-col justify-center items-center z-30 p-5 text-3xl sm:text-6xl justify-center text-sky-200 text-center bg-opacity-50 rounded-xl w-screen">
          <img class="h-7 w-7 sm:h-14 sm:w-14" src={SolidLogo} />
          Solid Query Devtools
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
        <p class="text-center font-thin sm:relative sm:mb-10">
        A lightweight NPM package that allows you to debug SolidJS applications using Tanstack's Solid Query.
        </p>
        <div class="flex flex-col lg:flex-row justify-around mt-10 sm:h-[20em]">
          <div class="bg-gray-800 lg:w-1/3 rounded-xl flex flex-col m-2">
            <h1 class="text-3xl sm:text-6xl text-sky-700 font-thin p-5">
              Features
            </h1>
            <ul class="list-outside list-disc text-sm px-9 font-thin">
              <li class="py-1">analyze information about query status, including whether a query is fresh, stale, paused, or inactive</li>
              <li class="py-1">sort queries by query keys and latest updated</li>
              <li class="py-1">refetch or remove queries</li>
              <li class="py-1">review the data received from each query as well as metadata about query update times and status</li>
            </ul>
          </div>
          <div class="lg:w-1/3 min-w-fit bg-gray-800 rounded-xl m-2">
            <div class="flex justify-between">
              <h1 onClick={() => setView('install')} class={`border-b-2 mx-1.5 sm:mx-6 ${styling('install')} hover:cursor-pointer max-6-xs text-3xl sm:text-6xl text-sky-700 font-thin p-5`}>Install</h1>
              <h1 onClick={() => setView('how')} class={`border-b-2 mx-1.5 sm:mx-6 ${styling('how')} hover:cursor-pointer max-6-xs text-3xl sm:text-6xl text-sky-700 font-thin p-5`}>How to Use</h1>
            </div>
            <Show when={view() == 'install'}>
              <div class="flex flex-col items-center">
                <div onMouseOver={() => setCopyNPM(true)}  onMouseLeave={() => setCopyNPM(false)}class="rounded-lg px-2 flex items-center justify-between mt-10 bg-gray-700 w-3/5 p-1 font-['Roboto-mono']">
                  <p class="font-mono text-sm px-2">npm install solid-query-devtools</p>
                  <Show when={copyNPM() || copiedNPM()}>
                    <Switch>
                      <Match when={!copiedNPM()}>
                        <IoCopy class='cursor-pointer' size={18} color={"gray"} title="CopyOutlined" onClick={() => copyText('npm install solid-query-devtools', setCopiedNPM)}/>
                      </Match>
                      <Match when={copiedNPM()}>
                        <FaRegularCircleCheck size={18} color={"green"} title="CopyOutlined"/>
                      </Match>
                    </Switch>
                  </Show>
                </div>
                <div onMouseOver={() => setCopyYarn(true)}  onMouseLeave={() => setCopyYarn(false)} class="rounded-lg px-2 mb-2 flex items-center justify-between mt-3 bg-gray-700 w-3/5 p-1 font-['Roboto-mono']">
                  <p class="font-mono text-sm px-2">yarn add @solid-query-devtools</p>
                  <Show when={copyYarn() || copiedYarn()}>
                    <Switch>
                      <Match when={!copiedYarn()}>
                        <IoCopy class='cursor-pointer' size={18} color={"gray"} title="CopyOutlined" onClick={() => copyText('yarn add @solid-query-devtools', setCopiedYarn)}/>
                      </Match>
                      <Match when={copiedYarn()}>
                        <FaRegularCircleCheck size={18} color={"green"} title="CopyOutlined"/>
                      </Match>
                    </Switch>
                  </Show>
                </div>
              </div>
            </Show>
          </div>
        </div>
        <p class="my-4 ml-5 relative bottom-0 sm:fixed lg:relative">
          <span>Home</span>
          {" - "}
          <A href="/about" class="text-sky-600 hover:underline">
            About Page
          </A>{" - "}
          <A href="/team" class="text-sky-600 hover:underline">
            Team Page
          </A>
        </p>
      </div>
    </>
  );
};

export default App;
