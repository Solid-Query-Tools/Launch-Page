import { createSignal } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'
import Message from '../Components/Message'
import Header from '../header'
import { For } from 'solid-js'

export default function Feedback() {
  //use signal to determine whether to show feature request or bugs
  const [view, setView] = createSignal('feature')

  //use solid query to populate cache with data on feedback and bugs from the database
  const query = createQuery(() => ['feedback'],
   async () => {
    let data = await fetch('https://pokeapi.co/api/v2/pokemon/')
    data = await data.json()
    return data.results;
  })



  //need to filter before map as well
  // const content = query.data.filter((q) => q.type == view()).map((q) => <Message  author={q.author} text={q.text} date={q.createdAt}/>)

  return (
    <>
    <Header />
    <div class='flex flex-col items-center'>
    <div class='bg-green-500 w-1/5 flex items-center justify-around'>
      <button onClick={() => setView('feature')}>Feature Requests</button>
      <button onClick={() => setView('bugs')}>Bug Reports</button>
    </div>
    <section class='bg-black w-4/5 text-white'>
    <For each={query.data}>
        {pokemon => { 
          if (pokemon.name[0] == 'c') return <div>{pokemon.name}</div>
          }}
    </ For>
    </section>
    </div>
    </>
  )
}