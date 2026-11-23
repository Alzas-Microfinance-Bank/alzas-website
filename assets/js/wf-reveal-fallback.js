/** Reveal hero copy if page interactions did not clear inline opacity: 0 */
(function () {
  function revealStuck() {
    document.querySelectorAll("[data-w-id]").forEach(function (el) {
      var s = el.getAttribute("style") || ""
      if (/opacity:\s*0\b/i.test(s) && el.style.opacity === "0") {
        el.style.opacity = "1"
      }
    })
  }
  function schedule() {
    setTimeout(revealStuck, 200)
    setTimeout(revealStuck, 2000)
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", schedule)
  } else {
    schedule()
  }
})()