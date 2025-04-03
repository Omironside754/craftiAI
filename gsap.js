// gsap.js

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const cards = document.querySelectorAll('.content.box.style2');

if (cards.length > 0) {
  if (window.innerWidth <= 768) {
    // Set mobile initial positions offscreen bottom-right
    gsap.set(cards, {
      x: "120vw",
      y: "120vh",
      opacity: 0,
      scale: 0.9,
      transformOrigin: "center center"
    });
  }
  
  else {
    gsap.set(cards, {
      x: "50vw",
      y: "50vh",
      opacity: 0,
      //rotation: 20,
      scale: 0.9,
    });
  }

  // ScrollTrigger
  ScrollTrigger.create({
    trigger: "#one",
    start: "top top",
    end: "+=300%",
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    onUpdate: (self) => animateCards(self.progress),
  });

  function animateCards(scrollProgress) {
    const totalCards = cards.length;
    const progressPerCard = 1 / totalCards;

    
    let baseXStart = "150vw";
    let baseXIncrement = 150;
    if (window.innerWidth < 768) {
      baseXStart = "120vw";
      baseXIncrement = 15;
    }

    cards.forEach((card, index) => {
      const startProgress = index * progressPerCard;
      const endProgress = (index + 1) * progressPerCard;
      let progress = (scrollProgress - startProgress) / (endProgress - startProgress);
      progress = Math.min(Math.max(progress, 0), 1);


      if (window.innerWidth <= 768) {
        gsap.to(card, {
          y: gsap.utils.interpolate("120vh", "0px", progress),
          x: gsap.utils.interpolate("120vw", "20vh", progress), // Change from "20vw" or "140px" to "50%"
          opacity: 1,
          scale: gsap.utils.interpolate(0.9, 1, progress),
          zIndex: index,
          ease: "power4.out",
          duration: 0.5,
          // Add the following to center the card
          xPercent: -70 // This shifts it back by 50% of its own width to center it
        });
      }
      else {
        gsap.to(card, {
          y: gsap.utils.interpolate("90vh", index * 80, progress),
          x: gsap.utils.interpolate(baseXStart, index * baseXIncrement, progress),
          opacity: 1,
          scale: gsap.utils.interpolate(0.9, 1, progress),
          rotation: gsap.utils.interpolate(20, 0, progress),
          zIndex: index,
          ease: "power4.out",
          duration: 0.5,
        });
      }
    });
  }



  // Hover effect for each card
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.1,
        zIndex: 100,
        boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.6)",
        duration: 0.3,
        ease: "power2.out"
      });
      cards.forEach((otherCard) => {
        if (otherCard !== card) {
          gsap.to(otherCard, { opacity: 0.6, duration: 0.3, ease: "power2.out" });
        }
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        zIndex: 1,
        boxShadow: "0px 25px 25px rgba(0, 0, 0, 0.2)",
        duration: 0.3,
        ease: "power2.inOut"
      });
      cards.forEach((otherCard) => {
        if (otherCard !== card) {
          gsap.to(otherCard, { opacity: 1, duration: 0.3, ease: "power2.inOut" });
        }
      });
    });
  });

  // Reset positions on refresh
  window.addEventListener('beforeunload', () => {
    gsap.set(cards, {
      x: "120vw",
      y: "120vh",
      opacity: 0,
      scale: 0.9,
      rotation: 20,
    });
  });

  // Refresh ScrollTrigger on load
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
}



// Add event listeners to all capability cards
document.addEventListener('DOMContentLoaded', function () {
  // Map card IDs to capability page IDs
  const cardMappings = {
    'c1': 'edge-ai',
    'c2': 'product-design',
    'c3': 'embedded-system',
    'c4': 'fpga-design',
    'c5': 'manufacturing',
    'c6': 'inventory',
    'c7': 'quality-assurance'
  };

  // Add click event to each card
  document.querySelectorAll('#card-container .content.box').forEach(card => {
    card.addEventListener('click', function () {
      const cardId = this.id;
      if (cardMappings[cardId]) {
        window.location.href = `capabilities.html#${cardMappings[cardId]}`; 
      }
    });

    // Add cursor pointer to indicate clickable element
    card.style.cursor = 'pointer';
  });
});

// Add click event to Industries cards
document.querySelectorAll('.industry-card').forEach(card => {
  card.addEventListener('click', function () {
    const industryId = this.getAttribute('data-industry');
    if (industryId) {
      window.location.href = `industries.html#${industryId}`; 
    }
  });

  // Add cursor pointer to indicate clickable element
  card.style.cursor = 'pointer';
});



// Ensure Products Hover Effect Exists Before Running
document.addEventListener("DOMContentLoaded", function () {
  const products = document.querySelectorAll(".product");
  products.forEach((product) => {
    product.addEventListener("mouseenter", function () {
      products.forEach((p) => p.classList.remove("active"));
      this.classList.add("active");
    });
  });
});



// Reveal animations for the About section
gsap.utils.toArray(".reveal").forEach((element) => {
  gsap.fromTo(element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 80%", toggleActions: "play none none none" } }
  );
});