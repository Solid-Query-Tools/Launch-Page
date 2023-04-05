// @refresh reload
import { Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";


export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (
    <Html lang="en">
      <Head>
        <Title>SQuiD</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="bg-gray-900 text-gray-100 antialiased font-roboto">
        <Suspense>
          <ErrorBoundary>
            <nav class="bg-gray-800 flex flex-row">
              <ul class="flex items-center p-3 text-gray-200">
              <img class="h-12 w-12" src="/SquidLogo.png" />
                <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
                  <A href="/">Home</A>
                </li>
                <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
                  <A href="/about">About</A>
                </li>
                <li class={`border-b-2 ${active("/team")} mx-1.5 sm:mx-6`}>
                  <A href="/team">Team</A>
                </li>
                </ul>
                <div class="flex flex-grow justify-end">
                <button class="flex flex-row items-center ">
                  <img class="h-8 w-8" src="/Medium.png"></img>
                  <img class="h-8 w-8 mx-3" src="/GithubWhite.png"/>
                  <div class={` border-b-2 text-gray-200 ${active("https://github.com/")} mx-1.5 sm:mx-6`}>
                  <A href="https://github.com/">Admin Login</A> 
                  </div>
                </button>
                </div>
            </nav>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
