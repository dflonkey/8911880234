let intro=document.querySelector(".intro");
let logo=document.querySelector(".logo-header",);
let loader=document.querySelector(".loader")
let LogoSpan=document.querySelectorAll(".logo");

window.addEventListener("DOMContentLoaded", ()=>{

    setTimeout(()=>{

        LogoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add("active");
                
            }, (idx+1)*400)
        });

        setTimeout(()=>{
            LogoSpan.forEach((span, idx)=>{
                setTimeout(()=>{
                    span.classList.remove("active")
                    span.classList.add("fade");
                    
                }, (idx+1)*50)
            })
        },1000)
        
        setTimeout(()=>{
            intro.style.top="-100vh"
        },1300)
    })
}
)

const darkBtn = document.querySelector('.fas');
const bodyEl = document.querySelector('body');

const darkMode = () => {
    bodyEl.classList.toggle('dark')
}

darkBtn.addEventListener('click', () => {
    
    setDarkMode = localStorage.getItem('dark');

    if(setDarkMode !== "on") {
        darkMode();
        
        setDarkMode = localStorage.setItem('dark', 'on');
    } else {
        darkMode();
        
        setDarkMode = localStorage.setItem('dark', null);
    }
});


let setDarkMode = localStorage.getItem('dark');


if(setDarkMode === 'on') {
    darkMode();
}

function showContent(contentId) {
    
    var allContent = document.querySelectorAll('.content');
    allContent.forEach(function(content) {
      content.classList.remove('active');
    });
  
   
    var selectedContent = document.getElementById(contentId + 'Content');
    selectedContent.classList.add('active');
  
  
    var sidebar = document.getElementById('sidebar');
    sidebar.style.width = '200px';
   
  }
  
  function toggleMenu() {
    var sidebar = document.getElementById('sidebar');
    var menuToggle = document.querySelector('.menu-toggle');
    if (sidebar.style.width === '200px') {
      sidebar.style.width = '0';
      menuToggle.classList.remove('open');
      document.querySelector('.main').style.marginLeft = '0'; 
    } else {
      sidebar.style.width = '200px';
      menuToggle.classList.add('open');
      document.querySelector('.main').style.marginLeft = '200px'; 
    }
  }
  
  
 
  function closePopup() {
      document.getElementById("popup").style.display = "none";
    }
  
    document.addEventListener("DOMContentLoaded", function() {
      setTimeout(function() {
        document.getElementById("popup").style.display = "block";
      }, 3000); 
  
      document.querySelector(".close-btn").addEventListener("click", closePopup);
    });

    const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["качественно.", "быстро.", "надёжно.", "дёшево."];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1000; 
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

