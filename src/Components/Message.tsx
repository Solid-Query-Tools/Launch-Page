export default function Message(props) {
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
      
    </div>
  )
}