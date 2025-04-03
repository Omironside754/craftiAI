// Ensure Partner Form Animations Exist Before Running
const partnerBtn = document.getElementById('partnerBtn');
const partnerForm = document.getElementById('partnerForm');

if (partnerBtn && partnerForm) {
  gsap.set('.partner-form-box', { opacity: 0, y: 20 });

  partnerBtn.addEventListener('click', function () {
    partnerForm.classList.toggle('active');
    partnerBtn.textContent = partnerForm.classList.contains('active') ? 'Hide Form' : 'Partner with us';

    gsap.to('.partner-form-box', {
      opacity: partnerForm.classList.contains('active') ? 1 : 0,
      y: partnerForm.classList.contains('active') ? 0 : 20,
      duration: 0.6,
      ease: 'power2.out',
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // EmailJS initialization
  emailjs.init('s-Hg6UjWEuKRlaghs');

  const submitBtn = document.querySelector('#contactForm button[type="submit"]');

  document.getElementById('contactForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = {
          name: this.name.value,
          email: this.email.value,
          company: this.company.value || 'Not provided',
          phone: this.phone.value || 'Not provided',
          message: this.message.value,
      };

      emailjs.send('service_96x8b1o', 'template_3ixel5d', formData)
          .then((response) => {
              submitBtn.textContent = 'Message Sent';
              submitBtn.disabled = true;

              this.reset();

              // Reset after 3 seconds
              setTimeout(() => {
                  submitBtn.textContent = 'Send Message';
                  submitBtn.disabled = false;
              }, 3000);
          }, (error) => {
              submitBtn.textContent = 'Failed! Retry';
              submitBtn.disabled = true;

              setTimeout(() => {
                  submitBtn.textContent = 'Send Message';
                  submitBtn.disabled = false;
              }, 3000);
          });
  });
});
