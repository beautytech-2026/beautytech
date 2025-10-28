
  // گرفتن ref از URL (فقط اگر وجود داشته باشه)
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");

  if (ref) {
    // ذخیره ref در localStorage برای استفاده در همه صفحات
    localStorage.setItem("refCode", ref);
  }

  // اگر صفحه فعلی هیچ ref نداره ولی قبلاً یکی ذخیره شده، ref رو به لینک‌های داخلی اضافه کن (اختیاری)
  const savedRef = localStorage.getItem("refCode");
  if (savedRef) {
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      // فقط لینک‌های داخلی
      if (href && !href.startsWith('http') && !href.includes('ref=')) {
        const sep = href.includes('?') ? '&' : '?';
        a.setAttribute('href', href + sep + 'ref=' + encodeURIComponent(savedRef));
      }
    });
  }
