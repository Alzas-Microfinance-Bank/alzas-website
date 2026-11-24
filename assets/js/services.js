(function () {
  var root = document.querySelector("[data-services]")
  if (!root) return

  var image = root.querySelector("[data-service-image]")
  var blur = root.querySelector("[data-service-image-blur]")
  var caption = root.querySelector("[data-service-caption]")
  var items = Array.prototype.slice.call(root.querySelectorAll(".service-item"))
  var visual = root.querySelector(".services-visual")
  var index = 0

  function show(i) {
    if (!items.length) return
    index = (i + items.length) % items.length
    var item = items[index]
    items.forEach(function (el) {
      el.classList.remove("is-active")
    })
    item.classList.add("is-active")
    var src = item.getAttribute("data-image")
    var title = item.querySelector("strong")
      ? item.querySelector("strong").textContent
      : "Alzas service"
    if (image && src) {
      image.src = src
      image.removeAttribute("srcset")
      image.alt = title
    }
    if (blur && src) {
      blur.src = src
      blur.removeAttribute("srcset")
    }
    if (caption && item.getAttribute("data-caption")) {
      caption.textContent = item.getAttribute("data-caption")
    }
  }

  items.forEach(function (item, i) {
    item.addEventListener("click", function () {
      show(i)
    })
  })

  var prev = root.querySelector("[data-service-prev]")
  var next = root.querySelector("[data-service-next]")
  if (prev) prev.addEventListener("click", function () { show(index - 1) })
  if (next) next.addEventListener("click", function () { show(index + 1) })

  var startX = null
  var swipeEl = visual || root
  swipeEl.addEventListener("touchstart", function (e) {
    startX = e.changedTouches[0].screenX
  }, { passive: true })
  swipeEl.addEventListener("touchend", function (e) {
    if (startX == null) return
    var dx = e.changedTouches[0].screenX - startX
    startX = null
    if (Math.abs(dx) < 40) return
    show(index + (dx < 0 ? 1 : -1))
  }, { passive: true })
})()
