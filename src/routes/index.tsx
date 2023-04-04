import { A } from "solid-start";

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin my-16">
        Solid Query UI Dev Tools
      </h1>
      <p>
        A lightweight NPM package that allows you to debug SolidJS applications using Tanstack's Solid Query. 
      </p>
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
    </main>
  );
}
