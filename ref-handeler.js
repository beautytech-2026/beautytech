
(function() {
  try {
    // ۱. ref را از URL بخوان
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    // ۲. اگر در URL بود، در localStorage ذخیره کن
    if (ref) {
      localStorage.setItem("refCode", ref);
    }

    // ۳. ref ذخیره‌شده را بگیر
    const savedRef = localStorage.getItem("refCode");

    // ۴. تمام لینک‌های صفحه را بررسی کن
    if (savedRef) {
      document.querySelectorAll("a[href]").forEach(link => {
        try {
          // فقط لینک‌هایی که http یا .html دارند
          const href = link.getAttribute("href");
          if (href.startsWith("javascript:") || href.startsWith("#")) return;

          const url = new URL(href, window.location.origin);

          // اگر ref وجود ندارد، اضافه کن
          if (!url.searchParams.has("ref")) {
            url.searchParams.set("ref", savedRef);
            link.href = url.toString();
          }
        } catch (err) {
          // لینک نامعتبر؟ بی‌خیالش شو
        }
      });
    }

    // ۵. اگر slider نبود یا خطا داد، نذار کل JS بترکه
    window.addEventListener("error", (e) => {
      console.warn("⚠️ JavaScript error ignored:", e.message);
      e.preventDefault();
    });

  } catch (err) {
    console.error("Error in ref-handler.js:", err);
  }
})();
