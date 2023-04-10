export default function Message(props) {
  console.log(props)
  return (
    <div class="h-10 bg-white w-4/5 text-black">
      <article>
        <span>{props.createdBy}</span>
        <span>{props.createdAt}</span>
      </article>
      
    </div>
  )
}