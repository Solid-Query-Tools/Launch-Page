import { createSignal } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'
import Message from '../Components/Message'

export default function Feedback() {
  //use signal to determine whether to show feature request or bugs
  const [view, setView] = createSignal('feature')

  //use solid query to populate cache with data on feedback and bugs from the database
  const query = createQuery(() => ['feedback'], () => {
    //function will get all feedback data from our database via REST API
  })

  //need to filter before map as well
  const content = query.map((q) => <Message  author={q.author} text={q.text} date={q.createdAt}/>)

  return (
    <>
    <div>
      <button>Feature Requests</button>
      <button>Bug Reports</button>
    </div>
    <section>
      {content}
    </section>
    </>
  )
}