/**
 * Injects shared navbar/footer at parse time (sync). Edit components/*.html and refresh — no build.
 * Serve the site over HTTP (e.g. npx serve .); file:// blocks component requests.
 */
(function () {
  var script = document.currentScript
  var phase = script && script.getAttribute("data-layout-phase")
  if (!phase) return

  function siteRoot() {
    var src = (script && script.getAttribute("src")) || ""
    var needle = "assets/js/layout.js"
    var i = src.indexOf(needle)
    return i >= 0 ? src.slice(0, i) : ""
  }

  var root = siteRoot()

  function prefixSitePaths(el) {
    if (!root || !el) return
    var nodes = el.querySelectorAll("a[href], img[src]")
    for (var n = 0; n < nodes.length; n++) {
      var node = nodes[n]
      var attr = node.tagName === "A" ? "href" : "src"
      var val = node.getAttribute(attr) || ""
      if (
        !val ||
        val.indexOf("#") === 0 ||
        val.indexOf("http") === 0 ||
        val.indexOf("mailto:") === 0 ||
        val.indexOf("../") === 0 ||
        val.indexOf("/") === 0
      ) {
        continue
      }
      node.setAttribute(attr, root + val)
    }
  }

  function load(path) {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", path, false)
    try {
      xhr.send(null)
    } catch (e) {
      return ""
    }
    if (xhr.status >= 200 && xhr.status < 300) return xhr.responseText
    return ""
  }

  function activeHrefs() {
    var raw = document.body.getAttribute("data-layout-active") || ""
    return raw
      .split(",")
      .map(function (s) {
        return s.trim()
      })
      .filter(Boolean)
  }

  function escRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }

  function stripActive(html) {
    return html
      .replace(/\s+aria-current="page"/gi, "")
      .replace(/\s+w--current\b/g, "")
  }

  function applyActive(html) {
    var out = stripActive(html)
    var hrefs = activeHrefs()
    for (var i = 0; i < hrefs.length; i++) {
      var href = hrefs[i]
      var re = new RegExp(
        "(<a\\b(?=[^>]*\\bhref=\"" + escRe(href) + '\")[^>]*)(>)',
        "gi",
      )
      out = out.replace(re, function (_, attrs, end) {
        var a = attrs
        if (!/aria-current=/i.test(a)) a += ' aria-current="page"'
        if (/class="([^"]*)"/i.test(a)) {
          a = a.replace(/class="([^"]*)"/i, function (_m, cls) {
            return /\bw--current\b/.test(cls)
              ? 'class="' + cls + '"'
              : 'class="' + cls + ' w--current"'
          })
        } else {
          a += ' class="w--current"'
        }
        return a + end
      })
    }
    return out
  }

  var slot = document.querySelector('[data-layout-slot="' + phase + '"]')
  if (!slot) return

  var path
  if (phase === "navbar") {
    path = root + "components/navbar.html"
  } else if (phase === "footer") {
    var variant = document.body.getAttribute("data-layout-footer") || "primary"
    path =
      variant === "contact"
        ? root + "components/footer-contact.html"
        : root + "components/footer-primary.html"
  } else {
    return
  }

  var html = applyActive(load(path).trim())
  if (html) {
    slot.outerHTML = html
    if (phase === "navbar") {
      prefixSitePaths(document.querySelector(".navbar-container.sticky-top"))
    } else if (phase === "footer") {
      prefixSitePaths(
        document.querySelector(".site-footer-wrap") ||
          document.querySelector(".footer.bg-primary-1, .footer"),
      )
    }
  }

  if (phase === "footer") {
    var socials = document.querySelectorAll('a[data-connect^="social-"][href="#"]')
    for (var s = 0; s < socials.length; s++) {
      socials[s].addEventListener("click", function (event) {
        event.preventDefault()
      })
    }
  }

  if (phase === "navbar") {
    var drops = document.querySelectorAll(".navbar-2 .w-dropdown")
    for (var d = 0; d < drops.length; d++) {
      if (drops[d].querySelector("a.w--current")) {
        drops[d].classList.add("w--current")
      }
    }

    var bar = document.querySelector(".navbar-container.sticky-top")
    if (bar) {
      var lastY = 0
      var ticking = false
      function onScroll() {
        var y = window.pageYOffset || document.documentElement.scrollTop
        var menuOpen = document.querySelector(".w-nav-button.w--open")
        if (y > 12) bar.classList.add("is-scrolled")
        else bar.classList.remove("is-scrolled")
        if (!menuOpen && y > lastY && y > 80) bar.classList.add("is-hidden")
        else bar.classList.remove("is-hidden")
        lastY = y < 0 ? 0 : y
        ticking = false
      }
      window.addEventListener(
        "scroll",
        function () {
          if (!ticking) {
            ticking = true
            window.requestAnimationFrame(onScroll)
          }
        },
        { passive: true },
      )
      onScroll()
    }
  }
})()