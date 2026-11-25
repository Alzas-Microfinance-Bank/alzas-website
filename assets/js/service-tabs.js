(function () {
  function activateTabGroup(root, tabName) {
    if (!root || !tabName) return
    var links = root.querySelectorAll(".w-tab-link")
    var panes = root.querySelectorAll(".w-tab-pane")
    for (var i = 0; i < links.length; i++) {
      var on = links[i].getAttribute("data-w-tab") === tabName
      links[i].classList.toggle("w--current", on)
      links[i].setAttribute("aria-selected", on ? "true" : "false")
      links[i].setAttribute("tabindex", on ? "0" : "-1")
    }
    for (var j = 0; j < panes.length; j++) {
      var show = panes[j].getAttribute("data-w-tab") === tabName
      panes[j].classList.toggle("w--tab-active", show)
      panes[j].style.display = show ? "block" : "none"
      panes[j].style.opacity = show ? "1" : "0"
      if (show) {
        panes[j].removeAttribute("hidden")
      } else {
        panes[j].setAttribute("hidden", "")
      }
    }
  }

  function initTabs(root) {
    if (!root || root.getAttribute("data-tabs-bound") === "true") return
    root.setAttribute("data-tabs-bound", "true")
    var links = root.querySelectorAll(".w-tab-link")
    if (!links.length) return

    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute("role", "tab")
      if (!links[i].getAttribute("href")) {
        links[i].setAttribute("href", "#")
      }
      links[i].addEventListener("click", function (e) {
        e.preventDefault()
        activateTabGroup(root, this.getAttribute("data-w-tab"))
      })
    }

    var current = root.querySelector(".w-tab-link.w--current")
    var initial =
      (current && current.getAttribute("data-w-tab")) ||
      links[0].getAttribute("data-w-tab")
    activateTabGroup(root, initial)
  }

  function boot() {
    var groups = document.querySelectorAll(".w-tabs")
    for (var g = 0; g < groups.length; g++) {
      initTabs(groups[g])
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot)
  } else {
    boot()
  }

  window.AlzasServiceTabs = { activateTabGroup: activateTabGroup }
})()