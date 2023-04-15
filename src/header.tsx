import SquidLogo from './assets/SquidLogo.png';
import YarnLogo from './assets/YarnLogo.png';
import MediumLogo from './assets/MediumLogo.png';
import GithubLogo from './assets/GithubLogo.png'
import NPMLogo from './assets/NPMLogo.png'
import { useLocation } from "@solidjs/router"
import { createSignal, createEffect, onMount, Switch, Match, useContext } from 'solid-js';
import { UserContext } from './UserContext';
import axios from 'axios';

const client_id = '0d4f2774e4002245e60a';

export default function Header() {

  const { username, setUsername, isAdmin, setIsAdmin, isLoggedIn, setIsLoggedIn } = useContext(UserContext);


  console.log('username in header component: ', username());



    const getUser = () => {
        axios.get('/user')
          .then(response => {
            // if the user hasn't logged in or their session has expired, return without setting the isLoggedIn signal to true
            if (!response.data) return;
            // otherwise set the username signal to the user's github username and the isLoggedIn signal to true
            const data = response.data;
            console.log('/user response in header component: ', data); // log the response data
            setUsername(data.username);
            setIsAdmin(data.admin)
            setIsLoggedIn(true);
          })
          .catch(error => {
            console.log('/user error in header component: ', error);
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

  //delete "session" cookie
  function deleteCookie() {
    console.log('in delete cookie function');
    document.cookie = "session" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  function logout() {
    //remove session from DB
    axios.delete('/session')
      .then((result) => {
        console.log('in logout function');
        deleteCookie();
        setIsLoggedIn(false)
        console.log(isLoggedIn());
      })
      .catch(error => {
        console.error('logout error: ', error);
      });
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
          {/* <li class={`border-2 rounded p-2 ml-10 visible text-[10px] absolute right-2 sm:invisible sm:mx-6`}>
            <button onClick={() => oauth()}>Github Login</button>
          </li> */}
        </ul>
        <div class="flex flex-grow justify-end">
          <div class="sm:flex sm:flex-row sm:items-center">
            <img class="h-10 w-10 mr-3 invisible md:visible" src={NPMLogo} />
            <img class="h-8 w-8 mr-3 invisible md:visible" src={YarnLogo} />
            <img class="h-8 w-8 mr-4 invisible md:visible" src={MediumLogo} />
            <img class="h-8 w-8 invisible md:visible" src={GithubLogo} />
            <Switch>
              <Match when={isLoggedIn() === false}>
                <div class={`border-b-2 p-2 ml-10 absolute right-2 top-5 sm:mb-10 sm:relative sm:ml-5 sm:mx-6 sm:${active("https://github.com/")}`} >
                  <button onClick={() => oauth()}>Github Login</button>
                </div>
              </Match>
              <Match when={isLoggedIn() === true} >
                <div class={`border-b-2 p-2 ml-10 invisible sm:visible sm:absolute sm:right-2 sm:top-5 sm:mb-10 sm:relative sm:ml-5 sm:mx-6 sm:${active("/")}`} >{username()}</div>
                <button class={`border-b-2 p-2 ml-10 absolute right-2 top-5 sm:mb-10 sm:relative sm:ml-5 sm:mx-6 sm:${active("https://github.com/")}`} onClick={() => logout()}>Logout</button>
              </Match>
            </Switch>
          </div>
        </div>
      </nav>
    </>
  )
}