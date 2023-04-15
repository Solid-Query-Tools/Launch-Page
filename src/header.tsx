import SquidLogo from './assets/SquidLogo.png';
import YarnLogo from './assets/YarnLogo.png';
import MediumLogo from './assets/MediumLogo.png';
import GithubLogo from './assets/GithubLogo.png'
import NPMLogo from './assets/NPMLogo.png'
import { useLocation } from "@solidjs/router"
import { createSignal, createEffect, onMount, Switch, Match } from 'solid-js';
import axios from 'axios';

const client_id = '0d4f2774e4002245e60a';

export default function Header() {

    const [username, setUsername] = createSignal('');
    const [isLoggedIn, setIsLoggedIn] = createSignal(false);
    // const [cookie, setCookie] = createSignal('');



    const getUser = () => {
        axios.get('/user')
          .then(response => {
            const data = response.data;
            console.log(data); // log the response data
            setUsername(data);
            setIsLoggedIn(true);
          })
          .catch(error => {
            console.log(error);
          });
      }

    onMount(() => {
        getUser();
    })

    createEffect(() => {
        console.log("Is the User Logged In:", isLoggedIn());
    })

    function oauth() {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}`;
        
        //IF this doesn't work, then we will need to put the get User in a createEffect
    }




    const location = useLocation();
    const active = (path: string) =>
        path == location.pathname
            ? "border-sky-600"
            : "border-transparent hover:border-sky-600";

  return (
    <>
      <nav class="bg-gray-800 flex flex-row sticky top-0 z-40 max-h-20">
        <ul class="flex items-center p-3 text-gray-200">
          <img class="h-12 w-12" src={SquidLogo} />
          <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`} >
            <a href="/">Home</a>
          </li>
          <li class={`border-b-2 ${active("/team")} mx-1.5 sm:mx-6`} >
            <a href="/team">Team</a>
          </li>
          <li class={`border-b-2 ${active("/feedback")} mx-1.5 sm:mx-6`}>
            <a href="/feedback">Feedback</a>
          </li>
          <li class={`border-2 rounded p-2 ml-10 visible text-[10px] absolute right-2 sm:invisible sm:mx-6`}>
            <button onClick={() => oauth()}>Github Login</button>
          </li>
        </ul>
        <div class="flex flex-grow justify-end">
          <div class="sm:flex sm:flex-row sm:items-center">
            <img class="h-10 w-10 mr-3 invisible sm:visible" src={NPMLogo} />
            <img class="h-8 w-8 mr-3 invisible sm:visible" src={YarnLogo} />
            <img class="h-8 w-8 mr-4 invisible sm:visible" src={MediumLogo} />
            <img class="h-8 w-8 invisible sm:visible" src={GithubLogo} />
            <Switch>
                <Match when={isLoggedIn() === false}>
                    <div class={`border-b-2 ${active("https://github.com/")} mx-1.5 sm:mx-6 invisible sm:visible`} >
                        <button onClick={() => oauth()}>Github Login</button>
                    </div>
                </Match>
                <Match when={isLoggedIn() === true}>
                    <div class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`} >{username()}</div>
                    <button class=" border-b-2 border-transparent hover:border-sky-600 mr-5" onClick={() => setIsLoggedIn(false)}>Logout</button>
                </Match>
            </Switch>
          </div>
        </div>
      </nav>
    </>
  )
}