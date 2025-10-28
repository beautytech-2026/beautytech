// ref-handler.js
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
  
    if (ref) {
      // اگر در لینک وجود داشت، ذخیره کن
      localStorage.setItem("refCode", ref);
    }
  
    // همه لینک‌ها رو طوری تغییر بده که ref همیشه باهاشون بره
    const savedRef = localStorage.getItem("refCode");
    if (savedRef) {
      document.querySelectorAll("a").forEach(link => {
        const url = new URL(link.href, window.location.origin);
        if (!url.searchParams.has("ref")) {
          url.searchParams.set("ref", savedRef);
          link.href = url.toString();
        }
      });
    }
  });
  