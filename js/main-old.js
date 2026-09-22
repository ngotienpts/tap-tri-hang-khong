document.addEventListener("DOMContentLoaded", function () {
    // Tập hợp tất cả các phần tử cần sử dụng
    const backTop = document.querySelector("#back-top");

    // Xử lý video tỉ lệ 16:9
    function handleVideo_16x9() {
        const video169s = document.querySelectorAll(".js__video169");
        if (video169s.length === 0) return;
        video169s.forEach((video169) => {
            var videos = video169.querySelectorAll("iframe");
            if (videos.length === 0) return;
            videos.forEach((video) => {
                var w = video.offsetWidth;
                video.style.height = (w * 9) / 16 + "px";
            });
        });
    }

    // Xử lý sự kiện scroll navbar mb
    function handleNavbarMb() {
        const navbarMb = document.querySelector(".js__navbarMenuMb");
        if (!navbarMb) return;

        const container = navbarMb.querySelector(".js__navbarMb");
        const scrollBtn = navbarMb.querySelector(".js__navbarIcon");

        let scrollAmount = 0;
        let scrollPosition = 0;

        scrollBtn.addEventListener("click", function () {
            const scrollDistance = 100;
            scrollAmount = scrollPosition + scrollDistance;
            scrollAmount = Math.min(
                scrollAmount,
                container.scrollWidth - container.clientWidth
            );
            container.scrollTo({
                left: scrollAmount,
                behavior: "smooth",
            });
            scrollPosition = scrollAmount;
        });
    }

    // Xử lý thay đổi ngôn ngữ
    function handleLanguageSwitch() {
        const langContainers = document.querySelectorAll(".js__languageContainer");
        if (!langContainers) return;
        
        langContainers.forEach((langContainer) => {
            var languageDefault = langContainer.querySelector(
                ".js__languageDefault"
            );
            var languageItems =
                langContainer.querySelectorAll(".js__languageItem");

            languageDefault.onclick = function () {
                this.classList.toggle("active");
            };

            languageItems.forEach((languageItem) => {
                var children = languageDefault.querySelector(
                    ".js__languageDefaultText"
                );
                languageItem.onclick = function () {
                    children.innerHTML = languageItem.innerHTML;
                    languageDefault.classList.remove("active");
                };
            });
        });
    }

    // menu more pc
    function handleMoreMenu() {
        const navbarMoreIcon = document.querySelector('.js__navbarMoreIcon');
        const navbarMoreContent = document.querySelector('.js__navbarMoreContent');

        // Nếu thiếu 1 trong 2 element thì dừng luôn, không báo lỗi
        if (!navbarMoreIcon || !navbarMoreContent) return;

        navbarMoreIcon.addEventListener('click', function(e) {
            e.stopPropagation(); // Ngăn sự kiện nổi bọt
            this.classList.toggle('active');
            navbarMoreContent.classList.toggle('active');
        });
    }

    // Xử lý slider 3 khối bài viết (Trái - Giữa - Phải)
    function initArticleSlider() {
        const getContainer = document.querySelector(".js__getArticleContainer");
        const slideContainer = document.querySelector(".js__setArticleContainer");

        // Nếu không có đủ 2 khối DOM lấy/hiển thị dữ liệu thì dừng
        if (!getContainer || !slideContainer) return;

        // 1. Quét dữ liệu từ các bài viết ẩn
        const articleNodes = getContainer.querySelectorAll(".js__getArticleItem");
        const articles = Array.from(articleNodes).map((node) => {
            const imgEl = node.querySelector(".js__getArticleImg img");
            const titleEl = node.querySelector(".js__getArticleTitle a");
            const descEl = node.querySelector(".js__getArticleDes p");

            return {
                img: imgEl ? imgEl.src : "",
                title: titleEl ? titleEl.innerText : "",
                link: titleEl ? titleEl.getAttribute("href") : "#",
                // Làm sạch khoảng trắng và dấu xuống dòng thừa để không bị lỗi sinh thẻ <br>
                desc: descEl ? descEl.innerText.replace(/\s+/g, " ").trim() : "",
            };
        });

        if (articles.length === 0) return;

        let currentIndex = 0;

        // Lấy các phần tử DOM hiển thị slide
        const slideLeft = slideContainer.querySelector(".slide-left");
        const slideCenter = slideContainer.querySelector(".slide-center");
        const slideRight = slideContainer.querySelector(".slide-right");

        const prevBtn = slideContainer.querySelector(".js__prevBtnSlide");
        const nextBtn = slideContainer.querySelector(".js__nextBtnSlide");

        // Hàm render dữ liệu vào 1 khối Article
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

            if (descEl) {
                descEl.innerText = articleData.desc;
            }
        }

        // 2. Cập nhật dữ liệu vào các slide cố định
        function updateSlider() {
            const total = articles.length;

            const leftIdx = (currentIndex - 1 + total) % total;
            const centerIdx = currentIndex;
            const rightIdx = (currentIndex + 1) % total;

            renderArticle(slideLeft, articles[leftIdx]);
            renderArticle(slideCenter, articles[centerIdx]);
            renderArticle(slideRight, articles[rightIdx]);
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % articles.length;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + articles.length) % articles.length;
            updateSlider();
        }

        // 3. Gán sự kiện click
        prevBtn?.addEventListener("click", (e) => {
            e.stopPropagation();
            prevSlide();
        });

        nextBtn?.addEventListener("click", (e) => {
            e.stopPropagation();
            nextSlide();
        });

        slideLeft?.addEventListener("click", prevSlide);
        slideRight?.addEventListener("click", nextSlide);

        // Khởi chạy slider lần đầu
        updateSlider();
    }

    // khởi tạo slider với nhiều item có width auto
    function initSliderAutoItems() {
        const autoSlides = document.querySelectorAll(".js__autoSlideContainer");
        if (autoSlides) {
            autoSlides.forEach((item) => {
                var slider = item.querySelector(".js__swiperAuto");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                new Swiper(slider, {
                    slidesPerView: "auto",
                    spaceBetween: 8,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                });
            });
        }
    }
    // Khởi tạo slider với một item
    function initSliderOneItems() {
        const oneSlides = document.querySelectorAll(".js__oneSlidesContainer");
        if (oneSlides) {
            oneSlides.forEach((item) => {
                var slider = item.querySelector(".js__oneSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");

                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    slidesPerGroup: 1,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi,
                        clickable: true,
                    },
                    // autoplay: {
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // },
                });
            });
        }
    }
    // Khởi tạo slider với 1 item secondary
    function initSliderOneItemsSecondary() {
        const oneSecondarySlides = document.querySelectorAll(".js__oneSecondarySlidesContainer");
        if (oneSecondarySlides) {
            oneSecondarySlides.forEach((item) => {
                var slider = item.querySelector(".js__oneSecondarySlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");

                new Swiper(slider, {
                    slidesPerView: 1.3,
                    spaceBetween: 10,
                    slidesPerGroup: 1,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi,
                        clickable: true,
                    },
                    // autoplay: {
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // },
                });
            });
        }
    }

    // Khởi tạo slider với 1 item tertiary
     function initSliderOneItemsTertiary() {
        const oneTertiarySlides = document.querySelectorAll(".js__oneTertiarySlidesContainer");
        if (oneTertiarySlides) {
            oneTertiarySlides.forEach((item) => {
                var slider = item.querySelector(".js__oneTertiarySlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");
                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    slidesPerGroup: 1,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi,
                        type: "progressbar",
                    },
                });
            });
        }
    }


    // khởi tạo slider với 2 item
    function initSliderTwoTertiaryItems() {
        const twoSlides = document.querySelectorAll(".js__twoTertiarySlidesContainer");
        if (twoSlides) {
            twoSlides.forEach((item) => {
                var slider = item.querySelector(".js__twoSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");
                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    slidesPerGroup: 1,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi || null,
                        clickable: true,
                    },
                    // autoplay: {
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // },
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 60,
                        }
                    },
                });
            });
        }
    }

    // Khởi tạo slider với 3 item
     function initSliderThreeItems() {
        const threeSlides = document.querySelectorAll(".js__threeSlidesContainer");
        if (threeSlides) {
            threeSlides.forEach((item) => {
                var slider = item.querySelector(".js__threeSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");
                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    slidesPerGroup: 1,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi,
                        type: "progressbar",
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        }
                    },
                });
            });
        }
    }

    // khởi tạo slider với 4 item
    function initSliderFourItems() {
        const fourSlides = document.querySelectorAll(".js__fourSlidesContainer");
        if (fourSlides) {
            fourSlides.forEach((item) => {
                var slider = item.querySelector(".js__fourSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");
                new Swiper(slider, {
                    slidesPerView: 2,
                    spaceBetween: 15,
                    slidesPerGroup: 1,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi || null,
                        clickable: true,
                    },
                    // autoplay: {
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // },
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 15,
                        }
                    },
                });
            });
        }
    }

    // khởi tạo slider với 4 item
    function initSliderFourItems() {
        const fourSlides = document.querySelectorAll(".js__fourSlidesContainer");
        if (fourSlides) {
            fourSlides.forEach((item) => {
                var slider = item.querySelector(".js__fourSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");
                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    slidesPerGroup: 1,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi || null,
                        clickable: true,
                    },
                    // autoplay: {
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // },
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        }
                    },
                });
            });
        }
    }
    // khởi tạo slider với 5 item
    function initSliderFiveItems() {
        const fiveSlides = document.querySelectorAll(".js__fiveSlidesContainer");
        if (fiveSlides) {
            fiveSlides.forEach((item) => {
                var slider = item.querySelector(".js__fiveSlide");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                var pagi = item.querySelector(".swiper-pagination");
                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    slidesPerGroup: 1,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi || null,
                        clickable: true,
                    },
                    // autoplay: {
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // },
                    breakpoints: {
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        }
                    },
                });
            });
        }
    }
    // khởi tạo slider với 6 item 2 hàng
    function initSliderSixItems() {
        const sixSlides = document.querySelectorAll(".js__sixSlidesContainer");
        
        if (sixSlides.length > 0) {
            sixSlides.forEach((item) => {
                const slider = item.querySelector(".js__sixSlide");
                const next = item.querySelector(".swiper-button-next");
                const prev = item.querySelector(".swiper-button-prev");
                const pagi = item.querySelector(".swiper-pagination");
                
                new Swiper(slider, {
                    slidesPerView: 2,   // Mobile: 2 cột x 2 hàng = 4 items
                    slidesPerGroup: 2,
                    grid: {
                        rows: 2,
                        fill: 'row'
                    },
                    spaceBetween: 10,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                    pagination: {
                        el: pagi || null,
                        clickable: true,
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 4,  // Tablet: 4 cột x 2 hàng = 8 items
                            slidesPerGroup: 4,
                            grid: { rows: 2 }
                        },
                        1024: {
                            slidesPerView: 6,  // PC: 6 cột x 2 hàng = 12 items
                            slidesPerGroup: 6,
                            spaceBetween: 20,
                            grid: { rows: 2 }
                        }
                    },
                });
            });
        }
    }


    // xử lý sự kiện show more menu
    function handleMoreMenu() {
        const navbarMoreIcon = document.querySelector('.js__navbarMoreIcon')
        const navbarMoreContent = document.querySelector('.js__navbarMoreContent')
        if(!navbarMoreIcon || !navbarMoreContent) return;

        navbarMoreIcon.onclick = function() {
            this.classList.toggle('active')
            navbarMoreContent.classList.toggle('active')
        }

    }


     // xử lý sự kiện để show sub menu
     function handleShowSubMenu() {
        
        const subMenu = document.querySelector(".js__clickShowMenuMb");
        if (!subMenu) return;
        var closeSubMenu = document.querySelector(".js__closeSubMenu");
        var overlay = document.querySelector(".js__overlay");
        var parentBox = subMenu.parentElement;

        subMenu.onclick = function () {
            this.parentElement.classList.add("active");
            document.querySelector("body").style.overflow = "hidden";
        };
        closeSubMenu.onclick = function () {
            parentBox.classList.remove("active");
            document.querySelector("body").style.overflow = "auto";
        };
        overlay.onclick = function () {
            parentBox.classList.remove("active");
            document.querySelector("body").style.overflow = "auto";
        };
    }

    // Xử lý sự kiện để show dropdown submenu
    function handleShowDropdownSubMenu() {
        const dropdownSubMenu = document.querySelectorAll(".js__dropDown");
            if (dropdownSubMenu.length === 0) return;
            dropdownSubMenu.forEach((item) => {
                var parent = item.parentElement;
                var nextEle = parent.parentElement.querySelector(".js__listSubMenu");
                item.onclick = function () {
                    parent.classList.toggle("active");
                    if (nextEle.style.maxHeight) {
                        nextEle.style.maxHeight = null;
                    } else {
                        nextEle.style.maxHeight = nextEle.scrollHeight + "px";
                    }
                };
            });
    }

    // Xử lý sự kiện show search mb
    function handleShowSearchMb() {
        const searchMbs = document.querySelectorAll(".js__searchMb");
        if (searchMbs.length === 0) return;
        searchMbs.forEach((searchMb) => {
            var closeSearchMb =
                document.querySelector(".js__closeSearchMb");
            var formSearchMb = document.querySelector(".js__formSearchMb");
            const focusElement =
                formSearchMb.querySelector(".js__focusSearchMb");
            searchMb.onclick = function () {
                formSearchMb.classList.add("active");
                focusElement.focus();
                
            };
            closeSearchMb.onclick = function () {
                formSearchMb.classList.remove("active");
                focusElement.value = "";
            };
        });
    }

    // xử lý sự kiện để show popupLogin
    function handleShowPopupLogin() {
        const showPopupLogins = document.querySelectorAll(".js__showPopupLogin");
        const popupLoginContainer = document.querySelector(".js__popupLoginContainer");

        if(popupLoginContainer && showPopupLogins) {

            const popupLogin = popupLoginContainer.querySelector(".js__popupLogin");
            const closePopupLogin = popupLoginContainer.querySelector(".js__closePopupLogin");
            const overlay = popupLoginContainer.querySelector(".js__overlay");
            
            if (showPopupLogins.length === 0) return;

                
            showPopupLogins.forEach((showPopupLogin)=>{

                showPopupLogin.onclick = function() {
                    popupLogin.classList.add('active')
                    overlay.classList.add('active')
                    document.querySelector("body").style.overflow = "hidden";
                }
    
                closePopupLogin.onclick = function () {
                    document.querySelector("body").style.overflow = "auto";
                    popupLogin.classList.remove('active')
                    overlay.classList.remove('active')
                    loginForm.classList.add('active')
                    registerForm.classList.remove('active')
                    forgotForm.classList.remove('active')
                };
    
                overlay.onclick = function () {
                    this.classList.remove("active");
                    document.querySelector("body").style.overflow = "auto";
                    popupLogin.classList.remove('active');
                    loginForm.classList.add('active')
                    registerForm.classList.remove('active')
                    forgotForm.classList.remove('active')
                };

                // change form login register forgot
                const loginContainerForm = document.querySelector(".js__loginContainerForm");

                if(!loginContainerForm) return

                const loginForm = loginContainerForm.querySelector('.js__loginForm')
                const registerForm = loginContainerForm.querySelector('.js__registerForm')
                const forgotForm = loginContainerForm.querySelector('.js__forgotForm')

                const loginBtn = registerForm.querySelector('.js__loginBtn')
                const registerBtn = loginForm.querySelector('.js__registerBtn')
                const forgotBtn = loginForm.querySelector('.js__forgotBtn')
                
                // login
                registerBtn.onclick = function() {
                    loginForm.classList.remove('active')
                    registerForm.classList.add('active')
                    forgotForm.classList.remove('active')
                }
                // register
                loginBtn.onclick = function() {
                    registerForm.classList.remove('active')
                    loginForm.classList.add('active')
                }
                // forgot
                forgotBtn.onclick = function() {
                    loginForm.classList.remove('active')
                    forgotForm.classList.add('active')
                }
            })

            
        }
        
        
    }
    

     // Xử lý tăng giảm font size
    function handleChangeFontSize() {
        const changeSizeButtonContainers = document.querySelectorAll('.js__changeSizeButton');

        if(changeSizeButtonContainers.length === 0) return

        changeSizeButtonContainers.forEach((changeSizeButtonContainer) => {
            const sizeDefault = changeSizeButtonContainer.querySelector('.js__defaultSize');
            const sizePlus = changeSizeButtonContainer.querySelector('.js__plusSize');
    
            const sizeContent = document.querySelector(".js__changeSizeContent");
            const paragraphs = sizeContent.querySelectorAll("p");
            let increaseCount = 0;
            const maxIncrease = 3;
    
            // Lưu kích thước mặc định ban đầu của từng thẻ <p>
            const defaultFontSizes = Array.from(paragraphs).map((p) =>
                parseInt(window.getComputedStyle(p).fontSize)
            );
    
            sizePlus.onclick = function () {
                if (increaseCount < maxIncrease) {
                    increaseCount++;
                    paragraphs.forEach((paragraph, index) => {
                        const newFontSize = defaultFontSizes[index] + increaseCount + "px";
                        paragraph.style.fontSize = newFontSize;
                    });
                }
            };
    
            sizeDefault.onclick = function () {
                if (increaseCount > 0) {
                    increaseCount--;
                    paragraphs.forEach((paragraph, index) => {
                        const newFontSize = defaultFontSizes[index] + increaseCount + "px";
                        paragraph.style.fontSize = newFontSize;
                    });
                }
            };
        });
    }
     // Xử lý full screen emagazine
    function handleFullScreenEma() {
        var widthDoc = document.querySelector("body");
        if(widthDoc){
            var expNoEditFull = document.querySelectorAll('[view="lg"]');
            expNoEditFull.forEach(function(a){
              a.style.width = widthDoc.clientWidth + 'px';
              a.style.marginLeft = '-' + a.offsetLeft + 'px';
            })
          }
    }


    // Xử lý thanh header dính
    function handleStickyHeader() {
        const stickyHeaderPC = document.querySelector(".js__stickyHeader");
        if (stickyHeaderPC) {
            const isSticky = scrollY > 300;
            stickyHeaderPC.classList.toggle("sticky", isSticky);
        }
    }

    // Xử lý sự kiện khi nhấn nút "back to top"
    function handleBackTop() {
    
        if (!backTop) return;

        backTop.onclick = function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };

    }

    // Xử lý hiển thị nút backTop dựa trên vị trí cuộn trang
    function handleBackTopVisibility() {
        if (backTop) {
            if (
                document.body.scrollTop > 300 ||
                document.documentElement.scrollTop > 300
            ) {
                backTop.style.opacity = 1;
                backTop.style.visibility = "visible";
            } else {
                backTop.style.opacity = 0;
                backTop.style.visibility = "hidden";
            }
        }
    }

    // Xử lý sự kiện khi cuộn trang
    function handleWindowScroll() {
        handleStickyHeader();
        handleBackTopVisibility()
    }

    // Khởi tạo tất cả các chức năng
    function initApp() {
        handleShowSubMenu();
        handleMoreMenu();
        handleShowDropdownSubMenu();
        handleShowSearchMb();
        handleLanguageSwitch();
        handleNavbarMb();
        
        // slide
        initSliderAutoItems();
        initSliderOneItems();
        initSliderOneItemsSecondary();
        initSliderOneItemsTertiary();
        initSliderTwoTertiaryItems();
        initSliderThreeItems();
        initSliderFourItems();
        initSliderFiveItems();
        initSliderSixItems();
        initArticleSlider(); // <--- Thêm dòng này vào đây
        // end slide
        
        handleBackTop();
        handleChangeFontSize();
        window.addEventListener('scroll', handleWindowScroll);
        window.addEventListener('resize', handleWindowScroll);
    }

    // Bắt đầu khởi tạo ứng dụng
    initApp();
});