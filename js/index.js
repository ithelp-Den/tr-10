document.querySelectorAll(".accordion-header").forEach(button => {
    button.addEventListener("click", () => {
        const accordionItem = button.parentElement;

        // Закриваємо всі інші
        document.querySelectorAll(".accordion-item").forEach(item => {
            if (item !== accordionItem) {
                item.classList.remove("active");
            }
        });

        // Перемикаємо поточний
        accordionItem.classList.toggle("active");
    });
});

document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
    const slider = wrapper.querySelector('.slider');
    const slides = Array.from(wrapper.querySelectorAll('.slide'));
    const prevBtn = wrapper.querySelector('#prev');
    const nextBtn = wrapper.querySelector('#next');
    const progressBar = wrapper.querySelector('.progress-bar');

    if (!slider || !prevBtn || !nextBtn || slides.length === 0) {
      console.error("Slider elements not found in wrapper:", wrapper);
      return;
    }

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    firstClone.classList.add('clone', 'first-clone');
    lastClone.classList.add('clone', 'last-clone');
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    let index = 1; 
    let step = getStep();
    let isTransitioning = false;

    function getStep() {
        return true ? 28.2 : 33.3;
    }

    function updateSlider(animate = true) {
        if (animate) slider.style.transition = 'transform 0.4s ease-in-out';
        else slider.style.transition = 'none';

        if (true) {
            slider.style.transform = `translateX(-${index * step}rem)`;
        } else {
            slider.style.transform = `translateX(-${index * step}%)`;
        }


        if (progressBar) {

            let displayIndex = index;
            if (index === 0) displayIndex = slides.length;
            if (index > slides.length) displayIndex = 1;
            const progress = ((displayIndex - 1) / slides.length) * 100;

            progressBar.style.width = `${Math.max(0, Math.min(progress, 100))}%`;
        }
    }

    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        index++;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        index--;
        updateSlider();
    });


    slider.addEventListener('transitionend', () => {
        let needsReset = false;
        let resetToIndex = index;


        if (index === slides.length + 1) {
            resetToIndex = 1; 
            needsReset = true;
        }

        else if (index === 0) {
            resetToIndex = slides.length;
            needsReset = true;
        }

        if (needsReset) {

            setTimeout(() => {
                index = resetToIndex; 
                updateSlider(false); 
                isTransitioning = false;
            }, 0); 
        } else {

            isTransitioning = false;
        }
    });

    let startX = 0;
    let moveX = 0;
    let isSwiping = false;

    slider.addEventListener('touchstart', e => {
 
        if (isTransitioning) return;
        startX = e.touches[0].clientX;

        isSwiping = true;
    }, { passive: true }); // Додаємо passive: true

    slider.addEventListener('touchmove', e => {
        if (!isSwiping) return;
        moveX = e.touches[0].clientX - startX;
     }, { passive: true }); // Додаємо passive: true

    slider.addEventListener('touchend', () => {
        if (!isSwiping) return;
        isSwiping = false;
        if (moveX < -50) {

            if (!isTransitioning) nextBtn.click();
        } else if (moveX > 50) {

            if (!isTransitioning) prevBtn.click();
        } else {

        }
        moveX = 0;
    });

    window.addEventListener('resize', () => {
        step = getStep();
        updateSlider(false);
    });

    updateSlider(false);
});

window.addEventListener('scroll', function() {
    let comBox = document.querySelector('.c6-flying-div1');
    let comBox2 = document.querySelector('.c6-flying-div2');
    let comBox3 = document.querySelector('.c6-flying-div3');
    let comBox4 = document.querySelector('.c6-flying-div4');

    let scrollPosition = window.scrollY;
    let pageHeight = document.documentElement.scrollHeight;
    let viewportHeight = window.innerHeight;

    let triggerPoint1 = pageHeight * 0.8;
    let triggerPoint2 = pageHeight * 0.8;
    if (true) {
        triggerPoint1 = pageHeight * 0.79;
        triggerPoint2 = pageHeight * 0.79;
    }

    if (scrollPosition > triggerPoint1) {
        comBox.classList.add('visible3');
    } else {
        comBox.classList.remove('visible3');
    }

    if (scrollPosition > triggerPoint2) {
        comBox2.classList.add('visible4');
        comBox3.classList.add('visible5');
        comBox4.classList.add('visible6');
    } else {
        comBox2.classList.remove('visible4');
        comBox3.classList.remove('visible5');
        comBox4.classList.remove('visible6');
    }
});
