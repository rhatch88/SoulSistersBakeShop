document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const emailInput = document.getElementById('email');
  const email = emailInput.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  emailInput.classList.remove('shake', 'invalid');
  const errorMessage = document.querySelector('.error-message');
  if (errorMessage) {
      errorMessage.remove();
  }

  if (!emailPattern.test(email)) {
      emailInput.classList.add('shake', 'invalid');
      
  
      if (!errorMessage) {
          const errorDiv = document.createElement('div');
          errorDiv.classList.add('error-message');
          errorDiv.innerText = 'Please enter a valid email address.';
          emailInput.insertAdjacentElement('afterend', errorDiv);
      }
      return;
  }

//PANTRY SUBMITS START HERE
function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://getpantry.cloud/apiv1/pantry/16cf521b-5c4d-4f8a-9dd2-0dfe851d2e89/basket/SoulSistersBakeShopForm",
      headers: {
        "Content-Type": "application/json",
      },
      data: formDataJsonString,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const formEl = document.getElementById("form");
  formEl.addEventListener("submit", handleSubmit);

  /*return (
    <div className="App">
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
        ></textarea>
        <button type="submit" className="submit">Send</button>
      </form>
    </div>
  );*/
}

App();
});