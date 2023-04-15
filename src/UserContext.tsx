import { createContext, createSignal } from 'solid-js';

export const UserContext = createContext();

export function UserProvider(props) {
  const [username, setUsername] = createSignal('');
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);

  return (
    <UserContext.Provider value={{username, setUsername, isLoggedIn, setIsLoggedIn}}>
      {props.children}
    </UserContext.Provider>
  )
}