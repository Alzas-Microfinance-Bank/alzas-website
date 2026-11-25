/** Sets page interaction attrs on <html> before bundles run (edit PAGE_BY_FILE when you add pages). */
(function () {
  var PAGE_BY_FILE = {
  "index.html": "5f151275ece8b7ba8930f3e0",
  "landing-1.html": "5f10e810187fbc7d65b9c6e9",
  "landing-2.html": "5f10ef24989e6f8c0870d165",
  "landing-4.html": "5f20c22861c7884dafd984ac",
  "how-finance-works.html": "5f1631f4ed84afc6c2a82f4e",
  "contact-us.html": "5f177362ccb867ffc1bef417",
  "product-customers.html": "5f18dccce3b181063b59608e",
  "about.html": "5f1780a0cb62de6a7e104b8a",
  "blog.html": "5f1e0d4f912970b0378d26a4",
  "careers.html": "5f18ec29f9b7ad202b6fd20b",
  "template-changelog.html": "5f1e2dfd447e5008410b267f",
  "template-getting-started.html": "5f20c1c614644b74c8c6f68b",
  "template-licensing.html": "5f1e2e68f60f94c9945fa520",
  "template-navs-footers.html": "5f1f69f34d92bc373dcd4d5a",
  "template-style-guide.html": "5f0fa9c6e3268301aacc82a2"
}
  var SITE_ID = "5f0cefea45df2a2a5af4fa7d"
  var path = window.location.pathname || "/"
  var name =
    path === "/" || path.endsWith("/")
      ? "index.html"
      : path.split("/").pop() || "index.html"
  if (!/\.html$/i.test(name)) name = "index.html"
  var pageId = PAGE_BY_FILE[name]
  if (!pageId) return
  var root = document.documentElement
  root.setAttribute("data-wf-page", pageId)
  root.setAttribute("data-wf-site", SITE_ID)
  root.setAttribute("data-wf-domain", window.location.hostname || "localhost")
})()
