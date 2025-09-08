const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('open');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('open');
    });
});
// Remove .html extension from URL in browser bar
if (window.location.pathname.endsWith("index.html")) {
  const cleanPath = window.location.pathname.replace(/index\.html$/, "");
  window.history.replaceState(null, "", cleanPath);
}

if (window.location.pathname.endsWith(".html")) {
  const cleanPath = window.location.pathname.replace(/\.html$/, "");
  window.history.replaceState(null, "", cleanPath);
}





// Loan Calculator Functionality
const loanAmountSlider = document.getElementById('loan-amount');
const loanAmountOutput = document.getElementById('loan-amount-output');
const interestRateSlider = document.getElementById('interest-rate');
const interestRateOutput = document.getElementById('interest-rate-output');
const loanTenureSlider = document.getElementById('loan-tenure');
const loanTenureOutput = document.getElementById('loan-tenure-output');
const emiValue = document.getElementById('emi-value');
const totalInterest = document.getElementById('total-interest');
const totalPayment = document.getElementById('total-payment');

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

function calculateEMI() {
    const principal = parseFloat(loanAmountSlider.value);
    const interest = parseFloat(interestRateSlider.value) / 100 / 12; // Monthly interest rate
    const tenure = parseFloat(loanTenureSlider.value); // in months
    
    // EMI formula: [P x R x (1+R)^N]/[(1+R)^N-1]
    const emi = principal * interest * Math.pow(1 + interest, tenure) / (Math.pow(1 + interest, tenure) - 1);
    const total = emi * tenure;
    const interestAmount = total - principal;
    
    // Update the UI
    emiValue.textContent = formatCurrency(emi);
    totalInterest.textContent = formatCurrency(interestAmount);
    totalPayment.textContent = formatCurrency(total);
}

// Update slider values
loanAmountSlider.addEventListener('input', () => {
    loanAmountOutput.textContent = formatCurrency(loanAmountSlider.value);
    calculateEMI();
});

interestRateSlider.addEventListener('input', () => {
    interestRateOutput.textContent = interestRateSlider.value + '%';
    calculateEMI();
});

loanTenureSlider.addEventListener('input', () => {
    loanTenureOutput.textContent = loanTenureSlider.value + ' months';
    calculateEMI();
});

// Initialize calculator
calculateEMI();

// Form submission
const applicationForm = document.querySelector('.application-form');
applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your application! Our representative will contact you shortly.');
    applicationForm.reset();
});

// Loan Eligibility Form Validation
const loanEligibilityForm = document.getElementById("loanEligibilityForm");
const eligibilityError = document.getElementById("eligibility-error");

loanEligibilityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;
  eligibilityError.style.display = "none";

  loanEligibilityForm.querySelectorAll("input, select").forEach((field) => {
    if (!field.value.trim()) {
      field.style.borderColor = "red";
      isValid = false;
    } else {
      field.style.borderColor = "#ddd";
    }
  });

  if (!isValid) {
    eligibilityError.textContent = "One or more fields have an error. Please check and try again.";
    eligibilityError.style.display = "block";
    return;
  }

  alert("✅ Your eligibility details have been submitted successfully!");
  loanEligibilityForm.reset();
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("✅ Thank you for contacting us! Our team will reach out to you shortly.");
    contactForm.reset();
  });
}


// Apply Now Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const loanForm = document.getElementById('loanForm');

    loanForm.addEventListener('submit', function(e) {
        e.preventDefault(); // prevent redirect / refresh

        // Basic validation
        let isValid = true;
        const inputs = loanForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.borderColor = '#ccc';
            }
        });

        if (!isValid) {
            alert('❌ Please fill all the required fields correctly.');
            return;
        }

        // Show alert only
        alert('✅ Thank you! Your loan application has been submitted. Our representative will contact you soon.');

        // Reset form
        loanForm.reset();
    });
});
