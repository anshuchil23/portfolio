var work = document.querySelector(".work-categories");
var content = document.querySelector(".content");

// window.addEventListener(
//     "scroll",
//     () => {
//       content.setProperty(
//         "--scroll",
//         content.pageYOffset / (work.offsetHeight - content.innerHeight)
//       );        
//     },
//     false
//   );

window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
  }, false);

  