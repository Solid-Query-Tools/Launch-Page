import SquidLogo from './assets/SquidLogo.png';
import YarnLogo from './assets/YarnLogo.png';
import MediumLogo from './assets/MediumLogo.png';
import GithubLogo from './assets/GithubLogo.png'
import NPMLogo from './assets/NPMLogo.png'
import { useLocation } from "@solidjs/router"

const client_id = '0d4f2774e4002245e60a';

export default function Header() {

  const oauth = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}`
  }

    const location = useLocation();
    const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";

    return (
        <>
            <nav class="bg-gray-800 flex flex-row sticky top-0 z-40">
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
                </ul>
                <div class="flex flex-grow justify-end">
                    <div class="flex flex-row items-center">
                        <img class="h-10 w-10 mr-3" src={NPMLogo}></img>
                        <img class="h-8 w-8 mr-3" src={YarnLogo}></img>
                        <img class="h-8 w-8 mr-4" src={MediumLogo}></img>
                        <img class="h-8 w-8 " src={GithubLogo} />
                        <div class={`border-b-2 ${active("https://github.com/")} mx-1.5 sm:mx-6`} >
                            <button onClick={() => oauth()}>Admin Login</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}