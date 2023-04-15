/* @refresh reload */
import { render } from 'solid-js/web';
// import "tailwindcss/tailwind.css"; 
import { Router, Route, Routes } from "@solidjs/router"
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import './index.css';
import App from './App';
import Team from './team';
import Feedback from './Routes/Feedback';
import { UserProvider } from './UserContext';

const root = document.getElementById('root');

const queryClient = new QueryClient()

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(() => 
<QueryClientProvider client={queryClient}>
  <UserProvider >
    <Router>
      <Routes>
        <Route path="/" component={App} />
        <Route path="/team" component={Team} />
        <Route path="/feedback" component={Feedback} />
      </Routes>
    </Router>
  </UserProvider>
</ QueryClientProvider>
, root!);
