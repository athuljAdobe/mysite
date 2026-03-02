export default function decorate(block) {
  block.innerHTML = `
    <form class="contact-form">
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <textarea name="message" placeholder="Message"></textarea>
      <button type="submit">Submit</button>
      <p class="form-status"></p>
    </form>
  `;

  const form = block.querySelector('.contact-form');
  const status = block.querySelector('.form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    status.textContent = "Submitting...";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbx1aspeq8iGVVZjXxxc9g0ZsNR61pxigpoZg54ZRYiemlgw10Bc3EykYTVqV5p3LjGn/exec", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        status.textContent = "Submitted successfully!";
        form.reset();
      } else {
        status.textContent = "Submission failed.";
      }
    } catch (error) {
      status.textContent = "Error occurred.";
      console.error(error);
    }
  });
}