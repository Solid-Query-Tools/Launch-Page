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
      return data;
    })


  //need to filter before map as well
  // const content = query.data.filter((q) => q.type == view()).map((q) => <Message  author={q.author} text={q.text} date={q.createdAt}/>)

  return (
    <>
      <Header />
      <div class='flex flex-col items-center'>
        <div class='bg-gray-800 w-1/4 h-10 flex items-center justify-around mt-10 min-w-fit p-3 rounded-xl'>
          <button class={`mx-2 border-b-2 ${active('feedback')}`} onClick={() => setView('feedback')}>View Feedback</button>
          <button class={`mx-2 border-b-2 ${active('submit')}`} onClick={() => {
            // fetch('/sendfeedback', {
            //   method: 'POST',
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({testimonial: "hi"}),
            // });
            setView('submit')
          }}>Submit Feedback</button>
        </div>
        <section class='w-4/5 text-white mt-10 h-[40em]'>
          <Switch>
            <Match when={view() === 'feedback'}>
              <div class="flex flex-col items-center overflow-y-scroll">
                <For each={query.data}>
                  {feedback => {
                    return <Message createdBy={feedback.createdBy} createdAt={feedback.createdAt} type={feedback.type} message={feedback.message} queryCall={query}/>
                  }}
                </ For>
              </div>
            </Match>
            <Match when={view() === 'submit'}>
              <div class="flex flex-col items-center">
                <Form />
              </div>
            </Match>
          </ Switch>
        </section>
      </div>
    </>
  )
}