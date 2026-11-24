/**
 * Injects shared navbar/footer at parse time (sync). Edit components/*.html and refresh — no build.
 * Serve the site over HTTP (e.g. npx serve .); file:// blocks component requests.
 */
(function () {
  var script = document.currentScript
  var phase = script && script.getAttribute("data-layout-phase")
  if (!phase) return

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
    path = "components/navbar.html"
  } else if (phase === "footer") {
    var variant = document.body.getAttribute("data-layout-footer") || "primary"
    path =
      variant === "contact"
        ? "components/footer-contact.html"
        : "components/footer-primary.html"
  } else {
    return
  }

  var html = applyActive(load(path).trim())
  if (html) slot.outerHTML = html

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
  }
})()