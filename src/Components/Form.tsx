//need to know if user is admin here 
import { createEffect, createSignal } from "solid-js"

export default function Form(props) {

  const query = () => props.queryCall();

  const [selectOption, setSelectOption] = createSignal('')
  const [formData, setFormData] = createSignal('')
  const [submitError, setSubmitError] = createSignal(false)
  const [submitSuccess, setsubmitSuccess] = createSignal(false)


  function handleSelectChange(event) {
    setSelectOption(event.target.value);
  }

  function handleTextAreaChange(event) {
    setFormData(event.target.value);
  }

  //NEED TO SET USER IN STATE AND PULL FROM THERE
  async function submitFeedback(e) {
    e.preventDefault()
    if (!selectOption() || !formData()) {
      setSubmitError(true)
      return
    }
    await fetch('/fb', {
      method: 'POST',
      body: JSON.stringify({
        type: selectOption(),
        message: formData(),
        createdBy: "Lloyd"
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        setSubmitError(false)
        setsubmitSuccess(true)}
        )
      .catch(error => console.error(error));
    query();
  }

  return (
    <div class="h-content w-4/5 text-black flex justify-center align-center">
      <form class="flex flex-col justify-center items-center flex flex-col justify-center">
      <Show when={submitError()}>
        <p class="text-red-500">Please include both a feedback type and a message to submit your feedback!</p>
      </Show>
      <Show when={submitSuccess()}>
        <p class="text-green-500">Your feedback has been successfully submitted and is awaiting admin approval!</p>
      </Show>
      <Show when={!submitSuccess()}>
        <div class="flex flex-col items-center mt-10">
          <label for="type" class="text-sm text-blue-500 font-bold">Feedback Type</ label>
          <select id="type" name="type" onChange={handleSelectChange} class="text-center w-[12em] bg-gray-800 text-white text-xs rounded-xl py-1 px-1 mt-2">
            <option disabled selected class="hidden">select an option</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Issue">Issue</option>
          </select>
        </div>
        <div class="flex flex-col items-center mt-10">
          <label for="message" class="text-sm text-blue-500 font-bold">Message</ label>
          <textarea id="message" onChange={handleTextAreaChange} maxlength="500" placeholder="Write your message here..." rows="12" cols="50" class="resize-none text-sm p-3 rounded-xl text-white bg-gray-800 mt-2 height-auto" />
        </div>
        <button class="bg-blue-500 text-white px-3 py-1 rounded-xl mt-10 text-sm ease-linear duration-100 hover:text-base" onClick={(e) => submitFeedback(e)}>Submit</button>
        </Show>
      </form>
    </div>
  )
}