import type { Component } from 'solid-js';
import Message from './Components/Message';

const App: Component = () => {
  return (
    <div class="bg-yellow-50">
      <nav class="bg-yellow-50">
        Hello World
      </nav>
      <div>
        <Message />
      </div>
    </div>
  );
};

export default App;
