document.getElementById('buyBtn')?.addEventListener('click', function(e){
  e.preventDefault();
  var email = document.getElementById('email').value || '';
  var toast = document.getElementById('toast');
  if(!email || !email.includes('@')){
    toast.innerText = 'Enter a valid email to get the pack link.';
    toast.style.display = 'block';
    setTimeout(()=> toast.style.display='none',2000);
    return;
  }
  // Simulate action: in real life you'd redirect to checkout or call backend
  toast.innerText = 'Thanks — we\'ll email the pack within 24 hours.';
  toast.style.display = 'block';
  setTimeout(()=> toast.style.display='none',2000);
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click', function(e){e.preventDefault(); var t=document.querySelector(this.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth'}); })});