const myForm = document.getElementById('myForm');
const okBtn = document.getElementById('ok-btn');

myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;

    // Store original button dimensions
    const originalWidth = submitBtn.offsetWidth;
    const originalHeight = submitBtn.offsetHeight;
    const originalText = submitBtn.textContent;
    
    // Lock button size and display spinner
    submitBtn.style.width = originalWidth + 'px';
    submitBtn.style.height = originalHeight + 'px';
    submitBtn.style.display = 'flex';
    submitBtn.style.justifyContent = 'center';
    submitBtn.style.alignItems = 'center';
    submitBtn.innerHTML = '<span class="spinner"></span>';

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
        document.getElementById('message').textContent = result.message || "Submission successfull.";
        document.getElementById('overlay').style.display = 'flex';
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.style.width = '';
        submitBtn.style.height = '';
        submitBtn.style.display = '';
        submitBtn.style.justifyContent = '';
        submitBtn.style.alignItems = '';
        submitBtn.disabled = false;
    })
    .catch(err => {
        console.error(err);
        document.getElementById('message').textContent = "An error occurred. Please try again after sometime.";
        document.getElementById('overlay').style.display = 'flex';
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.style.width = '';
        submitBtn.style.height = '';
        submitBtn.style.display = '';
        submitBtn.style.justifyContent = '';
        submitBtn.style.alignItems = '';
        submitBtn.disabled = false;
    });
});

// Close modal when OK is clicked
okBtn.addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none';
    // reset form fields to initial state
    myForm.reset();
});