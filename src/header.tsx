import SquidLogo from './assets/SquidLogo.png';
import YarnLogo from './assets/YarnLogo.png';

export default function Header() {

    return (
        <>
            <nav class="bg-gray-800 flex flex-row">
                <ul class="flex items-center p-3 text-gray-200">
                    <img class="h-12 w-12" src={SquidLogo} />
                    <li class="border-b-2 mx-1.5 sm:mx-6">
                        <a href="/">Home</a>
                    </li>
                    <li class="border-b-2 mx-1.5 sm:mx-6">
                        <a href="/about">About</a>
                    </li>
                    <li class="border-b-2 mx-1.5 sm:mx-6">
                        <a href="/team">Team</a>
                    </li>
                    <li class="border-b-2 mx-1.5 sm:mx-6">
                        <a href="/admin">Admin</a>
                    </li>
                    <li class="border-b-2 mx-1.5 sm:mx-6">
                        <a href="/feedback">Feedback</a>
                    </li>
                </ul>
                <div class="flex flex-grow justify-end">
                    <div class="flex flex-row items-center">
                        <img class="h-8 w-8 mr-3" src="/"></img>
                        <img class="h-14 w-14 mr-3" src={YarnLogo}></img>
                        <img class="h-8 w-8 mr-4" src=""></img>
                        <img class="h-8 w-8 " src="" />
                        <div class="border-b-2 text-gray-200 sm:mx-6">
                            <button>Admin Login</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}