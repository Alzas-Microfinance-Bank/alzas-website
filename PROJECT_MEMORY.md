# Alzas website — project memory

Read this before every edit. Update it after every major change.

Source of truth for the business is `assets/Alzas_Microfinance_Bank_Product_Strategy.docx` (draft, 1 November 2026). Source of truth for colour tokens is `assets/Alzas Brand Colour.txt`. The public site is still the Optic Webflow HTML template being rewritten section by section.

## Brand rules

- Alzas is a **proposed** non-interest microfinance bank for Nigeria. It is not a marketplace, and it is not a licensed bank until that is true.
- Audience: households, market traders, micro and small enterprises, farmers, cooperatives, and eligible small businesses. Priority is traders, micro-enterprises, and households.
- Promise: straightforward, responsible finance for everyday needs and productive enterprise, on transparent trade, leasing, and partnership contracts, with customer trust at the centre.
- Personality: steady, plain-spoken, protective, practical.
- Contracts are not interchangeable stand-ins for an interest loan. Murabaha is a disclosed-cost sale. Ijara is a lease. Mudarabah and Musharakah share real profit and loss and are not capital-guaranteed. Qard Hasan carries no financing profit.
- Phase-one story only, and always as proposed: current account, savings, trader stock finance (Murabaha), household asset purchase (Murabaha), group accounts, simple payments where authorised. Leasing, farm finance, Salam, and investment accounts come later.
- Never imply that “Shariah-compliant” means low risk.
- Do not publish products as open. Near-term goal is understanding, trust, and a qualified conversation.

## Design rules

- One section at a time. Do not restyle neighbouring sections in the same pass.
- Keep the existing responsive grid, containers, and component classes unless a section cannot meet its job without a structural change.
- Shared chrome (`components/navbar.html`, `components/footer-primary.html`, `components/footer-contact.html`, loaded by `assets/js/layout.js`) changes only when that chrome is the section in scope.
- Do not invent ratings, logos, customer names, or photography. When a section has a proof slot, keep a **placeholder** (empty stars or the words “Customer rating”) with no score and no Trustpilot claim. Mark it `data-connect="ratings"` so a real source can be wired later.
- Template vendor pages (style guide, changelog, licensing, getting started, navs and footers) stay out of the public story. Hide them from navigation only when navigation is the section in scope.
- Pick one homepage later. `landing-1.html`, `landing-2.html`, and `landing-4.html` are spare layouts until that decision.

## Copywriting rules

- Nigerian English. Short sentences. Customer need first, then the contract name and a plain definition.
- Say total cost, ownership, and payment rhythm when a product section is written. Do not advertise a profit rate or a guaranteed return.
- Separate what is live from what is proposed. One clear licensing sentence is enough. Do not bury the human story in compliance text.
- Banned in customer-facing copy: SaaS framing (“UI kit”, “request a demo”, “get started” as if an account opens), interest-as-default, “loan” as the generic word for Murabaha or Ijara.
- Buttons match the licence gate. The live enquiry label is “Speak with Alzas.”
- “Open an account” may appear only as a **placeholder**: visible, not a working application. Use `data-connect="open-account"` and helper text such as “Available after licensing.” Do not link it to a form that pretends an account can be opened.
- Empty is better than Optic placeholder articles, fake case studies, or invented staff bios.

## Colour rules

Do not change these tokens without a stated reason.

| Token | Hex | Use |
|---|---|---|
| deep | `#142F33` | Primary actions, headers, strong text |
| teal | `#204952` | Borders, accents, secondary actions, icons |
| lightTeal | `#7DB8B8` | Soft buttons |
| paleTeal | `#E8EEEF` | Cards, quiet backgrounds |
| lime | `#A4E205` | Ghost-button text, small accents |
| limeBright | `#B2F10C` | Badges, highlights |
| amber | `#E8C36A` | Warm accent, limited |
| paleAmber | `#F5EDDC` | Warm tint, limited |
| amberDeep | `#B45309` | Warm accent text, limited |
| surface | `#F3F5F5` | Page bands |
| white / black | `#FFFFFF` / `#000000` | Base |

- Lime is a highlight, not a full field. Amber is for human moments, not for money figures.
- The live CSS stays on Optic utilities (`bg-primary-1` and related classes) until a design-system pass. Do not recolour the site during a page pass.
- On new or rewritten sections, add `data-brand="<token>"` (`deep`, `teal`, `lightTeal`, `paleTeal`, `lime`, `limeBright`, `amber`, `surface`) next to the Optic class. That attribute is the placeholder for the later colour connection. It does not change what people see now.

## Layout rules

- Preview with a local server, not `file://`.
- Page content lives in each root `*.html` file between the layout script tags.
- Preserve one H1 per page. Supporting points use H2 and H3 in document order.
- Forms keep labels, success, and error states. Do not remove a field without saying why.
- Maintain the same button, card, and section rhythm across pages once a pattern is set.

## SEO rules

- Unique title and meta description per public page, written when that page’s head is in scope.
- Use “non-interest microfinance”, “Murabaha”, “trader stock finance”, and “Nigeria” only where the sentence is accurate.
- No claim of a CBN licence until it is true.
- Real alt text on real images. No keyword stuffing.

## Technical rules

- Static HTML, no build step. Styles: `assets/css/main.css`. Behaviour: `assets/js/`.
- Edit only the files required for the section in scope.
- Do not remove functionality without recording what it was and why.
- Homepage enquiry form still uses `method="get"` and does not store submissions. A real endpoint belongs with the contact section.
- Do not commit secrets. Do not change git config. Commit only when asked.

## Decisions made

| Date | Decision | Why |
|---|---|---|
| 2026-11-23 | Strategy document outranks the README line “Alzas Marketplace”. | The README does not match the product strategy. |
| 2026-11-23 | Public site educates and invites contact. It does not simulate an open bank. | CBN and ACE gates: no product goes live before required approvals. |
| 2026-11-23 | Work section by section. Analyse, then edit only that section. | Agreed working method. |
| 2026-11-23 | Colour remap is deferred to a single design-system pass. | Brand tokens must not be applied ad hoc on one band while the rest of the page stays Optic. |
| 2026-11-23 | Homepage hero (`index.html`, first `section.bg-primary-1` only) rewritten. | First screen must state who Alzas is. |
| 2026-11-23 | Hero H1: “Straightforward finance for everyday needs and productive enterprise.” Eyebrow: “Non-interest microfinance · Nigeria.” | Positioning line from the strategy, plus the two search facts that are true. |
| 2026-11-23 | Hero button: “Request a conversation.” Checkbox explains this is not an account or financing application. Star rating replaced with a licensing notice. | “Get Started” and a fake Trustpilot score overclaim. |
| 2026-11-23 | Document `<title>` and meta description left as Optic for now. | They sit outside the hero section. |
| 2026-11-23 | Next section when asked: the band directly under the hero. | It still uses Optic product copy. |
| 2026-11-23 | Public navigation is Home, How finance works, About, Contact, and More (Stories, Learn, Careers). Button: “Request a conversation” to `product-request-demo.html`. Wordmark is the text “Alzas”. | Template landings, mega menu, and vendor docs were the Optic sitemap. Accounts and “for traders” pages do not exist yet, so they are not linked. Optic logo removed because it names the wrong brand. |
| 2026-11-23 | `landing-1.html` is the public homepage. `index.html` is the retired Optic Landing Three. | Home and the wordmark now point at `landing-1.html`. |
| 2026-11-24 | Selected nav item stays white with a light underline (`--primary-3`). The More menu gets the same underline when Stories, Learn, or Careers is current. | The old current colour matched the dark bar, so the selected item disappeared. |
| 2026-11-23 | Ratings, “Open an account,” and brand colours stay as placeholders, not live features. | `data-connect="ratings"` with no fake score. `data-connect="open-account"` visible but not an application. `data-brand` on rewritten sections so tokens can be connected later without a visual remap now. |

## Update log

- 2026-11-23: Memory created after project immersion and the homepage hero pass.
- 2026-11-23: Navbar rewritten in `components/navbar.html` only. Mobile collapse, back-to-top, and `layout.js` active-state behaviour kept.
- 2026-11-23: Placeholder rules recorded. No page markup changed in that step.
- 2026-11-24: Home points at `landing-1.html`. Selected-nav underline added. Landing 1 rewritten as the Alzas homepage, including rating, open-account, and metric placeholders. Optic video and Webflow purchase link removed from that page.
- 2026-11-24: `components/footer-primary.html` rewritten to the public links, a licensing status, and “© Alzas”. Optic columns, the Webflow credit, and the fake logo were removed.
- 2026-11-24: Placeholder contact details, marked `data-connect`: address “SHM Complex, Mabushi, Abuja”, phone `+234 813 979 4612` (`tel:+2348139794612`), and email `admin@alzas.com`. Used on both footers and the contact page details block. Mobile: contact footer already stacks to one column under 991px and centres the details. Primary footer menus stack to one column on small screens.
- 2026-11-24: Both footers include clickable social placeholders for Facebook, Instagram, X, LinkedIn, and WhatsApp. Each is `data-connect="social-…"`, `href="#"`, and does not open a profile until a real URL replaces the hash. Icons are 44px and centred on small screens.
- 2026-11-24: More menu temporarily includes Landing 2, Landing 3 (`index.html`), and Landing 4 so those layouts can be compared. Remove them when a layout is chosen.
- 2026-11-24: About page rewritten. Vision, four principles, Abuja base, and an honest path (licensing now, Murabaha first, lease and partnerships later). Fake 2018–2020 dates and the Optic video were removed.
