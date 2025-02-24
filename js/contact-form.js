//====================================================
// Contact Form Validation
//====================================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form#cOrder');

    // Wrap form fields in containers for error handling
    form.querySelectorAll('input, select, textarea').forEach(field => {
        if (!field.parentElement.classList.contains('input-container')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'input-container';
            
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            
            field.parentNode.insertBefore(wrapper, field);
            wrapper.appendChild(errorSpan);
            wrapper.appendChild(field);
        }
    });

    form.addEventListener('submit', function(event) {
        clearAllErrors();
        let isValid = true;

        // Validate full name is entered in the correct format
        const fullName = form.querySelector('input[name="fullName"]');
        if (!fullName.value.trim()) {
            showError(fullName, 'This field is required');
            isValid = false;
        } else if (!fullName.value.trim().includes(' ')) {
            showError(fullName, 'Please enter both first and last name');
            isValid = false;
        }

        // Ensure email is entered and validate format
        const email = form.querySelector('input[name="email"]');
        const emailValue = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            showError(email, 'This field is required');
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }

        // Validate required selectable fields
        const selects = form.querySelectorAll('select[required]');
        selects.forEach(select => {
            if (!select.value) {
                showError(select, 'Please select one: if unsure, choose other');
                isValid = false;
            }
        });

        if (isValid) {
            alert('Form submitted successfully!');
        }

        if (!isValid) {
            event.preventDefault();
            alert('Please correct the errors in the form before submitting.');
        }
    });

    // Displays error messages
    function showError(element, message) {
        element.classList.add('input-error');
        
        const errorSpan = element.parentElement.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.classList.add('active');
        }
    }

    // Clears all error messages
    function clearAllErrors() {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.classList.remove('active');
        });

        const inputs = form.querySelectorAll('.input-error');
        inputs.forEach(input => input.classList.remove('input-error'));
    }
});