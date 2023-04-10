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
    let data = await fetch('/getfeedback')
    console.log(data)
    data = await data.json()
    console.log(data)
    return data;
  })



  //need to filter before map as well
  // const content = query.data.filter((q) => q.type == view()).map((q) => <Message  author={q.author} text={q.text} date={q.createdAt}/>)

  return (
    <>
    <Header />
    <div class='flex flex-col items-center h-content'>
    <div class='bg-green-500 w-1/4 h-10 flex items-center justify-around'>
      <button onClick={() => setView('feature')}>Feature Requests</button>
      <button onClick={() => setView('bugs')}>Bug Reports</button>
      <button onClick={() => {
        fetch('/sendfeedback', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({testimonial: "hi"}),
        });
        setView('submit')
        }}>Submit</button>
    </div>
    <section class='bg-black w-4/5 h-200 text-white'>
      <Message />
    {/* <For each={query.data}>
        {feedback => { 
          console.log(feedback)
          return <div>{feedback.createdBy}</div>
          }}
    </ For> */}
    </section>
    </div>
    </>
  )
}