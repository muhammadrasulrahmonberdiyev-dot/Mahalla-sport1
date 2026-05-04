// ======= NAVBAR Drawer (responsive) =======
const menuBtn = document.getElementById('menuBtn');
const navbarMenu = document.getElementById('navbarMenu');
menuBtn.addEventListener('click', ()=>{
  navbarMenu.classList.toggle('open');
  menuBtn.classList.toggle('open');
});
document.querySelectorAll('.nav__link').forEach(link=>{
  link.addEventListener('click',()=>{ if(window.innerWidth<770) navbarMenu.classList.remove('open'); });
});

// ======= SCROLL ACTIVE NAV ========
window.addEventListener('scroll', ()=>{
  let scrollPos = window.scrollY + 80;
  const links = document.querySelectorAll('.nav__link');
  links.forEach(lnk=>lnk.classList.remove('active'));
  document.querySelectorAll('section').forEach(sec=>{
    if(scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop+sec.offsetHeight){
      let id = sec.getAttribute('id');
      links.forEach(lnk=>{ if(lnk.getAttribute('href')==='#'+id) lnk.classList.add('active'); })
    }
  });
});

// ======= SMOOTH SCROLL (for anchor) =======
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',function(e){
    const target = document.querySelector(this.hash);
    if(target){
      e.preventDefault();
      window.scrollTo({top: target.offsetTop-65, behavior:'smooth'});
    }
  });
});

// ======= GROWING STATISTICS NUMBER (on scroll) =======
function animateNumber(el, end){
  let start = 0;
  const inc = Math.ceil(end/47);
  function step(){
    start += inc; if(start>end)start=end;
    el.textContent = start;
    if(start<end) requestAnimationFrame(step);
  }
  step();
}

function statsObserverCallback(entries, observer){
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      document.querySelectorAll('[data-animate-number]').forEach(stat=>{
        let val = parseInt(stat.dataset.animateNumber); if(!stat.classList.contains('animated')){
          animateNumber(stat, val); stat.classList.add('animated');
        }
      });
      observer.disconnect();
    }
  });
}
const observer = new IntersectionObserver(statsObserverCallback, {threshold:.46});
const analyticsBlock = document.querySelector('.analytics__block');
if(analyticsBlock) observer.observe(analyticsBlock);

// ======= PARTNERS/CAROUSEL auto-scroll =======
const partnersCarousel = document.getElementById('partnersCarousel');
if(partnersCarousel){
  let scrollAmount = 0;
  setInterval(()=>{
    scrollAmount += 1;
    if(scrollAmount > partnersCarousel.scrollWidth-partnersCarousel.offsetWidth) scrollAmount = 0;
    partnersCarousel.scrollTo({left: scrollAmount, behavior:'smooth'});
  }, 54);
}

// ======= TESTIMONIALS CAROUSEL (swipe/auto) =======
const testimonialCarousel = document.getElementById('testimonialCarousel');
if(testimonialCarousel){
  let shift = 0, max = testimonialCarousel.scrollWidth - testimonialCarousel.offsetWidth;
  setInterval(()=>{ shift+=355; if(shift>max) shift=0; testimonialCarousel.scrollTo({left:shift,behavior:'smooth'}); },4000);
  // for mobile: swipe interactive
  let pointerStart = null;
  testimonialCarousel.addEventListener('pointerdown',e=>pointerStart=e.clientX);
  testimonialCarousel.addEventListener('pointerup',e=>{
    if(pointerStart!==null){
      if(e.clientX-pointerStart<-30) testimonialCarousel.scrollBy({left:340,behavior:'smooth'});
      else if(e.clientX-pointerStart>30) testimonialCarousel.scrollBy({left:-340,behavior:'smooth'});
      pointerStart=null;
    }
  });
}

// ======= Contact Form validation =======
const form = document.getElementById('contactForm'), formStatus = document.getElementById('formStatus');
if(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();
    let valid = true;
    ['contactName','contactEmail','contactMsg'].forEach(id=>{
      const input = document.getElementById(id), err = input.nextElementSibling;
      if(!input.value.trim() || (id==='contactEmail' && !/^\S+@\S+\.\S+$/.test(input.value))){
        err.textContent = id==='contactEmail' ? "Email xato." : "Maydon to‘ldirilishi shart.";
        err.style.display = 'block'; input.style.borderColor='#e62440'; valid=false;
      } else { err.textContent=''; err.style.display='none'; input.style.borderColor='#21c29b';}
    });
    if(valid){
      formStatus.textContent = "Xabaringiz muvaffaqiyatli yuborildi! Sizga tez orada javob beramiz.";
      formStatus.style.color = "#21c29b";
      form.reset();
      setTimeout(()=>formStatus.textContent='',4000);
    } else {
      formStatus.textContent = "Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring.";
      formStatus.style.color="#e62440";
    }
  });
}

// ======= Accessibility: esc closes navbar =======
document.addEventListener('keydown',e=>{
  if(e.key==='Escape' && navbarMenu.classList.contains('open'))navbarMenu.classList.remove('open');
});
