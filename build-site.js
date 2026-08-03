const fs = require("fs");
const path = require("path");

const root = process.cwd();
const WEBINAR_URL = "https://lp.platformofpapas.com/webinar-registration-lp-page";
const TRANSFORMATION_URL = "https://lp.platformofpapas.com/fatherhood-transformation-program";
const LEGAL_EFFECTIVE_DATE = "10 July 2026";

const pages = {
  home: {
    out: "index.html",
    route: "/",
    nav: "home",
    title: "Platform of Papas - Self-Leadership for Fathers",
    description:
      "Self-leadership for fathers who want clearer decisions, emotional strength, authentic confidence, powerful presence, and meaningful direction.",
    body: homePage(),
  },
  about: {
    out: "about/index.html",
    route: "/about/",
    nav: "about",
    title: "About Vishal Kumar Singh - Platform of Papas",
    description:
      "Vishal Kumar Singh's journey from externally driven success to self-awareness, authentic confidence, and intentional living.",
    body: aboutPage(),
  },
  approach: {
    out: "approach/index.html",
    route: "/approach/",
    nav: "learn",
    title: "The Approach - Platform of Papas",
    description:
      "Learn the practical self-leadership skills that help fathers think clearly, regulate emotions, trust decisions, and live intentionally.",
    body: approachPage(),
  },
  stories: {
    out: "stories/index.html",
    route: "/stories/",
    nav: "learn",
    title: "Stories & Results - Self-Leadership for Fathers",
    description:
      "Real reflections from fathers developing greater self-awareness, clarity, confidence, presence, and personal direction.",
    body: storiesPage(),
  },
  newsletter: {
    out: "newsletter/index.html",
    route: "/newsletter/",
    nav: "learn",
    title: "The Papas Letter - Weekly Self-Leadership for Fathers",
    description:
      "One grounded self-leadership insight every Sunday for fathers building clarity, confidence, presence, and purpose.",
    body: newsletterPage(),
  },
  contact: {
    out: "contact/index.html",
    route: "/contact/",
    nav: "about",
    title: "Contact - Platform of Papas",
    description:
      "Contact Platform of Papas about self-leadership programmes, the webinar, partnerships, and other enquiries.",
    body: contactPage(),
    scripts: '<script src="https://link.msgsndr.com/js/form_embed.js"></script>',
  },
  privacy: {
    out: "privacy/index.html",
    route: "/privacy/",
    nav: "",
    title: "Privacy Policy - Platform of Papas",
    description:
      "How Platform of Papas collects, uses, stores, and protects personal data in connection with its website and digital programmes.",
    body: privacyPage(),
  },
  terms: {
    out: "terms/index.html",
    route: "/terms/",
    nav: "",
    title: "Terms and Conditions - Platform of Papas",
    description:
      "Terms governing use of the Platform of Papas website, digital products, coaching, consulting, and training programmes.",
    body: termsPage(),
  },
  refund: {
    out: "refund-policy/index.html",
    route: "/refund-policy/",
    nav: "",
    title: "Refund and Return Policy - Platform of Papas",
    description:
      "Refund terms for Platform of Papas digital coaching, consulting, training programmes, and digital products.",
    body: refundPage(),
  },
  challenge: {
    out: "challenge/index.html",
    route: "/challenge/",
    nav: "programs",
    title: "21 Day Connected Father Challenge - Platform of Papas",
    description: "The 21 Day Connected Father Challenge is not currently open for enrolment.",
    noindex: true,
    body: offerShell({
      eyebrow: "Enrollment currently closed",
      title: "21 Day Connected Father Challenge",
      copy: "This programme is not currently open. Explore the live webinar, recorded course, or free eBook to begin your self-leadership journey.",
    }),
  },
  catalyst: {
    out: "catalyst/index.html",
    route: "/catalyst/",
    nav: "programs",
    title: "Fatherhood Transformation Program - Self-Leadership for Fathers",
    description: "A recorded, self-paced programme for fathers building clarity, emotional strength, confidence, presence, and direction.",
    body: offerShell({
      eyebrow: "Recorded course",
      title: "Fatherhood Transformation Program",
      copy: "Develop the practical skills to lead your inner world, trust your decisions, communicate consciously, and create a more authentic and intentional life.",
      cta: "Explore the Recorded Course",
      href: TRANSFORMATION_URL,
    }),
  },
  webinar: {
    out: "webinar/index.html",
    route: "/webinar/",
    nav: "programs",
    title: "Conscious Fatherhood Webinar - Self-Leadership for Fathers",
    description: "A live introduction to self-leadership for fathers who want greater clarity, confidence, presence, and purpose.",
    body: offerShell({
      eyebrow: "Live every Saturday",
      title: "Conscious Fatherhood Webinar",
      copy: "Discover why responsibility alone does not create self-leadership - and learn how to meet pressure with greater awareness, clarity, and choice.",
      cta: "Join the Webinar",
      href: WEBINAR_URL,
    }),
  },
  ebook: {
    out: "ebook/index.html",
    route: "/ebook/",
    nav: "programs",
    title: "Free Self-Leadership eBook for Fathers - Platform of Papas",
    description: "A practical introduction to self-leadership for fathers who want to live with greater clarity, confidence, presence, and intention.",
    body: offerShell({
      eyebrow: "Free resource",
      title: "Begin with self-leadership",
      copy: "The free eBook introduces the inner skills that help you understand your patterns, choose your response, and create a life that reflects who you truly are.",
    }),
  },
  consultation: {
    out: "consultation/index.html",
    route: "/consultation/",
    nav: "",
    title: "1-1 Consultation - Platform of Papas",
    description: "A private self-leadership consultation with Platform of Papas.",
    noindex: true,
    body: offerShell({
      eyebrow: "Private session",
      title: "1-1 Consultation",
      copy: "A focused conversation about the patterns, pressure, decisions, and direction shaping your life right now.",
      cta: "Contact Us",
      href: "/contact/",
    }),
  },
};

for (const page of Object.values(pages)) {
  const target = path.join(root, page.out);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, renderPage(page));
}

function renderPage(page) {
  const depth = page.out.includes("/") ? "../" : "";
  const ctaText = "Join the Webinar";
  const ctaHref = WEBINAR_URL;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${page.noindex ? '<meta name="robots" content="noindex, nofollow">' : ""}
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:image" content="/assets/og-image.svg">
  <meta property="og:url" content="${page.route}">
  <meta property="og:type" content="website">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="${depth}assets/site.css?v=20260803a">
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
  ${nav(page.nav, ctaText, ctaHref)}
  <main id="main-content">
${page.body}
  </main>
  ${footer()}
${page.scripts ? `  ${page.scripts}\n` : ""}  <script src="${depth}assets/site.js?v=20260710b"></script>
</body>
</html>
`;

  return localizeInternalUrls(openOfferLinksInNewTab(html), depth || "./");
}

function openOfferLinksInNewTab(html) {
  return [WEBINAR_URL, TRANSFORMATION_URL].reduce(
    (output, url) =>
      output.replaceAll(
        `href="${url}"`,
        `href="${url}" target="_blank" rel="noopener noreferrer"`
      ),
    html
  );
}

function localizeInternalUrls(html, rootPrefix) {
  return html
    .replace(/href="\/([^"]*)"/g, (_match, target) => {
      if (!target) return `href="${rootPrefix}index.html"`;
      if (target.startsWith("#")) return `href="${rootPrefix}index.html${target}"`;
      if (target.endsWith("/")) return `href="${rootPrefix}${target}index.html"`;
      return `href="${rootPrefix}${target}"`;
    })
    .replace(/src="\//g, `src="${rootPrefix}`)
    .replace(/content="\/(assets|Images)\//g, `content="${rootPrefix}$1/`);
}

function nav(active, ctaText, ctaHref) {
  return `<header class="site-header" data-site-header>
  <div class="container nav-inner">
    <a class="brand" href="/" aria-label="Platform of Papas home">
      <span class="brand-mark-wrap" aria-hidden="true"><img class="brand-mark" src="/Images/pops-logo-cropped.png" alt=""></span>
      <span class="brand-copy"><span class="brand-text">Platform of Papas</span><span class="brand-tagline">Self-leadership for fathers.</span></span>
    </a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      <a class="nav-link ${active === "home" ? "is-active" : ""}" href="/">Home</a>
      ${dropdown(
        "Programs",
        "programs",
        active === "programs",
        [
          { label: "Paid Programmes", type: "label" },
          { label: "Fatherhood Transformation Program", href: TRANSFORMATION_URL },
          { label: "Conscious Fatherhood Webinar", href: WEBINAR_URL },
          { label: "Free Resource", type: "label" },
          { label: "Free eBook", href: "/ebook/" },
        ],
        280
      )}
      ${dropdown(
        "Learn",
        "learn",
        active === "learn",
        [
          { label: "The Approach", href: "/approach/" },
          { label: "Stories & Results", href: "/stories/" },
          { label: "The Papas Letter", href: "/newsletter/" },
        ],
        240
      )}
      ${dropdown(
        "About",
        "about",
        active === "about",
        [
          { label: "About Vishal", href: "/about/" },
          { label: "Contact", href: "/contact/" },
        ],
        200
      )}
    </nav>
    <a class="nav-cta" href="${ctaHref}">${ctaText}</a>
    <button class="mobile-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="mobile-nav" data-mobile-toggle>
      <span></span><span></span><span></span>
    </button>
  </div>
  <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" data-mobile-nav>
    <a class="${active === "home" ? "is-active" : ""}" href="/">Home</a>
    <div class="mobile-label">Programmes</div>
    <a href="${TRANSFORMATION_URL}">Fatherhood Transformation Program</a>
    <a href="${WEBINAR_URL}">Conscious Fatherhood Webinar</a>
    <a href="/ebook/">Free eBook</a>
    <div class="mobile-label">Learn</div>
    <a href="/approach/">The Approach</a>
    <a href="/stories/">Stories & Results</a>
    <a href="/newsletter/">The Papas Letter</a>
    <div class="mobile-label">About</div>
    <a href="/about/">About Vishal</a>
    <a href="/contact/">Contact</a>
    <a class="btn-primary mobile-cta" href="${ctaHref}">${ctaText}</a>
  </nav>
</header>`;
}

function dropdown(label, id, isActive, items, width) {
  return `<div class="dropdown ${isActive ? "is-active" : ""}" data-dropdown style="--panel-width:${width}px">
    <button class="dropdown-trigger" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="dropdown-${id}" data-dropdown-trigger>${label}<span class="chevron" aria-hidden="true"></span></button>
    <ul class="dropdown-panel" id="dropdown-${id}" role="menu">
      ${items
        .map((item) =>
          item.type === "label"
            ? `<li class="dropdown-label">${item.label}</li>`
            : `<li role="none"><a role="menuitem" href="${item.href}">${item.label}</a></li>`
        )
        .join("")}
    </ul>
  </div>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <h2>PLATFORM OF PAPAS</h2>
        <p>Self-leadership for fathers. Awaken the leader in you.</p>
        <div class="socials" aria-label="Social links">
          <a href="https://www.instagram.com/platformofpapas" target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98C23.986 15.668 24 15.259 24 12s-.014-3.667-.072-4.947C23.732 2.699 21.311.272 16.949.072 15.668.014 15.259 0 12 0zm0 5.838A6.162 6.162 0 1 0 12 18.162 6.162 6.162 0 0 0 12 5.838zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/platform-of-papas/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://www.youtube.com/@PlatformOfPapas" target="_blank" rel="noopener noreferrer" aria-label="YouTube (opens in a new tab)">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
      <a class="btn-primary" href="${WEBINAR_URL}">Join the Webinar</a>
    </div>
    <div class="footer-links">
      <div>
        <h3>Programs</h3>
        <a href="${TRANSFORMATION_URL}">Recorded Course</a>
        <a href="${WEBINAR_URL}">Live Webinar</a>
        <a href="/ebook/">Free eBook</a>
      </div>
      <div>
        <h3>Resources</h3>
        <a href="/approach/">The Approach</a>
        <a href="/stories/">Stories & Results</a>
        <a href="/newsletter/">The Papas Letter</a>
      </div>
      <div>
        <h3>Company</h3>
        <a href="/about/">About Vishal</a>
        <a href="/contact/">Contact</a>
      </div>
      <div>
        <h3>Legal</h3>
        <a href="/privacy/">Privacy Policy</a>
        <a href="/terms/">Terms &amp; Conditions</a>
        <a href="/refund-policy/">Refund &amp; Return Policy</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 Platform of Papas. Built by ASR Media Pro.</span>
      <a href="#main-content">Back to top &uarr;</a>
    </div>
  </div>
</footer>`;
}

function hero({ eyebrow, title, copy, image, imageAlt = "", center = false, wide = false, actions = "" }) {
  const hasImage = Boolean(image);
  return `<section class="hero ${center ? "center" : ""} ${hasImage ? "with-image" : ""}">
  <div class="container ${hasImage ? "hero-grid" : ""}">
    <div class="hero-copy reveal">
${eyebrow ? `      <span class="eyebrow">${eyebrow}</span>\n` : ""}      <h1>${title}</h1>
${copy ? `      <p>${copy}</p>\n` : ""}${actions ? `      <div class="hero-actions">${actions}</div>\n` : ""}    </div>
${hasImage ? `    <div class="hero-media ${wide ? "wide" : ""} reveal"><img src="${image}" alt="${imageAlt}"></div>\n` : ""}  </div>
</section>`;
}

function button(label, href, kind = "primary") {
  return `<a class="btn-${kind}" href="${href}">${label}</a>`;
}

function section({ cls = "", eyebrow = "", title = "", intro = "", content = "", center = false }) {
  return `<section class="section ${cls} ${center ? "center" : ""}">
  <div class="container">
${eyebrow ? `    <span class="eyebrow reveal">${eyebrow}</span>\n` : ""}${title ? `    <h2 class="reveal">${title}</h2>\n` : ""}${intro ? `    <p class="lead prose reveal">${intro}</p>\n` : ""}${content ? `    ${content}\n` : ""}  </div>
</section>`;
}

function proofBar(items) {
  return `<section class="proof-bar" aria-label="Platform of Papas proof points">
  <div class="container proof-bar-inner">
    ${items
      .map(
        ([num, suffix, label]) =>
          `<div class="proof-item reveal"><strong data-count-to="${num}" data-count-suffix="${suffix}">${num}${suffix}</strong><span>${label}</span></div>`
      )
      .join("")}
  </div>
</section>`;
}

function programCards() {
  const cards = [
    ["LIVE EVERY SATURDAY", "Conscious Fatherhood Webinar", "A live introduction to self-leadership for fathers. Understand the inner skills that help you meet pressure with clarity, awareness, and choice.", "Live session", "Join the Webinar", WEBINAR_URL],
    ["RECORDED COURSE", "Fatherhood Transformation Program", "Build self-awareness, emotional regulation, authentic confidence, conscious communication, and meaningful direction at your own pace.", "Self-paced", "Explore the Course", TRANSFORMATION_URL],
    ["FREE RESOURCE", "Free eBook", "A practical first step for the father who wants to understand his patterns, trust himself more deeply, and live with greater intention.", "Free", "Get the Free eBook", "/ebook/"],
  ];
  return `<div class="program-grid">${cards
    .map(
      ([tag, title, copy, price, cta, href]) => `<article class="program-card reveal">
        <span class="tag ${tag === "FREE" ? "gold" : ""}">${tag}</span>
        <h3>${title}</h3>
        <p>${copy}</p>
        <div class="price">${price}</div>
        ${button(cta, href)}
      </article>`
    )
    .join("")}</div>`;
}

function testimonialsGrid(two = false) {
  const items = [
    ["Harsh Gurung", "These questions made me more mindful and self-aware. I now see my patterns clearly - especially where I was depending on external validation. Now I have clarity and direction."],
    ["Manoj Thakur", "I feel more in control now. Not because things changed outside - but because I have more clarity within."],
    ["Platform of Papas Participant", "I am more determined and focused. I have created positive references in my mind. Now nothing feels impossible."],
  ];
  return `<div class="testimonial-grid ${two ? "two" : ""}">${items
    .map((item) => testimonial(item[0], item[1]))
    .join("")}</div>`;
}

function testimonial(name, quote) {
  return `<article class="testimonial-card reveal">
    <blockquote>
      <div class="testimonial-stars" aria-label="Five stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <p class="testimonial-quote">"${quote}"</p>
      <cite class="testimonial-name">${name}</cite>
    </blockquote>
  </article>`;
}

function newsletterStrip() {
  return `<section class="newsletter-strip">
  <div class="container">
    <h2 class="reveal">The Papas Letter</h2>
    <p class="reveal">One grounded insight on clarity, confidence, presence, and intentional living every Sunday.</p>
    <button class="btn-primary newsletter-modal-cta reveal" type="button" data-modal-open aria-haspopup="dialog" aria-controls="ghlModal">Join The Papas Letter</button>
    <p class="newsletter-privacy reveal">No spam. No sales. Unsubscribe anytime.</p>
  </div>
</section>`;
}

function homePage() {
  return `${hero({
    eyebrow: "Self-leadership for fathers",
    title: "Awaken the leader in you.",
    copy:
      "Learn to lead yourself - so you can take back control of your inner world, step into your power, and become the man you know you are capable of becoming.",
    image: "/Images/pops-hero-family-generated.png",
    imageAlt: "A father sharing a present moment with his child",
    wide: true,
    actions: `${button("Join the Webinar", WEBINAR_URL)} ${button("Explore the Programs", "#programs", "secondary")}`,
  })}
  ${proofBar([
    [100, "+", "Fathers supported"],
    [9, "", "Practical self-leadership skills"],
    [3, "", "Ways to begin"],
    [1, "", "Life - consciously led"],
  ])}
  ${section({
    title: "You can be responsible and still live reactively.",
    content: `<div class="two-col">
      <div class="prose reveal">
        <p>You meet your obligations. You keep moving. You handle what needs to be handled. Yet your mind may never completely switch off, important decisions become exhausting, and the rhythm of your life is shaped by urgency rather than intention.</p>
        <p>External capability does not automatically create internal direction. Responsibility alone does not teach you how to regulate pressure, trust yourself, or choose the life you genuinely want.</p>
      </div>
      <div class="prose reveal">
        <ul class="truth-list">
          <li><span class="list-icon">&bull;</span><span>Your mind keeps replaying conversations and possible outcomes.</span></li>
          <li><span class="list-icon">&bull;</span><span>You wait for certainty before making decisions that matter.</span></li>
          <li><span class="list-icon">&bull;</span><span>Pressure appears as irritation, withdrawal, overthinking, or emotional shutdown.</span></li>
          <li><span class="list-icon">&bull;</span><span>You are active throughout the day, but not always present in your own life.</span></li>
        </ul>
      </div>
    </div>
    <blockquote class="pullquote reveal">A more powerful life begins when a man learns to lead himself.</blockquote>`,
  })}
  ${section({
    cls: "tint",
    title: "Not parenting advice. Self-leadership.",
    intro:
      "Platform of Papas is a practical self-leadership system created specifically for men who are also fathers.",
    content: `<div class="two-col">
      <div class="contrast-card reveal">
        <h3>NOT this</h3>
        <ul class="check-list">
          <li><span class="list-icon no">x</span><span>Parenting tips or marriage counselling</span></li>
          <li><span class="list-icon no">x</span><span>Motivation, productivity coaching, or corporate leadership training</span></li>
          <li><span class="list-icon no">x</span><span>A louder, harder, or more dominant personality</span></li>
          <li><span class="list-icon no">x</span><span>Control over your spouse, children, or anyone around you</span></li>
        </ul>
      </div>
      <div class="contrast-card reveal">
        <h3>THIS work</h3>
        <ul class="check-list">
          <li><span class="list-icon">&#10003;</span><span>Self-awareness and emotional regulation under pressure</span></li>
          <li><span class="list-icon">&#10003;</span><span>Clear decisions built on values and self-trust</span></li>
          <li><span class="list-icon">&#10003;</span><span>Conscious communication, boundaries, and courageous action</span></li>
          <li><span class="list-icon">&#10003;</span><span>Authenticity, purpose, and a life created intentionally</span></li>
        </ul>
      </div>
    </div>`,
  })}
  ${section({
    cls: "",
    eyebrow: "Find your starting point",
    title: "Start where you are. Build the capacity to go further.",
    content: `<div id="programs">${programCards()}</div>`,
  })}
  ${section({
    cls: "dark",
    content: `<div class="about-teaser">
      <div class="image-panel reveal"><img src="/Images/DSC_6630.jpg" alt="Vishal Kumar Singh, founder of Platform of Papas"></div>
      <div class="reveal">
        <span class="eyebrow">Founder, Platform of Papas</span>
        <h2>Vishal Kumar Singh</h2>
        <p class="lead">Self-leadership for fathers</p>
        <p>Vishal built Platform of Papas from lived experience. When the external structures he had relied on disappeared, he was forced to ask who he was without the titles, targets, and approval that had shaped his identity.</p>
        <p>His work now helps fathers develop the inner skills to meet pressure, trust themselves, and create a life that feels genuinely their own.</p>
        <a class="text-link" href="/about/">Read Vishal's Story &rarr;</a>
      </div>
    </div>`,
  })}
  ${section({
    cls: "off",
    eyebrow: "What fathers say",
    title: "What changes when a father learns to lead himself.",
    content: `${testimonialsGrid()}<p class="reveal" style="margin-top:28px"><a class="text-link" href="/stories/">Read more stories &rarr;</a></p>`,
  })}
  ${newsletterStrip()}
  ${section({
    center: true,
    content: `<blockquote class="pullquote centered reveal">Awaken the leader in you.<br>Better within yourself. More present with others. More intentional with your life.<br><cite class="testimonial-name">Platform of Papas</cite></blockquote>`,
  })}
  ${newsletterModal()}`;
}

function aboutPage() {
  return `${hero({
    eyebrow: "Vishal Kumar Singh &middot; Founder, Platform of Papas",
    title: "Not a new you. The real you, fully expressed.",
    copy: "Platform of Papas began with a personal question: who are you when the titles, targets, and external approval no longer tell you who to be?",
    image: "/Images/DSC_6646.jpg",
    imageAlt: "Portrait of Vishal Kumar Singh",
  })}
  ${section({
    title: "The life that looked right from the outside",
    content: `<div class="prose reveal">
      <p>Vishal grew up with a familiar map: study hard, build a career, fulfil your responsibilities, and keep performing. He followed it completely. Work became more than something he did; it became the structure around his identity.</p>
      <p>He was capable, committed, and moving forward. But capability on the outside did not automatically create clarity on the inside.</p>
    </div>`,
  })}
  ${section({
    cls: "tint",
    title: "When the external structure disappeared",
    content: `<div class="prose reveal">
      <p>Three months into his marriage, a professional crisis changed everything. The titles disappeared. The targets evaporated. The structure he had relied on to understand himself was suddenly gone.</p>
      <blockquote class="pullquote">"Who are you when all of that is gone?"</blockquote>
      <p>He did not have an easy answer. That absence - more than the crisis itself - sent him inward.</p>
    </div>`,
  })}
  ${section({
    title: "The work began within",
    content: `<div class="prose reveal">
      <p>Vishal began examining the patterns, expectations, emotional habits, and need for approval that had quietly shaped his decisions. He learned to notice what was happening within him before it controlled how he behaved.</p>
      <p>As he developed greater self-awareness, emotional steadiness, and clarity, the change became visible everywhere: in his decisions, his confidence, his communication, his work, and the way he participated in family life.</p>
      <p>The lesson was simple and powerful: when a father changes how he shows up, the quality of every relationship around him can begin to change.</p>
    </div>`,
  })}
  ${section({
    cls: "dark",
    title: "Why Platform of Papas exists",
    content: `<div class="two-col">
      <div class="reveal">
        <h3>What Vishal discovered</h3>
        <p>A man can be responsible and still live reactively. He can appear confident and still make decisions from fear. He can care deeply for his family and still struggle to remain present. None of this means he is broken. It means he may never have been taught the skills to lead himself.</p>
      </div>
      <div class="reveal">
        <h3>What the work develops</h3>
        <ul class="check-list">
          <li><span class="list-icon">1</span><span>Clarity and self-trust in meaningful decisions</span></li>
          <li><span class="list-icon">2</span><span>Emotional strength without suppression</span></li>
          <li><span class="list-icon">3</span><span>Authentic confidence, presence, and purpose</span></li>
        </ul>
      </div>
    </div>
    <blockquote class="pullquote centered reveal">There is a more powerful version of you already within you. Self-leadership is how you bring him fully into your life.</blockquote>`,
  })}
  ${proofBar([
    [100, "+", "Fathers supported"],
    [9, "", "Practical inner skills"],
    [3, "", "Ways to begin"],
    [1, "", "Focus - lead yourself"],
  ])}
  ${section({
    cls: "orange center",
    title: "Awaken the leader in you.",
    intro: "The goal is not to escape pressure. It is to become the man who can meet it with clarity, awareness, and choice.",
    content: `<div class="section-actions">${button("Join the Webinar", WEBINAR_URL)} ${button("Explore All Programs", "/#programs", "secondary")}</div>`,
  })}`;
}

function approachPage() {
  const skills = [
    ["01", "Self-awareness", "Notice your thoughts, emotions, triggers, needs, beliefs, and patterns before they unconsciously determine your behaviour."],
    ["02", "Emotional regulation", "Experience emotion without suppressing it, exploding, withdrawing, or allowing it to control the next decision."],
    ["03", "Decision-making", "Choose with clarity, self-trust, and alignment instead of fear, approval-seeking, or endless analysis."],
    ["04", "Boundary setting", "Protect your time, attention, energy, values, and self-respect without unnecessary guilt or aggression."],
    ["05", "Conscious communication", "Express thoughts, emotions, needs, and expectations clearly, calmly, and respectfully."],
    ["06", "Courage", "Take honest, aligned action even when discomfort, fear, or uncertainty is present."],
    ["07", "Intentional living", "Consciously choose what deserves your time, energy, and attention instead of living only by urgency."],
    ["08", "Authenticity", "Operate from your real self rather than maintaining an image designed to gain approval or appear strong."],
    ["09", "Purpose and calling", "Understand what feels deeply meaningful and translate it into personal direction and action."],
  ];
  return `${hero({
    center: true,
    eyebrow: "The Platform of Papas approach",
    title: "Self-leadership is not a personality trait. It is a set of skills.",
    copy:
      "Those skills can be learned, practised, and made visible in the way you think, decide, communicate, respond, and live.",
  })}
  ${section({
    center: true,
    title: "Responsibility does not automatically create self-leadership.",
    intro:
      "A man can be capable, dependable, and successful while still feeling mentally overloaded, uncertain about his direction, or disconnected from what he genuinely wants.",
    content: `<blockquote class="pullquote centered reveal">This is not evidence that something is wrong with him. It means he has never been taught the internal skills required to lead himself.</blockquote>`,
  })}
  ${section({
    cls: "tint",
    title: "Change begins within - and becomes visible everywhere.",
    intro:
      "Self-leadership changes your relationship with pressure, choice, confidence, time, purpose, and the people who matter.",
    content: `<div class="comparison reveal">
      <div class="comparison-col">
        <h3>Before</h3>
        <p>Capable but mentally overloaded</p>
        <p>Waiting for certainty before choosing</p>
        <p>Performing confidence</p>
        <p>Living by urgency and external expectations</p>
      </div>
      <div class="comparison-arrow">&rarr;</div>
      <div class="comparison-col">
        <h3>After</h3>
        <p><strong>Clearer about what matters</strong></p>
        <p><strong>Choosing with greater self-trust</strong></p>
        <p><strong>Building authentic confidence</strong></p>
        <p><strong>Creating life with intention and direction</strong></p>
      </div>
    </div>`,
  })}
  ${section({
    eyebrow: "The practical foundation",
    title: "Nine skills of self-leadership",
    intro:
      "Every promise made by Platform of Papas connects to a practical inner skill that can be used in everyday life.",
    center: true,
    content: `<div class="framework-list">${skills
      .map(
        ([number, title, copy]) => `<article class="framework-step reveal">
          <div class="step-letter">${number}</div>
          <div><h3>${title}</h3><p>${copy}</p></div>
        </article>`
      )
      .join("")}</div>`,
  })}
  ${journeyStrip()}
  ${section({
    cls: "approach-cta",
    center: true,
    title: "The work is learnable. The starting point is within.",
    intro:
      "Take charge of your inner world. Step into your power. Create a life that fully reflects the man you were always capable of becoming.",
    content: `<div class="section-actions">${button("Join the Webinar", WEBINAR_URL)} <a class="text-link" href="/about/">Read Vishal's Story &rarr;</a></div>`,
  })}`;
}

function journeyStrip() {
  return `<section class="journey-strip" aria-label="Three-stage journey">
    <article class="journey-step reveal"><span class="step-num">STAGE 1</span><h3>Notice</h3><p>See the thoughts, emotions, and patterns shaping your response.</p></article>
    <article class="journey-step reveal"><span class="step-num">STAGE 2</span><h3>Choose</h3><p>Pause, reconnect with what matters, and act from your values.</p></article>
    <article class="journey-step reveal"><span class="step-num">STAGE 3</span><h3>Create</h3><p>Direct your time, energy, decisions, and life with intention.</p></article>
  </section>`;
}

function storiesPage() {
  return `${hero({
    center: true,
    eyebrow: "Reflections and results",
    title: "Not a new you. The real you, fully expressed.",
    copy:
      "Self-leadership becomes visible in clearer decisions, greater emotional steadiness, authentic confidence, stronger presence, and a life lived with intention.",
  })}
  ${section({
    cls: "off",
    eyebrow: "What fathers say",
    title: "What fathers notice as the work becomes real",
    content: testimonialsGrid(),
  })}
  ${section({
    eyebrow: "Everyday transformation",
    title: "What self-leadership can look like in real life.",
    content: `<div class="case-grid">
      ${caselet("The father caught in mental noise", "His mind keeps replaying conversations, scanning possible outcomes, and carrying unfinished pressure into the next part of his day.", "He notices the pattern before it takes over, regulates the pressure, and becomes capable of giving the present moment his full attention.")}
      ${caselet("The father waiting for certainty", "He can make decisions, but meaningful personal choices become exhausting because he wants to eliminate every risk before moving.", "He becomes clearer about his values, accepts that meaningful choices contain uncertainty, and acts with greater self-trust.")}
      ${caselet("The father living by expectations", "He knows what others consider responsible, impressive, or acceptable, but has become less certain about what he genuinely wants.", "He reconnects with his own voice, sets respectful boundaries, and begins creating a future that reflects who he truly is.")}
    </div>`,
  })}
  ${section({
    cls: "dark",
    title: "The outcomes we build toward",
    content: `<div class="outcome-grid">
      <article class="outcome-item reveal"><span>01</span><h3>Clearer decisions</h3><p>Less internal back-and-forth. Greater trust in your own judgement.</p></article>
      <article class="outcome-item reveal"><span>02</span><h3>Emotional strength</h3><p>Experience pressure without allowing the moment to control your response.</p></article>
      <article class="outcome-item reveal"><span>03</span><h3>Authentic confidence</h3><p>Stop performing strength and build confidence through alignment and action.</p></article>
      <article class="outcome-item reveal"><span>04</span><h3>Meaningful direction</h3><p>Become clearer about what you want to create, experience, and contribute.</p></article>
    </div>`,
  })}
  ${section({
    cls: "gold-tint center",
    title: "Your next level begins within.",
    intro:
      "You do not need to manufacture a different personality. You can learn the skills that bring your real strength more fully into your life.",
    content: `<div class="section-actions">${button("Join the Webinar", WEBINAR_URL)} ${button("Get the Free eBook First", "/ebook/", "secondary dark")}</div>`,
  })}`;
}

function caselet(title, challenge, after) {
  return `<article class="story-block reveal">
    <h3>${title}</h3>
    <p>${challenge}</p>
    <span class="tag">What shifted</span>
    <p><strong>${after}</strong></p>
  </article>`;
}

function newsletterPage() {
  return `${hero({
    center: true,
    eyebrow: "The Papas Letter",
    title: "One letter a week for the father ready to lead himself.",
    copy:
      "No performance. No inflated promises. Just one grounded idea on clarity, confidence, emotional strength, presence, or intentional living every Sunday.",
    actions: `<button class="btn-primary newsletter-modal-cta" type="button" data-modal-open aria-haspopup="dialog" aria-controls="ghlModal">Join The Papas Letter</button>`,
  })}
  ${section({
    title: "What's inside each letter",
    content: `<div class="feature-grid">
      ${feature("&#9993;", "One idea to practise", "Each letter explores one useful self-leadership idea with enough depth to apply it in everyday life.")}
      ${feature("&nearr;", "Grounded ascension", "A larger life is possible - without theatrical promises, diagnosis, or pretending to be someone else.")}
      ${feature("&#9825;", "Free. Always.", "No constant pressure. The letter exists to help fathers think more clearly and live more intentionally.")}
    </div>`,
  })}
  ${section({
    cls: "gold-tint center",
    title: "A taste of what's inside",
    content: `<article class="letter-card reveal">
      <span class="eyebrow">From a recent issue</span>
      <p class="testimonial-quote">"You do not become confident by repeating that you are confident. You become confident by learning that you can trust yourself."</p>
      <cite class="testimonial-name">Vishal Kumar Singh, Platform of Papas</cite>
    </article>`,
  })}
  <section class="newsletter-strip">
    <div class="container">
      <h2 class="reveal">Join the fathers already reading.</h2>
      <p class="reveal">One grounded self-leadership insight lands in your inbox every Sunday.</p>
      <button class="btn-primary newsletter-modal-cta reveal" type="button" data-modal-open aria-haspopup="dialog" aria-controls="ghlModal">Join The Papas Letter</button>
      <p class="newsletter-privacy reveal">No spam. No sales. Unsubscribe anytime.</p>
    </div>
  </section>
  ${section({
    title: "What readers say",
    content: `<div class="testimonial-grid two">
      ${testimonial("Reader, Mumbai", "The Papas Letter is the only email I actually look forward to reading on a Sunday morning.")}
      ${testimonial("Reader, Bengaluru", "One line from last week's letter stayed with me for three days. That is more than most books manage.")}
    </div>`,
  })}
  ${newsletterModal()}`;
}

function newsletterModal() {
  return `<div class="ghl-modal-overlay" id="ghlModal" role="dialog" aria-modal="true" aria-labelledby="ghlModalTitle" aria-hidden="true">
    <div class="ghl-modal-box" role="document">
      <button class="ghl-modal-close" id="ghlModalClose" type="button" aria-label="Close newsletter signup">&times;</button>
      <div class="ghl-modal-header">
        <h2 id="ghlModalTitle">Join The Papas Letter</h2>
        <p>One grounded self-leadership insight for fathers, delivered every Sunday.</p>
      </div>
      <div class="ghl-modal-form-scroll">
        <div id="ghlIframeLoading" class="ghl-loading" role="status">Loading form...</div>
        <div id="ghlFormHolder"></div>
      </div>
    </div>
  </div>`;
}

function feature(icon, title, copy) {
  return `<article class="feature-card reveal"><div class="feature-icon" aria-hidden="true">${icon}</div><h3>${title}</h3><p>${copy}</p></article>`;
}

function contactPage() {
  return `${hero({
    eyebrow: "Contact Platform of Papas",
    title: "Begin a conversation.",
    copy:
      "Ask about the live webinar, recorded course, free eBook, a private consultation, or a potential collaboration.",
  })}
  ${section({
    title: "Send us a message",
    content: `<div class="contact-grid">
      <div class="contact-card contact-form-embed reveal">
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/nYTRe4T55k9IP7KeZ03W"
          style="width:100%;height:100%;border:none;border-radius:8px"
          id="inline-nYTRe4T55k9IP7KeZ03W"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Contact Us Page"
          data-height="656"
          data-layout-iframe-id="inline-nYTRe4T55k9IP7KeZ03W"
          data-form-id="nYTRe4T55k9IP7KeZ03W"
          title="Contact Us Page"
        ></iframe>
      </div>
      <aside class="contact-card reveal">
        <span class="eyebrow">Reach us directly</span>
        <h3>Prefer to reach out directly?</h3>
        <p>Email: <a class="text-link" href="mailto:hello@platformofpapas.com">hello@platformofpapas.com</a></p>
        <p>Instagram: <a class="text-link" href="https://www.instagram.com/platformofpapas">@platformofpapas</a></p>
        <p>For programme guidance, tell us what you want to develop - clearer decisions, emotional strength, confidence, presence, or meaningful direction.</p>
        <h3>For collaborations & partnerships</h3>
        <p>If you are a brand, organisation, or media outlet interested in working with Vishal or Platform of Papas, choose "Partnership" in the form.</p>
      </aside>
    </div>`,
  })}
  ${section({
    cls: "tint",
    title: "Choose your starting point.",
    content: `<ul class="link-list">
      <li>New to self-leadership? <a class="text-link" href="/ebook/">Begin with the free eBook</a></li>
      <li>Want to experience the approach live? <a class="text-link" href="${WEBINAR_URL}">Join the webinar</a></li>
      <li>Ready for deeper, self-paced work? <a class="text-link" href="${TRANSFORMATION_URL}">Explore the recorded course</a></li>
      <li>Want to understand the method first? <a class="text-link" href="/approach/">Read the approach</a></li>
    </ul>`,
  })}`;
}

function legalPage({ title, summary, sections, notice = "" }) {
  return `<section class="legal-hero">
    <div class="container">
      <span class="eyebrow">Legal</span>
      <h1>${title}</h1>
      <p>${summary}</p>
      <div class="legal-meta"><span>Effective: ${LEGAL_EFFECTIVE_DATE}</span><span>Jurisdiction: Karnataka, India</span></div>
    </div>
  </section>
  ${notice ? `<div class="legal-notice"><div class="container">${notice}</div></div>` : ""}
  <section class="legal-shell">
    <div class="container legal-layout">
      <aside class="legal-toc" aria-label="Page contents">
        <span>On this page</span>
        ${sections.map(([id, heading]) => `<a href="#${id}">${heading}</a>`).join("")}
      </aside>
      <article class="legal-document">
        ${sections
          .map(
            ([id, heading, content]) => `<section id="${id}" class="legal-section">
              <h2>${heading}</h2>
              ${content}
            </section>`
          )
          .join("")}
      </article>
    </div>
  </section>`;
}

function privacyPage() {
  return legalPage({
    title: "Privacy Policy",
    summary:
      "This policy explains how Platform of Papas collects, uses, stores, and shares personal data when you visit our websites or use our digital services.",
    notice:
      "We use plain language wherever possible. By using our services, you acknowledge the practices described below. Where consent is required, you may withdraw it as described in this policy.",
    sections: [
      [
        "scope",
        "1. Scope and who we are",
        `<p>Platform of Papas ("Platform of Papas", "we", "us", or "our") provides digital products, newsletters, communities, coaching, consulting, webinars, workshops, and training programmes from Karnataka, India.</p>
        <p>This Privacy Policy applies to our main website, campaign and landing pages, forms, newsletters, programme portals, community interactions, and communications that link to this policy. It does not control independent third-party websites or services.</p>`,
      ],
      [
        "data-we-collect",
        "2. Personal data we collect",
        `<p>Depending on how you interact with us, we may collect:</p>
        <ul class="legal-list">
          <li><strong>Identity and contact data:</strong> name, email address, telephone number, city, state, and similar details.</li>
          <li><strong>Transaction data:</strong> programme purchased, amount, date, invoice information, payment status, and refund history. Payment card or banking details are generally processed by our payment providers and are not intentionally stored by us.</li>
          <li><strong>Programme and participation data:</strong> enrolment, attendance, progress, responses, questions, feedback, testimonials, and support requests.</li>
          <li><strong>Communications:</strong> emails, form submissions, call or meeting notes, and messages sent through our communities or social channels.</li>
          <li><strong>Technical and usage data:</strong> IP address, browser and device information, approximate location, referring pages, page activity, cookie identifiers, and analytics events.</li>
          <li><strong>Information you choose to share:</strong> personal goals, family context, or other information relevant to coaching. Please avoid sharing sensitive information unless it is genuinely necessary.</li>
        </ul>`,
      ],
      [
        "collection",
        "3. How we collect data",
        `<p>We collect personal data directly from you when you submit a form, subscribe, purchase, register, attend a session, join a community, contact us, or provide feedback. We may also receive technical data automatically through cookies and analytics, and receive limited transaction or campaign information from service providers and advertising platforms.</p>`,
      ],
      [
        "use",
        "4. How we use personal data",
        `<p>We may use personal data to:</p>
        <ul class="legal-list">
          <li>deliver, administer, personalise, and support our programmes and digital products;</li>
          <li>process registrations, payments, invoices, cancellations, and eligible refunds;</li>
          <li>send service messages, session reminders, newsletters, and marketing communications you have requested or may reasonably expect, subject to applicable law;</li>
          <li>respond to enquiries, provide customer support, and resolve complaints;</li>
          <li>improve our content, services, website performance, and customer experience;</li>
          <li>protect our users, systems, intellectual property, and business from misuse, fraud, or security threats; and</li>
          <li>comply with legal, tax, accounting, regulatory, and dispute-resolution obligations.</li>
        </ul>`,
      ],
      [
        "consent",
        "5. Consent and lawful processing",
        `<p>We process personal data for lawful purposes connected with providing requested services, performing our agreements, responding to your requests, operating and protecting our business, and complying with law. Where applicable law requires consent, we will seek clear consent and provide a reasonable way to withdraw it.</p>
        <p>Withdrawing consent does not affect processing already carried out lawfully. It may prevent us from continuing a service where the relevant data is necessary to provide it.</p>`,
      ],
      [
        "cookies",
        "6. Cookies and analytics",
        `<p>Our websites may use essential cookies and similar technologies for security, functionality, preferences, analytics, and campaign measurement. You may restrict non-essential cookies using browser controls or any cookie controls made available on the site. Blocking cookies may affect some functionality.</p>`,
      ],
      [
        "sharing",
        "7. Sharing and service providers",
        `<p>We do not sell personal data. We may share only what is reasonably necessary with trusted providers that help us operate, including website and form providers, CRM and email platforms, payment processors, video and meeting platforms, community tools, analytics and advertising providers, cloud hosting, professional advisers, and customer-support providers.</p>
        <p>We may also disclose data when required by law, to protect legal rights or safety, in connection with a genuine business reorganisation, or with your direction or consent. Providers process data under their own terms and, where applicable, contractual safeguards.</p>`,
      ],
      [
        "transfers",
        "8. Storage and international transfers",
        `<p>Some providers may store or process data outside Karnataka or outside India. Where personal data is transferred across borders, we take reasonable steps to use reputable providers and safeguards required by applicable law. Locations and providers may change as our service infrastructure evolves.</p>`,
      ],
      [
        "retention",
        "9. Data retention",
        `<p>We retain personal data only for as long as reasonably necessary for the purpose collected, including programme delivery, support, records of consent, legal claims, tax and accounting, fraud prevention, and regulatory compliance. Retention periods vary by data type. We may securely delete or anonymise data when it is no longer required.</p>`,
      ],
      [
        "security",
        "10. Security",
        `<p>We use reasonable administrative, technical, and organisational safeguards appropriate to the nature of the data. No online service or storage system can be guaranteed completely secure. You are responsible for protecting account credentials and promptly informing us of suspected unauthorised access.</p>`,
      ],
      [
        "rights",
        "11. Your choices and rights",
        `<p>Subject to applicable law and available exceptions, you may ask us to provide information about processing, correct inaccurate or incomplete data, erase data, withdraw consent, stop marketing messages, or address a grievance. You may unsubscribe from marketing emails using the link in the message.</p>
        <p>We may need to verify your identity and retain limited records where required by law or necessary to establish, exercise, or defend legal claims. Rights under the Digital Personal Data Protection Act, 2023 and related rules will apply in accordance with their notified commencement and scope.</p>`,
      ],
      [
        "children",
        "12. Children's privacy",
        `<p>Our paid services are intended for adults. We do not knowingly solicit personal data directly from children under 18. If you believe a child has provided personal data without appropriate parental or guardian involvement, contact us so we can review and take appropriate action.</p>`,
      ],
      [
        "third-parties",
        "13. Third-party links",
        `<p>Our services may link to third-party websites, payment pages, communities, or social platforms. Their privacy practices are governed by their own policies. Review those policies before providing personal data.</p>`,
      ],
      [
        "changes",
        "14. Changes to this policy",
        `<p>We may update this policy to reflect service, legal, or operational changes. The revised version will be posted here with a new effective or updated date. Material changes may also be communicated through reasonable additional notice.</p>`,
      ],
      [
        "contact",
        "15. Grievance and privacy contact",
        `<p>For privacy requests or complaints, contact:</p>
        <p><strong>Grievance Officer / Privacy Contact</strong><br>Customer Support Lead, Platform of Papas<br>Karnataka, India<br>Email: <a href="mailto:hello@platformofpapas.com">hello@platformofpapas.com</a></p>
        <p>Please include your name, contact details, the nature of your request, and enough information for us to identify the relevant interaction. We will acknowledge and address the request within a reasonable period required by applicable law.</p>`,
      ],
    ],
  });
}

function termsPage() {
  return legalPage({
    title: "Terms & Conditions",
    summary:
      "These terms govern your use of Platform of Papas websites, digital products, coaching, consulting, communities, and training programmes.",
    notice:
      "Please read these terms before purchasing or participating. By accessing our services or completing a purchase, you agree to these terms and any offer-specific terms shown at checkout.",
    sections: [
      [
        "acceptance",
        "1. Acceptance of terms",
        `<p>These Terms and Conditions ("Terms") form an agreement between you and Platform of Papas ("we", "us", or "our"). If you do not agree, do not purchase, access, or use the relevant service. Additional written terms on an offer page, order form, invoice, or programme schedule form part of these Terms. If there is a direct conflict, the more specific written offer term applies to that service, subject to applicable law.</p>`,
      ],
      [
        "eligibility",
        "2. Eligibility",
        `<p>You must be at least 18 years old and legally capable of entering a contract. If you purchase on behalf of an organisation, you confirm that you have authority to bind it. Information supplied during registration or payment must be accurate and kept reasonably current.</p>`,
      ],
      [
        "services",
        "3. Our services",
        `<p>We offer digital content, newsletters, webinars, recorded courses, coaching, consulting, group programmes, workshops, communities, and related training resources. The exact inclusions, format, schedule, access period, and price are those expressly stated on the relevant offer page or written order confirmation.</p>
        <p>We may make reasonable changes to facilitators, schedules, delivery tools, lesson order, supporting materials, or equivalent features where this does not materially reduce the purchased service. We will communicate material changes when reasonably practicable.</p>`,
      ],
      [
        "accounts",
        "4. Registration and access",
        `<p>Access credentials and programme links are personal to the registered participant unless an offer expressly permits team access. You must not share, resell, sublicense, publish, or provide unauthorised access. You are responsible for activity conducted through your credentials and for maintaining suitable devices, internet access, and software.</p>`,
      ],
      [
        "fees",
        "5. Fees, payment, and taxes",
        `<p>Prices, payment schedules, and applicable taxes are displayed at purchase or stated in writing. You authorise our payment provider to charge the selected method. Unless stated otherwise, fees are payable in Indian Rupees and you are responsible for applicable taxes, banking charges, and currency conversion costs.</p>
        <p>For instalment plans, all instalments remain due according to the agreed schedule unless a refund is approved or applicable law requires otherwise. Failed or overdue payments may result in suspended access after reasonable notice.</p>`,
      ],
      [
        "sessions",
        "6. Live sessions and participation",
        `<p>You are responsible for attending scheduled sessions on time. Missed sessions, non-attendance, incomplete exercises, or failure to use available access do not ordinarily create a refund right. Any rescheduling, recording access, or replacement session is subject to the offer terms and facilitator availability.</p>
        <p>You must participate respectfully and must not harass, threaten, discriminate against, record without permission, or disclose confidential information about other participants. We may remove a participant for serious or repeated misconduct without refund, subject to applicable law.</p>`,
      ],
      [
        "coaching-disclaimer",
        "7. Coaching and education disclaimer",
        `<p>Our services are educational and developmental. They are not medical, psychological, psychiatric, legal, financial, or other regulated professional advice, diagnosis, or treatment. Seek an appropriately qualified professional for those needs.</p>
        <p>Examples, testimonials, and participant outcomes are illustrative and do not guarantee that you will achieve the same result. Results depend on personal circumstances, participation, decisions, and factors outside our control.</p>`,
      ],
      [
        "intellectual-property",
        "8. Intellectual property",
        `<p>All programme frameworks, videos, recordings, text, graphics, exercises, templates, downloads, branding, and other materials are owned by or licensed to Platform of Papas and are protected by applicable intellectual-property law.</p>
        <p>We grant you a limited, revocable, non-exclusive, non-transferable licence to access purchased materials for your personal, non-commercial use during the stated access period. You may not reproduce, modify, distribute, sell, teach from, create derivative products from, scrape, upload, publicly display, or commercially exploit them without written permission.</p>`,
      ],
      [
        "user-content",
        "9. Your content and feedback",
        `<p>You retain ownership of original content you submit. You grant us a limited licence to host, process, and display it only as necessary to deliver and improve the service, comply with law, and protect our rights. We will not publicly use an identifiable testimonial, photograph, or success story for marketing without appropriate permission.</p>
        <p>General suggestions and non-confidential feedback may be used to improve our services without payment or attribution.</p>`,
      ],
      [
        "prohibited-use",
        "10. Prohibited use",
        `<p>You must not use our services to break the law, infringe rights, distribute malicious code, gain unauthorised access, interfere with systems, impersonate another person, harvest data, bypass access controls, or promote harmful or deceptive activity. Automated extraction, training competing products on our materials, and unauthorised recording are prohibited.</p>`,
      ],
      [
        "third-party-services",
        "11. Third-party services",
        `<p>We may use or link to independent payment, video, messaging, CRM, community, hosting, and social platforms. Their availability and terms are controlled by their operators. We are not responsible for independent third-party content or conduct, but we will take reasonable steps to help resolve service-access issues within our control.</p>`,
      ],
      [
        "refunds",
        "12. Refunds and cancellations",
        `<p>Refunds and cancellation requests are governed by our <a href="/refund-policy/">Refund &amp; Return Policy</a> and any more favourable right required by applicable law. Because our products are digital and may include immediately accessible content or reserved coaching capacity, they cannot be physically returned.</p>`,
      ],
      [
        "availability",
        "13. Availability and force majeure",
        `<p>We aim to provide reliable access but do not promise uninterrupted or error-free service. We are not responsible for delay or failure caused by events reasonably beyond our control, including internet or platform outages, natural events, government action, illness, labour disruption, or security incidents. We will use reasonable efforts to restore, reschedule, or provide an appropriate alternative.</p>`,
      ],
      [
        "disclaimers",
        "14. Disclaimers and liability",
        `<p>To the maximum extent permitted by law, services are provided on an "as available" basis and implied warranties are excluded where they may lawfully be excluded. Nothing in these Terms limits liability that cannot legally be excluded, including rights and remedies available to consumers under applicable Indian law.</p>
        <p>Subject to the preceding sentence, we will not be liable for indirect, incidental, special, or consequential losses, loss of opportunity, or loss caused by reliance on educational content instead of appropriate professional advice. Our aggregate liability relating to a specific paid service will not exceed the amount you paid for that service during the twelve months preceding the claim.</p>`,
      ],
      [
        "indemnity",
        "15. Responsibility for misuse",
        `<p>You are responsible for losses reasonably arising from your unlawful use, infringement of third-party rights, unauthorised distribution of our materials, or serious breach of these Terms. This provision does not require a consumer to indemnify us for our own negligence, unlawful conduct, or breach.</p>`,
      ],
      [
        "termination",
        "16. Suspension and termination",
        `<p>You may stop using a service at any time, but payment and refund obligations remain governed by the applicable offer and Refund Policy. We may suspend or terminate access for non-payment, security risk, unlawful activity, material breach, or serious participant misconduct. Where appropriate, we will give notice and a reasonable opportunity to remedy the issue.</p>`,
      ],
      [
        "law",
        "17. Governing law and disputes",
        `<p>These Terms are governed by the laws of India. The parties should first attempt in good faith to resolve a dispute by writing to the contact below with relevant details. If it is not resolved within 30 days, courts of competent jurisdiction in Karnataka, India will have jurisdiction, subject to any mandatory consumer forum or other statutory right available to you.</p>`,
      ],
      [
        "changes",
        "18. Changes to these terms",
        `<p>We may update these Terms for future use to reflect legal, security, operational, or service changes. Updated Terms will be posted with a revised date. Changes will not retroactively remove material rights attached to a completed purchase unless required by law or expressly agreed.</p>`,
      ],
      [
        "contact",
        "19. Contact",
        `<p>Questions, notices, and complaints may be sent to:</p>
        <p><strong>Platform of Papas</strong><br>Karnataka, India<br>Email: <a href="mailto:hello@platformofpapas.com">hello@platformofpapas.com</a></p>`,
      ],
    ],
  });
}

function refundPage() {
  return legalPage({
    title: "Refund & Return Policy",
    summary:
      "Our products are digital coaching, consulting, education, and training services. This policy explains when a refund may be requested and how claims are reviewed.",
    notice:
      "Core promise: if a material feature expressly offered on the sales page is not provided, or the programme delivered is materially different from that description, you may submit a refund claim within seven calendar days.",
    sections: [
      [
        "digital-products",
        "1. Digital nature of our products",
        `<p>Platform of Papas sells digital products and services, including live and recorded coaching, consulting, webinars, workshops, training programmes, communities, downloadable materials, templates, and online course access. Nothing is shipped and there is no physical product to return.</p>
        <p>Digital access, reserved coaching capacity, and live delivery can begin immediately or on a scheduled date. Refund eligibility is therefore based on the service delivered and the conditions below, not on physical return.</p>`,
      ],
      [
        "seven-day-guarantee",
        "2. Seven-day material delivery guarantee",
        `<p>You may request a full or proportionate refund where:</p>
        <ul class="legal-list">
          <li>a material feature expressly promised on the relevant sales or checkout page is not supplied;</li>
          <li>paid access is not provided and we do not correct the issue within a reasonable time after notice;</li>
          <li>the programme or digital product delivered is materially different from its express written description; or</li>
          <li>we cancel the paid service and do not provide a reasonable equivalent, reschedule, credit, or other agreed remedy.</li>
        </ul>
        <p>Your claim must be sent within seven calendar days from the later of your purchase date and the date on which access or the first scheduled delivery is provided. Explain the specific promised item that was not delivered and include relevant order details or supporting material.</p>`,
      ],
      [
        "not-eligible",
        "3. Requests normally not eligible",
        `<p>Unless required by law or expressly stated in an offer, refunds are not ordinarily available for:</p>
        <ul class="legal-list">
          <li>change of mind, change in personal circumstances, or finding a programme no longer convenient;</li>
          <li>non-attendance, missed live sessions, scheduling conflicts, or failure to use available access;</li>
          <li>failure to complete lessons, exercises, or recommended actions;</li>
          <li>dissatisfaction based only on subjective expectations or lack of a particular result where no result was guaranteed;</li>
          <li>minor differences in presentation, lesson order, facilitator, schedule, platform, or equivalent supporting material that do not materially reduce the purchased service;</li>
          <li>requests made after the seven-day claim period where the issue was reasonably discoverable during that period; or</li>
          <li>account suspension or removal resulting from unlawful activity, non-payment, unauthorised sharing, or serious breach of programme or community rules.</li>
        </ul>`,
      ],
      [
        "live-programmes",
        "4. Live coaching and consulting",
        `<p>Live programmes reserve facilitator time and limited participant capacity. If we reschedule a session, we may first offer a replacement date, recording where appropriate, credit, or equivalent session. A refund may be considered where a material part of the paid live service is not delivered and no reasonable equivalent is provided.</p>
        <p>Participant non-attendance does not by itself create a refund right. If an offer page states specific cancellation or rescheduling terms, those terms also apply, provided they do not reduce mandatory rights under law.</p>`,
      ],
      [
        "subscriptions-instalments",
        "5. Subscriptions and instalments",
        `<p>Cancelling a subscription stops future renewals where cancellation is completed before the next billing date, but does not automatically refund a completed billing period. Cancelling an instalment plan does not cancel amounts already due for a service that has been made available, unless a refund is approved under this policy or required by law.</p>`,
      ],
      [
        "how-to-request",
        "6. How to request a refund",
        `<p>Email <a href="mailto:hello@platformofpapas.com">hello@platformofpapas.com</a> within the applicable seven-day period with:</p>
        <ul class="legal-list">
          <li>your full name and purchase email address;</li>
          <li>the product or programme name, payment date, and order or transaction reference;</li>
          <li>the sales-page promise or material inclusion you believe was not delivered;</li>
          <li>a clear description of what you received; and</li>
          <li>screenshots or other relevant supporting information, where available.</li>
        </ul>
        <p>Please contact us before initiating a payment dispute so we have a reasonable opportunity to investigate and resolve the concern.</p>`,
      ],
      [
        "review",
        "7. Review and decision",
        `<p>We will acknowledge a complete request and may ask reasonable follow-up questions. We aim to provide a decision within seven business days after receiving the information needed to assess the claim. Approval may be full or proportionate, depending on the part of the service affected and any value already properly delivered.</p>`,
      ],
      [
        "payment",
        "8. Approved refunds",
        `<p>Approved refunds are generally issued to the original payment method. We aim to initiate payment within seven business days of approval. Banks and payment providers may require additional processing time, commonly 5 to 10 business days. Transaction fees, currency differences, or taxes will be handled as required by applicable law and the payment provider.</p>
        <p>Access to refunded content, sessions, communities, and materials may be withdrawn when a refund is issued.</p>`,
      ],
      [
        "consumer-rights",
        "9. Statutory consumer rights",
        `<p>This policy does not exclude or limit any right or remedy that cannot lawfully be excluded, including rights relating to deficient services, unfair trade practices, misleading representations, or digital products under applicable Indian consumer law. Where mandatory law provides a more favourable remedy, that remedy prevails.</p>`,
      ],
      [
        "contact",
        "10. Contact",
        `<p>Refund requests and questions should be sent to:</p>
        <p><strong>Platform of Papas Support</strong><br>Karnataka, India<br>Email: <a href="mailto:hello@platformofpapas.com">hello@platformofpapas.com</a></p>`,
      ],
    ],
  });
}

function offerShell({ eyebrow = "", title, copy, cta = "", href = "" }) {
  return `${hero({
    center: true,
    eyebrow,
    title,
    copy,
    actions: cta && href ? button(cta, href) : "",
  })}
  ${section({
    cls: "tint center",
    title: "Awaken the leader in you.",
    intro: "Better within yourself. More present with others. More intentional with your life.",
  })}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
