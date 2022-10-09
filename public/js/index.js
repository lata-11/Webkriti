var loader= document.querySelector(".loader");
  window.addEventListener("load", vanish);
  
  function vanish()
  {
    loader.classList.add("disppear");
  }
  
  var navButton = document.querySelector('.navigation-buttons');
  var navMenu = document.querySelector('.navigation-menu');
  var win = window;
  
  function openMenu(event) 
  {  
    navButton.classList.toggle('active');
    navMenu.classList.toggle('active');
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  
  function closeMenu(event) 
  {
    if (navButton.classList.contains('active')) 
    {
      navButton.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }
  
  navButton.addEventListener('click', openMenu, false);  
  win.addEventListener('click',closeMenu, false);


  let popup1=document.getElementById("popup1");
  function openPopup1()
  {
    popup1.classList.add("open-popup");
  }
  
  function closePopup1()
  {
    popup1.classList.remove("open-popup");
  }
  let popup2=document.getElementById("popup2");
  function openPopup2()
  {
    popup2.classList.add("open-popup");
  }
  function closePopup2()
  {
    popup2.classList.remove("open-popup");
  }
  let popup3=document.getElementById("popup3");
  function openPopup3()
  {
    popup3.classList.add("open-popup");
  }
  
  function closePopup3()
  {
    popup3.classList.remove("open-popup");
  }
  function toggle(){
    var blur=document.getElementById("blur");
    blur.classList.toggle("active");
  }
  var numPanels = $('.panel').length;

function checkZ($aPanel) {
  if ( $aPanel.hasClass('open') ) {
    $aPanel.css('z-index','1');
  } else {
    // set z-index back to original stored in data
    zIdx = $aPanel.data('zIdx');
    $aPanel.css( 'z-index', zIdx );
  }
}

for (i=0; i<(numPanels); i++  ) {
  var zIdx =  numPanels-i;
  $('.panel').eq(i).css('z-index',zIdx).data('zIdx',zIdx);
}

// when clicking the front panel add class 'open' to panel
// if clicking bacl panel, remove 'open' from panel
$('.panel').on('click', '.front, .back', function() {
  $(this).parent('.panel').toggleClass('open');
  checkZ($(this).parent('.panel'));
});

// window.addEventListener('scroll', reveal);

//     function reveal(){
//       var reveals = document.querySelectorAll('.reveal');

//       for(var i = 0; i < reveals.length; i++){

//         var windowheight = window.innerHeight;
//         var revealtop = reveals[i].getBoundingClientRect().top;
//         var revealpoint = 150;

//         if(revealtop < windowheight - revealpoint){
//           reveals[i].classList.add('active');
//         }
//         else{
//           reveals[i].classList.remove('active');
//         }
//       }
//     }

  

