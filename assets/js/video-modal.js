(function () {
  var modal = document.querySelector("[data-video-modal]")
  var player = document.querySelector("[data-video-player]")
  var titleEl = document.querySelector("[data-video-modal-title]")
  var subtitleEl = document.querySelector("[data-video-modal-subtitle]")
  var frame = modal && modal.querySelector(".video-modal__frame")
  var loader = modal && modal.querySelector("[data-video-loader]")
  var playBtn = document.querySelector("[data-video-play]")
  var scrubBtn = document.querySelector("[data-video-scrub]")
  var progressFill = document.querySelector("[data-video-progress-fill]")
  var progressKnob = document.querySelector("[data-video-progress-knob]")
  var timeNow = document.querySelector("[data-video-time-now]")
  var timeEnd = document.querySelector("[data-video-time-end]")
  if (!modal || !player) return

  var lastFocus = null
  var closeTimer = null
  var ANIM_MS = 480

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "0:00"
    var m = Math.floor(seconds / 60)
    var s = Math.floor(seconds % 60)
    return m + ":" + (s < 10 ? "0" : "") + s
  }

  function setPlayingUi(playing) {
    if (frame) frame.classList.toggle("is-playing", playing)
    if (playBtn) {
      playBtn.setAttribute("aria-label", playing ? "Pause video" : "Play video")
    }
  }

  function setLoading(loading) {
    if (!loader || !frame) return
    if (loading) {
      loader.removeAttribute("hidden")
      frame.classList.add("is-loading")
    } else {
      loader.setAttribute("hidden", "")
      frame.classList.remove("is-loading")
    }
  }

  function updateProgress() {
    var duration = player.duration || 0
    var ratio = duration ? player.currentTime / duration : 0
    var pct = Math.min(100, Math.max(0, ratio * 100))
    if (progressFill) progressFill.style.width = pct + "%"
    if (progressKnob) progressKnob.style.left = pct + "%"
    if (timeNow) timeNow.textContent = formatTime(player.currentTime || 0)
    if (timeEnd) timeEnd.textContent = formatTime(duration)
  }

  function seekFromEvent(e) {
    if (!player.duration) return
    var track = scrubBtn.querySelector(".video-modal__scrub-track")
    if (!track) return
    var rect = track.getBoundingClientRect()
    var x = (e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX) - rect.left
    var ratio = Math.min(1, Math.max(0, x / rect.width))
    player.currentTime = ratio * player.duration
    updateProgress()
  }

  function open(src, title, subtitle) {
    if (!src) return
    if (closeTimer) {
      clearTimeout(closeTimer)
      closeTimer = null
    }
    lastFocus = document.activeElement
    setLoading(true)
    player.src = src
    player.setAttribute("title", title || "Alzas video")
    if (titleEl && title) titleEl.textContent = title
    if (subtitleEl && subtitle) subtitleEl.textContent = subtitle
    modal.removeAttribute("hidden")
    modal.setAttribute("aria-hidden", "false")
    document.body.classList.add("w-lightbox-noscroll")
    setPlayingUi(false)
    updateProgress()
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        modal.classList.add("is-open")
      })
    })
    player.play().catch(function () {
      setPlayingUi(false)
      setLoading(false)
    })
    var closeBtn = modal.querySelector(".video-modal__close")
    if (closeBtn) closeBtn.focus()
  }

  function close() {
    modal.classList.remove("is-open")
    player.pause()
    setPlayingUi(false)
    setLoading(false)
    modal.setAttribute("aria-hidden", "true")
    document.body.classList.remove("w-lightbox-noscroll")
    closeTimer = setTimeout(function () {
      player.removeAttribute("src")
      player.load()
      modal.setAttribute("hidden", "")
      closeTimer = null
    }, ANIM_MS)
    if (lastFocus && lastFocus.focus) lastFocus.focus()
    lastFocus = null
  }

  document.querySelectorAll("[data-video-src]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      open(
        trigger.getAttribute("data-video-src"),
        trigger.getAttribute("data-video-title"),
        trigger.getAttribute("data-video-subtitle")
      )
    })
  })

  modal.querySelectorAll("[data-video-close]").forEach(function (el) {
    el.addEventListener("click", close)
  })

  document.addEventListener("keydown", function (e) {
    if (modal.hasAttribute("hidden")) return
    if (e.key === "Escape") close()
  })

  if (playBtn) {
    playBtn.addEventListener("click", function () {
      if (player.paused) {
        player.play().catch(function () {})
      } else {
        player.pause()
      }
    })
  }

  player.addEventListener("play", function () {
    setPlayingUi(true)
  })
  player.addEventListener("playing", function () {
    setLoading(false)
  })
  player.addEventListener("pause", function () {
    setPlayingUi(false)
  })
  player.addEventListener("waiting", function () {
    setLoading(true)
  })
  player.addEventListener("canplay", function () {
    if (!player.paused) setLoading(false)
  })
  player.addEventListener("error", function () {
    setLoading(false)
  })
  player.addEventListener("timeupdate", updateProgress)
  player.addEventListener("loadedmetadata", updateProgress)

  if (scrubBtn) {
    scrubBtn.addEventListener("click", seekFromEvent)
    scrubBtn.addEventListener("keydown", function (e) {
      if (!player.duration) return
      if (e.key === "ArrowRight") {
        player.currentTime = Math.min(player.duration, player.currentTime + 5)
        updateProgress()
      }
      if (e.key === "ArrowLeft") {
        player.currentTime = Math.max(0, player.currentTime - 5)
        updateProgress()
      }
    })
  }

  player.addEventListener("click", function () {
    if (player.paused) {
      player.play().catch(function () {})
    } else {
      player.pause()
    }
  })
})()
