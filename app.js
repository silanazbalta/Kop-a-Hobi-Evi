document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // === SCROLL ANİMASYONU (Intersection Observer) ===
    // =========================================
    const observerElements = document.querySelectorAll('.animate-on-scroll');
    
    // Gözlemci ayarları: Öğenin %20'si ekrana girdiğinde tetikle
    const observerOptions = { 
        root: null, 
        rootMargin: '0px', 
        threshold: 0.2 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ekrana girince 'is-visible' sınıfını ekle
                entry.target.classList.add('is-visible');
                // Animasyonun sadece bir kez çalışması için gözlemlemeyi bırak
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animasyon eklenecek her bir öğeyi gözlemlemeye başla
    observerElements.forEach(element => {
        observer.observe(element);
    });

    // =========================================
    // === TESTIMONIAL KARUSEL (Slider) İŞLEVİ ===
    // =========================================
    const items = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    function updateSlider() {
        // Tüm öğeleri ve noktaları varsayılan (pasif) hale getir
        items.forEach((item, index) => {
            item.classList.remove('active');
            dots[index].classList.remove('active');
        });

        // Mevcut öğeyi ve noktayı aktif yap
        items[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Sağ oka tıklandığında: Bir sonraki yoruma geç
    rightArrow.addEventListener('click', () => {
        // Dizi sonuna gelindiğinde başa dön (modulo operatörü)
        currentIndex = (currentIndex + 1) % items.length;
        updateSlider();
    });

    // Sol oka tıklandığında: Bir önceki yoruma geç
    leftArrow.addEventListener('click', () => {
        // Dizi başına gelindiğinde sona dön
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateSlider();
    });

    // Noktalara tıklandığında: İlgili yoruma atla
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Sayfa yüklendiğinde karuseli başlat (currentIndex = 0)
    updateSlider(); 
});