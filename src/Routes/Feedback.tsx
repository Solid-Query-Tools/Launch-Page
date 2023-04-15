import { createSignal } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'
import Message from '../Components/Message'
import Form from '../Components/Form'
import Header from '../header'
import { For, Switch, Match } from 'solid-js'

export default function Feedback() {
  //use signal to determine whether to show feature request or bugs
  const [view, setView] = createSignal('feedback')

  const active = (path: string) =>
    path == view()
      ? "border-sky-600 font-bold"
      : "border-transparent hover:border-sky-600";

  //use solid query to populate cache with data on feedback and bugs from the database
  const query = createQuery(() => ['feedback'],
    async () => {
      let data = await fetch('/fb')
      data = await data.json()
      return data.reverse();
    })

  return (
    <>
      <Header />
      <div class='flex flex-col items-center'>
        <div class='bg-gray-800 w-1/4 h-10 flex items-center justify-around mt-10 min-w-fit p-3 rounded-xl'>
          <button class={`mx-2 border-b-2 ${active('feedback')}`} onClick={() => setView('feedback')}>View Feedback</button>
          <button class={`mx-2 border-b-2 ${active('submit')}`} onClick={() => {
            setView('submit')
          }}>Submit Feedback</button>
        </div>
        <section class='w-4/5 text-white mt-10 h-[40em]'>
          <Switch>
            <Match when={view() === 'feedback'}>
              <div class="flex flex-col items-center">
                <For each={query.data}>
                  {feedback => {
                    return <Message id={feedback._id} createdBy={feedback.createdBy} createdAt={feedback.createdAt} type={feedback.type} message={feedback.message} adminResponse={feedback.adminResponse} queryCall={query}/>
                  }}
                </ For>
              </div>
            </Match >
            <Match when={view() === 'submit'}>
              <div class="flex flex-col items-center">
                <Form queryCall={query}/>
              </div>
            </Match>
          </ Switch>
        </section>
      </div>
    </>
  )
}