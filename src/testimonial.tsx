export default function Testimonial() {
  function submitTestimonial() {
    fetch('/testimonial', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({testimonial: "hi"}),
    });
  }

  return (
    <>
      <button onClick={() => submitTestimonial()}>Submit Testimonial</button>
    </>
  )
}