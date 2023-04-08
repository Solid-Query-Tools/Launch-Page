// @refresh reload
import { Suspense, createResource } from "solid-js";
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
  useSearchParams,
} from "solid-start";
import { getSession } from "@auth/solid-start";
import { createServerData$ } from "solid-start/server";
import { authOpts } from "./routes/api/[...solidAuth]";
import { signIn, signOut } from "@auth/solid-start/client";
import { Switch, Match, Show, createSignal, createEffect} from "solid-js";
import "./root.css";


export default function Root() {


  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";


  //pull Client ID from .env file, which is passed as an endpoint when "Admin Login" is clicked
  const clientId: string = import.meta.env.VITE_ClientID;
  //access the code given to us by github after a login, which will be used to gain an access token 
  const [searchParams] = useSearchParams();
  const code = searchParams.code;


  //if email sent to the database is in the .env file, set admin on that property to true

  const useSession = () => {
    return createServerData$(
      async (_, { request }) => {
        return await getSession(request, authOpts)
      },
      { key: () => ["auth_user"] }
    )
  }

  const session = useSession();
  const user = () => session()?.user;
  
  

  const login = () => signIn("github");
  const logout = () => signOut();


  //Admin Login Checker
  const [adminLogin, setAdminLogin] = createSignal(false);
  const [username, setUsername] = createSignal(user()?.email);
 

  //four Admins to check
  const admin1: string = import.meta.env.VITE_Admin1;
  const admin2: string = import.meta.env.VITE_Admin2;
  const admin3: string = import.meta.env.VITE_Admin3;
  const admin4: string = import.meta.env.VITE_Admin4;

  createEffect(() => {
      console.log("This is the user:", user());
      if (
        username() === admin1 ||
        username() === admin2 ||
        username() === admin3 ||
        username() === admin4
      ) {
        setAdminLogin(true);
      }
    })

    //Send username to database; 
    //Create isUser signal in Admin to check if the user is the right user. 



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
                <Show when={adminLogin() === true}>
                  <li class={`border-b-2 ${active("/admin")} mx-1.5 sm:mx-6`}>
                    <A href="/admin">Admin</A>
                  </li>
                </Show>
              </ul>
              <div class="flex flex-grow justify-end">
                <button class="flex flex-row items-center">
                  <img class="h-8 w-8 mr-3" src="/yarnBlackWithWhiteLogo.png"></img>
                  <img class="h-14 w-14 mr-3" src="/npmBlackIcon.png"></img>
                  <img class="h-8 w-8 mr-4" src="/Medium.png"></img>
                  <img class="h-8 w-8 " src="/githubBlackWithWhite.png" />
                  <div class={` border-b-2 text-gray-200 ${active("https://github.com/")} sm:mx-6`}>
                    <Switch >
                      <Match when={user()}>
                        <div>Logged in as {user()?.name}</div>
                        <button onClick={() => {
                          logout()
                          setUsername('');
                          setAdminLogin(false);
                        }
                        }>Logout</button>
                      </Match>
                      <Match when={!user()}>
                        <button class="border" onClick={() => {
                          login();
                          setUsername(user()?.email);
                        }}>Admin Login</button>
                      </Match>
                    </Switch>
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
