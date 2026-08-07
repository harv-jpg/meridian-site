document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      const expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", String(expanded));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  // Contact form: submits to Formspree (see action="" attribute on the <form> tag)
  const form = document.querySelector("#contact-form");
  if (form) {
    const btn = form.querySelector("button[type=submit]");
    const status = document.querySelector("#form-status");
    const originalBtnText = btn.textContent;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (form.action.includes("YOUR_FORM_ID")) {
        if (status) {
          status.textContent = "Form isn't connected yet — add your Formspree endpoint.";
          status.style.color = "#b3261e";
        }
        return;
      }

      btn.disabled = true;
      btn.textContent = "Sending…";
      if (status) status.textContent = "";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          btn.textContent = "Sent — we'll be in touch";
          form.reset();
        } else {
          throw new Error("Submission failed");
        }
      } catch (err) {
        btn.textContent = originalBtnText;
        if (status) {
          status.textContent = "Something went wrong — please email us directly instead.";
          status.style.color = "#b3261e";
        }
      } finally {
        btn.disabled = false;
        if (btn.textContent === "Sent — we'll be in touch") {
          setTimeout(() => { btn.textContent = originalBtnText; }, 4000);
        }
      }
    });
  }
});
