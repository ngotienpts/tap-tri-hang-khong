document.addEventListener("DOMContentLoaded", () => {
    // 1. Quản lý trạng thái Scroll & Header/BackTop
    const backTop = document.querySelector("#back-top");
    const stickyHeaderPC = document.querySelector(".js__stickyHeader");
    let isTicking = false;

    function handleWindowScroll() {
        if (!isTicking) {
            requestAnimationFrame(() => {
                const currentScrollY = window.scrollY || document.documentElement.scrollTop;
                
                // Sticky Header
                if (stickyHeaderPC) {
                    stickyHeaderPC.classList.toggle("sticky", currentScrollY > 300);
                }

                // Back to top button
                if (backTop) {
                    const show = currentScrollY > 300;
                    backTop.style.opacity = show ? "1" : "0";
                    backTop.style.visibility = show ? "visible" : "hidden";
                }

                isTicking = false;
            });
            isTicking = true;
        }
    }

    function handleBackTop() {
        if (!backTop) return;
        backTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 2. Video 16:9
    function handleVideo_16x9() {
        const video169s = document.querySelectorAll(".js__video169");
        video169s.forEach((container) => {
            const videos = container.querySelectorAll("iframe");
            videos.forEach((video) => {
                const w = video.offsetWidth;
                video.style.height = `${(w * 9) / 16}px`;
            });
        });
    }

    // 3. Navbar Mobile Scroll
    function handleNavbarMb() {
        const navbarMb = document.querySelector(".js__navbarMenuMb");
        if (!navbarMb) return;

        const container = navbarMb.querySelector(".js__navbarMb");
        const scrollBtn = navbarMb.querySelector(".js__navbarIcon");
        if (!container || !scrollBtn) return;

        let scrollPosition = 0;
        scrollBtn.addEventListener("click", () => {
            const maxScroll = container.scrollWidth - container.clientWidth;
            scrollPosition = Math.min(scrollPosition + 100, maxScroll);
            container.scrollTo({ left: scrollPosition, behavior: "smooth" });
        });
    }

    // 4. Language Switch
    function handleLanguageSwitch() {
        const langContainers = document.querySelectorAll(".js__languageContainer");
        langContainers.forEach((langContainer) => {
            const languageDefault = langContainer.querySelector(".js__languageDefault");
            const languageItems = langContainer.querySelectorAll(".js__languageItem");
            const children = languageDefault?.querySelector(".js__languageDefaultText");

            if (!languageDefault) return;

            languageDefault.addEventListener("click", (e) => {
                e.stopPropagation();
                languageDefault.classList.toggle("active");
            });

            languageItems.forEach((item) => {
                item.addEventListener("click", () => {
                    if (children) children.innerHTML = item.innerHTML;
                    languageDefault.classList.remove("active");
                });
            });
        });
    }

    // 5. Desktop More Menu
    function handleMoreMenu() {
        const navbarMoreIcon = document.querySelector(".js__navbarMoreIcon");
        const navbarMoreContent = document.querySelector(".js__navbarMoreContent");
        if (!navbarMoreIcon || !navbarMoreContent) return;

        navbarMoreIcon.addEventListener("click", (e) => {
            e.stopPropagation();
            navbarMoreIcon.classList.toggle("active");
            navbarMoreContent.classList.toggle("active");
        });
    }

    // 6. Submenu & Drawer Mobile
    function handleShowSubMenu() {
        const subMenu = document.querySelector(".js__clickShowMenuMb");
        if (!subMenu) return;

        const closeSubMenu = document.querySelector(".js__closeSubMenu");
        const overlay = document.querySelector(".js__overlay");
        const parentBox = subMenu.parentElement;

        const closeMenu = () => {
            parentBox?.classList.remove("active");
            document.body.style.overflow = "auto";
        };

        subMenu.addEventListener("click", () => {
            parentBox?.classList.add("active");
            document.body.style.overflow = "hidden";
        });

        closeSubMenu?.addEventListener("click", closeMenu);
        overlay?.addEventListener("click", closeMenu);
    }

    function handleShowDropdownSubMenu() {
        const dropdownSubMenu = document.querySelectorAll(".js__dropDown");
        dropdownSubMenu.forEach((item) => {
            const parent = item.parentElement;
            const nextEle = parent?.parentElement?.querySelector(".js__listSubMenu");

            item.addEventListener("click", () => {
                parent?.classList.toggle("active");
                if (nextEle) {
                    nextEle.style.maxHeight = nextEle.style.maxHeight ? null : `${nextEle.scrollHeight}px`;
                }
            });
        });
    }

    // 7. Search Mobile
    function handleShowSearchMb() {
        const searchMbs = document.querySelectorAll(".js__searchMb");
        const formSearchMb = document.querySelector(".js__formSearchMb");
        const closeSearchMb = document.querySelector(".js__closeSearchMb");
        const focusElement = formSearchMb?.querySelector(".js__focusSearchMb");

        if (!formSearchMb) return;

        searchMbs.forEach((searchMb) => {
            searchMb.addEventListener("click", () => {
                formSearchMb.classList.add("active");
                focusElement?.focus();
            });
        });

        closeSearchMb?.addEventListener("click", () => {
            formSearchMb.classList.remove("active");
            if (focusElement) focusElement.value = "";
        });
    }

    // 8. Popup Login
    function handleShowPopupLogin() {
        const showPopupLogins = document.querySelectorAll(".js__showPopupLogin");
        const popupLoginContainer = document.querySelector(".js__popupLoginContainer");
        if (!popupLoginContainer || showPopupLogins.length === 0) return;

        const popupLogin = popupLoginContainer.querySelector(".js__popupLogin");
        const closePopupLogin = popupLoginContainer.querySelector(".js__closePopupLogin");
        const overlay = popupLoginContainer.querySelector(".js__overlay");

        const loginContainerForm = document.querySelector(".js__loginContainerForm");
        const loginForm = loginContainerForm?.querySelector(".js__loginForm");
        const registerForm = loginContainerForm?.querySelector(".js__registerForm");
        const forgotForm = loginContainerForm?.querySelector(".js__forgotForm");

        const loginBtn = registerForm?.querySelector(".js__loginBtn");
        const registerBtn = loginForm?.querySelector(".js__registerBtn");
        const forgotBtn = loginForm?.querySelector(".js__forgotBtn");

        const closePopup = () => {
            document.body.style.overflow = "auto";
            popupLogin?.classList.remove("active");
            overlay?.classList.remove("active");
            loginForm?.classList.add("active");
            registerForm?.classList.remove("active");
            forgotForm?.classList.remove("active");
        };

        showPopupLogins.forEach((btn) => {
            btn.addEventListener("click", () => {
                popupLogin?.classList.add("active");
                overlay?.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        });

        closePopupLogin?.addEventListener("click", closePopup);
        overlay?.addEventListener("click", closePopup);

        registerBtn?.addEventListener("click", () => {
            loginForm?.classList.remove("active");
            registerForm?.classList.add("active");
            forgotForm?.classList.remove("active");
        });

        loginBtn?.addEventListener("click", () => {
            registerForm?.classList.remove("active");
            loginForm?.classList.add("active");
        });

        forgotBtn?.addEventListener("click", () => {
            loginForm?.classList.remove("active");
            forgotForm?.classList.add("active");
        });
    }

    // 9. Change Font Size
    function handleChangeFontSize() {
        const changeSizeButtonContainers = document.querySelectorAll(".js__changeSizeButton");
        const sizeContent = document.querySelector(".js__changeSizeContent");
        if (!sizeContent || changeSizeButtonContainers.length === 0) return;

        const paragraphs = sizeContent.querySelectorAll("p");
        const defaultFontSizes = Array.from(paragraphs).map((p) =>
            parseInt(window.getComputedStyle(p).fontSize, 10)
        );

        changeSizeButtonContainers.forEach((container) => {
            const sizeDefault = container.querySelector(".js__defaultSize");
            const sizePlus = container.querySelector(".js__plusSize");
            let increaseCount = 0;
            const maxIncrease = 3;

            const applySize = () => {
                paragraphs.forEach((p, index) => {
                    p.style.fontSize = `${defaultFontSizes[index] + increaseCount}px`;
                });
            };

            sizePlus?.addEventListener("click", () => {
                if (increaseCount < maxIncrease) {
                    increaseCount++;
                    applySize();
                }
            });

            sizeDefault?.addEventListener("click", () => {
                if (increaseCount > 0) {
                    increaseCount--;
                    applySize();
                }
            });
        });
    }

    // 10. Article Slider (Custom HTML Center Slider)
    function initArticleSlider() {
        const getContainer = document.querySelector(".js__getArticleContainer");
        const slideContainer = document.querySelector(".js__setArticleContainer");
        if (!getContainer || !slideContainer) return;

        const articleNodes = getContainer.querySelectorAll(".js__getArticleItem");
        const articles = Array.from(articleNodes).map((node) => ({
            img: node.querySelector(".js__getArticleImg img")?.src || "",
            title: node.querySelector(".js__getArticleTitle a")?.innerText || "",
            link: node.querySelector(".js__getArticleTitle a")?.getAttribute("href") || "#",
            desc: node.querySelector(".js__getArticleDes p")?.innerText.replace(/\s+/g, " ").trim() || "",
        }));

        if (articles.length === 0) return;

        let currentIndex = 0;
        const slideLeft = slideContainer.querySelector(".slide-left");
        const slideCenter = slideContainer.querySelector(".slide-center");
        const slideRight = slideContainer.querySelector(".slide-right");
        const prevBtn = slideContainer.querySelector(".js__prevBtnSlide");
        const nextBtn = slideContainer.querySelector(".js__nextBtnSlide");

        function renderArticle(container, articleData) {
            if (!container || !articleData) return;
            const imgEl = container.querySelector(".js__setArticleImg img");
            const titleLinkEl = container.querySelector(".js__setArticleTitle a");
            const descEl = container.querySelector(".js__setArticleDes p");

            if (imgEl) imgEl.src = articleData.img;
            if (titleLinkEl) {
                titleLinkEl.innerText = articleData.title;
                titleLinkEl.setAttribute("href", articleData.link);
            }
            if (descEl) descEl.innerText = articleData.desc;
        }

        function updateSlider() {
            const total = articles.length;
            renderArticle(slideLeft, articles[(currentIndex - 1 + total) % total]);
            renderArticle(slideCenter, articles[currentIndex]);
            renderArticle(slideRight, articles[(currentIndex + 1) % total]);
        }

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % articles.length;
            updateSlider();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + articles.length) % articles.length;
            updateSlider();
        };

        prevBtn?.addEventListener("click", (e) => { e.stopPropagation(); prevSlide(); });
        nextBtn?.addEventListener("click", (e) => { e.stopPropagation(); nextSlide(); });
        slideLeft?.addEventListener("click", prevSlide);
        slideRight?.addEventListener("click", nextSlide);

        updateSlider();
    }

    // 11. Helper Khởi tạo Swiper Sliders
    function createSwipers(containerSelector, slideSelector, options) {
        const containers = document.querySelectorAll(containerSelector);
        containers.forEach((container) => {
            const slider = container.querySelector(slideSelector);
            if (!slider) return;

            const next = container.querySelector(".swiper-button-next");
            const prev = container.querySelector(".swiper-button-prev");
            const pagi = container.querySelector(".swiper-pagination");

            new Swiper(slider, {
                navigation: { nextEl: next || null, prevEl: prev || null },
                pagination: pagi ? { el: pagi, clickable: true, ...options.pagination } : false,
                ...options,
            });
        });
    }

    function initAllSwipers() {
        createSwipers(".js__autoSlideContainer", ".js__swiperAuto", { slidesPerView: "auto", spaceBetween: 8 });
        createSwipers(".js__oneSlidesContainer", ".js__oneSlide", { slidesPerView: 1, spaceBetween: 10 });
        createSwipers(".js__oneSecondarySlidesContainer", ".js__oneSecondarySlide", { slidesPerView: 1.3, spaceBetween: 10 });
        createSwipers(".js__oneTertiarySlidesContainer", ".js__oneTertiarySlide", { slidesPerView: 1, spaceBetween: 20, pagination: { type: "progressbar" } });
        createSwipers(".js__twoTertiarySlidesContainer", ".js__twoSlide", {
            slidesPerView: 1, spaceBetween: 20,
            breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 2, spaceBetween: 60 } }
        });
        createSwipers(".js__threeSlidesContainer", ".js__threeSlide", {
            slidesPerView: 1, spaceBetween: 20, pagination: { type: "progressbar" },
            breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3, spaceBetween: 24 } }
        });
        createSwipers(".js__fourSlidesContainer", ".js__fourSlide", {
            slidesPerView: 1, spaceBetween: 10,
            breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 4, spaceBetween: 20 } }
        });
        createSwipers(".js__fiveSlidesContainer", ".js__fiveSlide", {
            slidesPerView: 1, spaceBetween: 10,
            breakpoints: { 768: { slidesPerView: 3 }, 1024: { slidesPerView: 5, spaceBetween: 20 } }
        });
        createSwipers(".js__sixSlidesContainer", ".js__sixSlide", {
            slidesPerView: 2, slidesPerGroup: 2, grid: { rows: 2, fill: "row" }, spaceBetween: 10,
            breakpoints: {
                768: { slidesPerView: 4, slidesPerGroup: 4, grid: { rows: 2 } },
                1024: { slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 20, grid: { rows: 2 } }
            }
        });
    }

    // Khởi tạo tất cả ứng dụng
    function initApp() {
        handleShowSubMenu();
        handleMoreMenu();
        handleShowDropdownSubMenu();
        handleShowSearchMb();
        handleLanguageSwitch();
        handleNavbarMb();
        handleVideo_16x9();
        handleShowPopupLogin();
        handleChangeFontSize();
        handleBackTop();

        // Sliders
        initAllSwipers();
        initArticleSlider();

        // Global Window Events
        window.addEventListener("scroll", handleWindowScroll, { passive: true });
        window.addEventListener("resize", handleWindowScroll, { passive: true });
    }

    initApp();
});