const myForm = document.getElementById('myForm');
const okBtn = document.getElementById('ok-btn');

myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;

    // Collect form data as JSON
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Send to backend which will save to DB and forward to Google Form
    fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        document.getElementById('message').textContent = result.message;
        document.getElementById('overlay').style.display = 'flex';
    })
    .catch(err => {
        console.error(err);
        document.getElementById('message').textContent = "An error occurred. Please try again after sometime.";
        document.getElementById('overlay').style.display = 'flex';
    })
    .finally(() => {
        submitBtn.disabled = false;
    });
});

// Close modal when OK is clicked
okBtn.addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none';
    // reset form fields to initial state
    myForm.reset();
});