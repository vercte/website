function $(qry) {return document.querySelector(qry)};

let dark_prefered = window.matchMedia("(prefers-color-scheme: dark)")
if(dark_prefered.matches) document.body.classList.add("dark")

dark_prefered.addEventListener("change", () => {
  if(dark_prefered.matches) document.body.classList.add("dark")
  else document.body.classList.remove("dark")
})

function listenAnimationOpen({animationName,target}) {
  if (animationName == "opening") {
    target.classList.remove("opening");
    target.removeEventListener("animationend", listenAnimationOpen);
  }
}

function listenAnimationClose({animationName, target}) {
  if(animationName == "closing") {
    target.classList.remove("closing");
    target.classList.add("closed");
    target.removeEventListener("animationend", listenAnimationClose);
  } 
}

var openedPage = $("#page-landing");
function openPage(page) {
  let lastOpen = openedPage

  openedPage.classList.remove("opening");
  openedPage.removeEventListener("animationend", listenAnimationOpen)
  lastOpen.classList.add("closing");
  lastOpen.addEventListener("animationend", listenAnimationClose)
  
  openedPage = $(`#page-${page}`);
  openedPage.classList.remove("closed");
  openedPage.classList.add("opening");
  openedPage.addEventListener("animationend", listenAnimationOpen)

  if(page == "landing") {
    $("#home-button").classList.add("closed")
    if($("#page-landing").classList.contains("closing")) {
      $("#page-landing").removeEventListener("animationend", listenAnimationClose);
      $("#page-landing").classList.remove("closing")
    }
  } else {
    $("#home-button").classList.remove("closed")
  }
}

$("#home-button").addEventListener("click", () => {
  openPage("landing")
})

const buttonList = $("#button-list");
for (let c of buttonList.children) {
  switch(c.getAttribute("go-to")) {
    case "bio":
      c.addEventListener("click", () => {
        openPage("bio")
      })
      break;
    case "links":
      c.addEventListener("click", () => {
        openPage("links")
      })
      break;
    case "github":
      c.addEventListener("click", () => {
        location.href = "https://github.com/lopste"
      })
      break;
  }
}

const linkButtons = $("#page-links");
for (let c of linkButtons.children) {
  if(c.getAttribute("link-to")) {
    c.addEventListener("click", () => {
      location.href = c.getAttribute("link-to")
    })
  }
}