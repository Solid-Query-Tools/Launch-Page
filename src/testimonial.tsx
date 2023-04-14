import { createSignal, createEffect } from "solid-js";



export default function Testimonial() {

  const testimonialArray: string[] = ['This is the first testimonial yay!', 'Solid Query Devtools are like, the greatest', 'I cannot believe this didn\'t exist before', 'Yas SQD, it sounds like Squid! Yummy!', 'Damn these devtools are straight fire', 'OMG THIS DEVTOOL IS AMAZE. SO WOW. MUCH DEVTOOL']

  const [comment, setComment] = createSignal('');
  const [index, setIndex] = createSignal(0);
  const [currentTestimonial, setCurrentTestimonial] = createSignal(0);
  const length: number = testimonialArray.length;


  const Carousel = () => {
    return (
      <section id="slider" >
        {/*START HERE*/}
        <button>Previous Testimonial</button>
        <button>Next Testimonial</button>
        {testimonialArray.map((comment, index) => {
          return (
            <div id="singleTestimonial">{comment}</div>
          )
        })}
      </section>
    )
  }


  function submitTestimonial() {
    fetch('/testimonial', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ testimonial: "hi" }),
    });
  }

  function changeTestimonial() {
    if (index() === 5) {
      setIndex(0);
      return;
    }
    setIndex(index() + 1);
  }

  createEffect(() => {
    console.log('This is the index', index())
  })

  return (
    <>
      <div class="w-screen flex flex-col items-center">
        <h1>Testimonials</h1>
      </div>
      <div class="w-screen flex flex-col items-center mt-10">
        <div class="bg-red-600 h-64 flex items-center">{testimonialArray[index()]}</div>
        <button class="bg-sky-400 rounded-md px-8" onClick={() => changeTestimonial()}>Next</button>
      </div>

      {/* <Carousel /> */}

      <form class="flex flex-col">
        <br></br>
        <h2>Submit Your Own:</h2>
        <input
          type="text"
          placeholder="Write your comment here!"
        />
        <input
          type="text"
          placeholder="Your Name"
        />
        <input
          type="text"
          placeholder="Your Profession"
        />
        <button type="submit">Submit</button>
      </form>

    </>
  )
}