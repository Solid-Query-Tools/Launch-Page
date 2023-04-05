import { A } from "solid-start";

export default function Home() {
  return (
    <>
      <main class="relative flex mb-12 overflow-hidden h-64">
        <div class="relative flex flex-row justify-center items-center z-30 p-5 text-6xl justify-center text-sky-200 text-center bg-opacity-50 rounded-xl w-screen">
          <img class="h-14 w-14" src="/Solid.js.png"></img>
          olid Query Devtools
        </div>
        <video
          autoplay
          loop
          muted
          class="absolute z-10"
        >
          <source
            src="/BackgroundBubbles.mp4"
            type="video/mp4"
          />
        </video>

      </main>
      <div>
      A lightweight NPM package that allows you to debug SolidJS applications using Tanstack's Solid Query. 
        <h1 class="max-6-xs text-6xl text-sky-700 font-thin my-16">
          Features
        </h1>
        <ul>
          <li>- analyze information about query status, including whether a query is fresh, stale, paused, or inactive</li>
          <li>- sort queries by query keys and latest updated</li>
          <li>- refetch or remove queries</li>
          <li>- review the data received from each query as well as metadata about query update times and status</li>
        </ul>
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
      </div>
    </>
  );
}
