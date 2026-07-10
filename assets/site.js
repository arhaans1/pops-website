(function () {
  const header = document.querySelector("[data-site-header]");
  const mobileToggle = document.querySelector("[data-mobile-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const dropdowns = Array.from(document.querySelectorAll("[data-dropdown]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 60);
  }

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  function closeDropdowns(except) {
    dropdowns.forEach((dropdown) => {
      if (dropdown === except) return;
      dropdown.classList.remove("is-open");
      const trigger = dropdown.querySelector("[aria-expanded]");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  }

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector("[data-dropdown-trigger]");
    const links = Array.from(dropdown.querySelectorAll(".dropdown-panel a"));
    let openTimer;
    let closeTimer;

    function open() {
      clearTimeout(closeTimer);
      openTimer = window.setTimeout(() => {
        closeDropdowns(dropdown);
        dropdown.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }, 60);
    }

    function close() {
      clearTimeout(openTimer);
      closeTimer = window.setTimeout(() => {
        dropdown.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      }, 120);
    }

    dropdown.addEventListener("mouseenter", open);
    dropdown.addEventListener("mouseleave", close);

    trigger.addEventListener("click", () => {
      const isOpen = dropdown.classList.contains("is-open");
      closeDropdowns();
      dropdown.classList.toggle("is-open", !isOpen);
      trigger.setAttribute("aria-expanded", String(!isOpen));
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        closeDropdowns(dropdown);
        dropdown.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        links[0]?.focus();
      }
      if (event.key === "Escape") closeDropdowns();
    });

    links.forEach((link, index) => {
      link.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeDropdowns();
          trigger.focus();
        }
        if (event.key === "ArrowDown") {
          event.preventDefault();
          links[(index + 1) % links.length]?.focus();
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          links[(index - 1 + links.length) % links.length]?.focus();
        }
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-dropdown]")) closeDropdowns();
  });

  function setMobileOpen(open) {
    if (!mobileToggle || !mobileNav) return;
    mobileToggle.classList.toggle("is-open", open);
    mobileNav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    mobileToggle.setAttribute("aria-expanded", String(open));
  }

  mobileToggle?.addEventListener("click", () => {
    setMobileOpen(!mobileNav.classList.contains("is-open"));
  });

  mobileNav?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMobileOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileOpen(false);
      closeDropdowns();
    }
  });

  const reveals = Array.from(document.querySelectorAll(".reveal"));
  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 0.08}s`;
      revealObserver.observe(item);
    });
  } else {
    reveals.forEach((item) => item.classList.add("is-visible"));
  }

  function animateCounter(element) {
    const target = Number(element.dataset.countTo || "0");
    const suffix = element.dataset.countSuffix || "";
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const counters = Array.from(document.querySelectorAll("[data-count-to]"));
  if (!reduceMotion && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach((counter) => {
      counter.textContent = `${counter.dataset.countTo || "0"}${counter.dataset.countSuffix || ""}`;
    });
  }

  document.querySelectorAll("[data-form]").forEach((form) => {
    const status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!status) return;
      const message = form.dataset.success || "Thank you. We will be in touch soon.";
      status.textContent = message;
      status.className = "form-status success";
      form.reset();
    });
  });

  const ghlOverlay = document.getElementById("ghlModal");
  if (ghlOverlay) {
    const closeButton = document.getElementById("ghlModalClose");
    const holder = document.getElementById("ghlFormHolder");
    const loading = document.getElementById("ghlIframeLoading");
    const formId = "MYjQ27LRBA3m6DoXnbt6";
    const formName = "Sunday Newsletter";
    const formHeight = "434";
    let injected = false;
    let lastFocusedElement = null;
    let previousBodyOverflow = "";

    function ensureGhlForm() {
      if (injected || !holder) return;
      injected = true;

      const iframe = document.createElement("iframe");
      iframe.src = `https://api.leadconnectorhq.com/widget/form/${formId}`;
      iframe.id = `inline-${formId}`;
      iframe.title = formName;
      iframe.setAttribute("data-layout", "{'id':'INLINE'}");
      iframe.setAttribute("data-trigger-type", "alwaysShow");
      iframe.setAttribute("data-trigger-value", "");
      iframe.setAttribute("data-activation-type", "alwaysActivated");
      iframe.setAttribute("data-activation-value", "");
      iframe.setAttribute("data-deactivation-type", "neverDeactivate");
      iframe.setAttribute("data-deactivation-value", "");
      iframe.setAttribute("data-form-name", formName);
      iframe.setAttribute("data-height", formHeight);
      iframe.setAttribute("data-layout-iframe-id", `inline-${formId}`);
      iframe.setAttribute("data-form-id", formId);
      iframe.style.cssText = `width:100%;height:${formHeight}px;border:none;border-radius:0;display:none;`;

      iframe.onload = function () {
        if (loading) loading.style.display = "none";
        this.style.display = "block";

        if (!window._ghlScriptLoaded) {
          window._ghlScriptLoaded = true;
          const script = document.createElement("script");
          script.src = "https://link.msgsndr.com/js/form_embed.js";
          document.body.appendChild(script);
        }
      };

      holder.appendChild(iframe);
    }

    function openGhlModal() {
      lastFocusedElement = document.activeElement;
      previousBodyOverflow = document.body.style.overflow;
      ghlOverlay.style.display = "flex";
      ghlOverlay.setAttribute("aria-hidden", "false");
      ensureGhlForm();
      void ghlOverlay.offsetWidth;
      ghlOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
      closeButton?.focus();
    }

    function closeGhlModal() {
      if (ghlOverlay.style.display === "none") return;
      ghlOverlay.classList.remove("active");
      ghlOverlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = previousBodyOverflow;

      window.setTimeout(() => {
        if (ghlOverlay.classList.contains("active")) return;
        ghlOverlay.style.display = "none";
        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
          lastFocusedElement.focus();
        }
      }, 300);
    }

    function addTap(element, handler) {
      if (!element) return;
      let fired = false;

      function handle(event) {
        if (event.type === "touchend") event.preventDefault();
        if (fired) return;
        fired = true;
        handler(event);
        window.setTimeout(() => {
          fired = false;
        }, 600);
      }

      element.addEventListener("touchend", handle, { passive: false, capture: true });
      element.addEventListener("click", handle, { capture: true });
    }

    document.querySelectorAll("[data-modal-open]").forEach((button) => {
      addTap(button, (event) => {
        event.stopPropagation();
        openGhlModal();
      });
    });

    addTap(closeButton, (event) => {
      event.stopPropagation();
      closeGhlModal();
    });

    ghlOverlay.addEventListener(
      "touchend",
      (event) => {
        if (event.target !== ghlOverlay) return;
        event.preventDefault();
        closeGhlModal();
      },
      { passive: false, capture: true }
    );

    ghlOverlay.addEventListener(
      "click",
      (event) => {
        if (event.target === ghlOverlay) closeGhlModal();
      },
      { capture: true }
    );

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && ghlOverlay.classList.contains("active")) closeGhlModal();
    });

    window.openGhlModal = openGhlModal;
    window.closeGhlModal = closeGhlModal;
  }
})();
