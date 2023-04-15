import { Component, createSignal } from 'solid-js';
import YarnLogo from "./assets/YarnLogo.png"
import SquidLogo from "./assets/SquidLogo.png"
import { IoCopy } from 'solid-icons/io'
import { FaRegularCircleCheck } from 'solid-icons/fa'
import BackgroundBubbles from "./assets/BackgroundBubbles.mp4"
import SolidLogo from "./assets/SolidLogo.png"
import Header from './header';
import { A } from '@solidjs/router';
import Testimonial from './testimonial';

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

  return (
    <>
      <Header />
      <main class="relative flex mb-12 overflow-hidden h-64">
        <div class="lg:text-sm relative flex flex-row justify-center items-center z-30 p-5 text-6xl justify-center text-sky-200 text-center bg-opacity-50 rounded-xl w-screen">
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

      <div class="flex flex-col">
        <p class="text-center font-bold">
        A lightweight NPM package that allows you to debug SolidJS applications using Tanstack's Solid Query.
        </p>
        <div class="flex justify-around mt-10 h-[20em]">
        <div class="bg-gray-800 w-1/3 rounded-xl">
        <h1 class="max-6-xs text-6xl text-sky-700 font-thin p-5">
          Features
        </h1>
        <ul class="list-outside list-disc text-sm">
          <li>analyze information about query status, including whether a query is fresh, stale, paused, or inactive</li>
          <li>sort queries by query keys and latest updated</li>
          <li>refetch or remove queries</li>
          <li>review the data received from each query as well as metadata about query update times and status</li>
        </ul>
        </div>
        <div class="w-1/3 min-w-fit bg-gray-800 rounded-xl">
          <div class="flex justify-between">
          <h1 onClick={() => setView('install')} class="hover:cursor-pointer max-6-xs text-6xl text-sky-700 font-thin p-5">Install</h1>
          <h1 onClick={() => setView('how')} class="hover:cursor-pointer max-6-xs text-6xl text-sky-700 font-thin p-5">How to Use</h1>
          </div>
          <Show when={view() == 'install'}>
          <div class="flex flex-col items-center">
          <div onMouseOver={() => setCopyNPM(true)}  onMouseLeave={() => setCopyNPM(false)}class="rounded-lg px-2 flex items-center justify-between mt-3 bg-gray-700 w-3/5 p-1 font-['Roboto-mono']">
            <p>npm install solid-query-devtools</p>
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
          <div onMouseOver={() => setCopyYarn(true)}  onMouseLeave={() => setCopyYarn(false)} class="rounded-lg px-2 flex items-center justify-between mt-3 bg-gray-700 w-3/5 p-1 font-['Roboto-mono']">
            <p>yarn add @solid-query-devtools</p>
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
        <p class="my-4">
          <span>Home</span>
          {" - "}
          <A href="/about" class="text-sky-600 hover:underline">
            About Page
          </A>{" - "}
          <A href="/team" class="text-sky-600 hover:underline">
            Team Page
          </A>
        </p>
        <Testimonial />
      </div>
    </>
  );
};

export default App;
