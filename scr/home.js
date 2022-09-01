function $(qry) {return document.querySelector(qry)};

document.addEventListener("scroll", () => {
    if(window.scrollY < 100) {
        requestAnimationFrame(() => {
            $("#scroll-hint").classList.remove("fade")
        })
    } else {
        requestAnimationFrame(() => {
            $("#scroll-hint").classList.add("fade")
        })
    }
})