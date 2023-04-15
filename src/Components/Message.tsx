import { Switch, Match, createSignal } from "solid-js";
import axios from "axios";


export default function Message(props) {

  const [comment, setComment] = createSignal('')

  const query = () => props.queryCall();

  function handleTextAreaChange(event) {
    setComment(event.target.value);
  }

  function postComment() {
    axios.put('/fb', {
      _id: props.id,
      adminResponse: comment(),
    })
      .then((response) => {
        query();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function createString(user, date) {
    let str = `Submitted by ${user} on`
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const newDate = new Date(date)
    const month = monthNames[newDate.getMonth()]
    const day = newDate.getDate()
    const year = newDate.getYear()
    str = str.concat(` ${month}`).concat(` ${day}`).concat(` 20${year.toString().slice(1)}`)
    return str
  }
  return (
    <div class="h-fit-content w-4/5 text-black border-solid border border-sky-500 mt-6 rounded-lg">
      <article class="my-3">
        <div class="flex justify-between mr-3">
          <p class="ml-4 font-bold bg-red-500 w-min px-2 py-1 text-center text-white rounded-lg text-xs">{props.type}</p>
          <span class="italic text-white text-xs">{createString(props.createdBy, props.createdAt)}</span>
        </div>

        <div class="flex flex-col justify-center items-center">
          <p class="w-2/3 text-white mt-5 text-sm">{props.message}</p>
        </div>
      </article>
      {/* Switch Match HERE */}
      <div id="commentInput" >
        <textarea class="ml-4 mb-2 w-2/3 text-black" placeholder="Admin Comment" onChange={handleTextAreaChange}></textarea>
        <button class="text-white bg-gray-800 rounded-xl p-1 ml-2" onClick={() => postComment()}>Submit</button>
      </div>

    </div>
  )
}