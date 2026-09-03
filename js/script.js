/* =========================================================
   DISCOVER BIHAR — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       1. NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* =====================================================
       2. ACTIVE NAVIGATION
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(".navbar-nav a.nav-link")
        .forEach(function (link) {

            const href =
                link.getAttribute("href");

            if (!href) return;

            const linkPage =
                href
                    .split("/")
                    .pop()
                    .split("#")[0]
                    .toLowerCase();

            if (
                linkPage &&
                linkPage === currentPage
            ) {

                link.classList.add("active");

            }

        });


    /* =====================================================
       3. MOBILE NAVBAR AUTO CLOSE
       ===================================================== */

    const navbarCollapse =
        document.querySelector(
            ".navbar-collapse"
        );


    if (
        navbarCollapse &&
        typeof bootstrap !== "undefined"
    ) {

        const mobileLinks =
            navbarCollapse.querySelectorAll(
                ".nav-link:not(.dropdown-toggle)"
            );


        mobileLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (
                        window.innerWidth < 992 &&
                        navbarCollapse.classList.contains(
                            "show"
                        )
                    ) {

                        const collapse =
                            bootstrap.Collapse.getOrCreateInstance(
                                navbarCollapse
                            );

                        collapse.hide();

                    }

                }
            );

        });

    }


    /* =====================================================
       4. SMOOTH SCROLL
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       5. SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-title, " +
            ".story-content, " +
            ".heritage-card, " +
            ".hidden-card, " +
            ".food-card, " +
            ".festival-card, " +
            ".culture-card, " +
            ".personality-card, " +
            ".gallery-item, " +
            ".explore-card, " +
            ".experience-card, " +
            ".travel-card, " +
            ".about-pillar-card, " +
            ".about-tech-card, " +
            ".about-highlight"
        );


    revealElements.forEach(
        function (element, index) {

            element.classList.add(
                "reveal"
            );


            element.style.setProperty(
                "--reveal-delay",
                (index % 4) * 100 + "ms"
            );

        }
    );


    if (
        revealElements.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (
                    entries,
                    observer
                ) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.08,

                    rootMargin:
                        "0px 0px -30px 0px"
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );


    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }


    /* =====================================================
       6. BACK TO TOP
       ===================================================== */

    const backToTop =
        document.querySelector(
            ".back-to-top"
        );


    if (backToTop) {

        function updateBackToTop() {

            if (window.scrollY > 500) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        }


        updateBackToTop();


        window.addEventListener(
            "scroll",
            updateBackToTop,
            {
                passive: true
            }
        );

    }


    /* =====================================================
       7. COUNTER ANIMATION
       ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    if (
        counters.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                function (
                    entries,
                    observer
                ) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const counter =
                                entry.target;


                            const target =
                                Number(
                                    counter.dataset.counter
                                );


                            if (
                                Number.isNaN(
                                    target
                                )
                            ) {
                                return;
                            }


                            let current = 0;

                            const duration = 1400;

                            const steps =
                                duration / 16;

                            const increment =
                                target / steps;


                            function updateCounter() {

                                current +=
                                    increment;


                                if (
                                    current >=
                                    target
                                ) {

                                    counter.textContent =
                                        target.toLocaleString();

                                    return;

                                }


                                counter.textContent =
                                    Math.floor(
                                        current
                                    ).toLocaleString();


                                requestAnimationFrame(
                                    updateCounter
                                );

                            }


                            updateCounter();


                            observer.unobserve(
                                counter
                            );

                        }
                    );

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(
            function (counter) {

                counterObserver.observe(
                    counter
                );

            }
        );

    }


    /* =====================================================
       8. GALLERY LIGHTBOX
       ===================================================== */

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    if (galleryItems.length > 0) {

        const lightbox =
            document.createElement(
                "div"
            );


        lightbox.className =
            "gallery-lightbox";


        lightbox.innerHTML = `
            <button
                class="gallery-lightbox-close"
                aria-label="Close gallery">
                <i class="bi bi-x-lg"></i>
            </button>

            <button
                class="gallery-lightbox-prev"
                aria-label="Previous image">
                <i class="bi bi-chevron-left"></i>
            </button>

            <div class="gallery-lightbox-content">

                <img
                    class="gallery-lightbox-image"
                    src=""
                    alt="">

            </div>

            <button
                class="gallery-lightbox-next"
                aria-label="Next image">
                <i class="bi bi-chevron-right"></i>
            </button>
        `;


        document.body.appendChild(
            lightbox
        );


        const lightboxImage =
            lightbox.querySelector(
                ".gallery-lightbox-image"
            );


        const closeButton =
            lightbox.querySelector(
                ".gallery-lightbox-close"
            );


        const previousButton =
            lightbox.querySelector(
                ".gallery-lightbox-prev"
            );


        const nextButton =
            lightbox.querySelector(
                ".gallery-lightbox-next"
            );


        let currentGalleryIndex = 0;


        function openGallery(index) {

            currentGalleryIndex = index;


            const item =
                galleryItems[
                    currentGalleryIndex
                ];


            const image =
                item.querySelector(
                    "img"
                );


            if (!image) return;


            lightboxImage.src =
                image.currentSrc ||
                image.src;


            lightboxImage.alt =
                image.alt ||
                "Bihar heritage image";


            lightbox.classList.add(
                "active"
            );


            document.body.classList.add(
                "lightbox-open"
            );

        }


        function closeGallery() {

            lightbox.classList.remove(
                "active"
            );


            document.body.classList.remove(
                "lightbox-open"
            );

        }


        function previousImage() {

            currentGalleryIndex--;


            if (
                currentGalleryIndex < 0
            ) {

                currentGalleryIndex =
                    galleryItems.length - 1;

            }


            openGallery(
                currentGalleryIndex
            );

        }


        function nextImage() {

            currentGalleryIndex++;


            if (
                currentGalleryIndex >=
                galleryItems.length
            ) {

                currentGalleryIndex = 0;

            }


            openGallery(
                currentGalleryIndex
            );

        }


        galleryItems.forEach(
            function (item, index) {

                item.style.cursor =
                    "zoom-in";


                item.addEventListener(
                    "click",
                    function () {

                        openGallery(
                            index
                        );

                    }
                );

            }
        );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeGallery
            );

        }


        if (previousButton) {

            previousButton.addEventListener(
                "click",
                previousImage
            );

        }


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                nextImage
            );

        }


        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeGallery();

                }

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    !lightbox.classList.contains(
                        "active"
                    )
                ) {
                    return;
                }


                if (
                    event.key ===
                    "Escape"
                ) {

                    closeGallery();

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    previousImage();

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    nextImage();

                }

            }
        );

    }


    /* =====================================================
       9. EXPLORE BIHAR
       ===================================================== */

    const experienceCards =
        document.querySelectorAll(
            ".experience-card[data-explore]"
        );


    const explorePanel =
        document.getElementById(
            "exploreInfoPanel"
        );


    const exploreTitle =
        document.getElementById(
            "exploreInfoTitle"
        );


    const exploreText =
        document.getElementById(
            "exploreInfoText"
        );


    const exploreLink =
        document.getElementById(
            "exploreInfoLink"
        );


    const previousButton =
        document.querySelector(
            ".explorer-prev"
        );


    const nextButton =
        document.querySelector(
            ".explorer-next"
        );


    const exploreData = {

        heritage: {

            title:
                "Ancient Heritage",

            text:
                "Walk through ancient universities, sacred sites, historic cities and monuments that connect Bihar with some of the oldest chapters in Indian history.",

            link:
                "pages/historical-places.html"

        },


        hidden: {

            title:
                "Hidden Escapes",

            text:
                "Discover waterfalls, forests, hills, riverside landscapes and quieter destinations that reveal a different side of Bihar.",

            link:
                "pages/hidden-places.html"

        },


        culture: {

            title:
                "Living Culture",

            text:
                "Experience Madhubani art, traditional crafts, folk traditions, rituals and cultural expressions that continue to evolve across Bihar.",

            link:
                "pages/art-culture.html"

        },


        food: {

            title:
                "Taste Bihar",

            text:
                "From litti chokha to khaja and traditional festive sweets, explore flavours that carry stories of Bihar's homes, streets and celebrations.",

            link:
                "pages/food.html"

        }

    };


    let activeExperience = 0;


    /* =====================================================
       UPDATE EXPLORE PANEL
       ===================================================== */

    function updateExploreExperience(
        index
    ) {

        /*
         * Safety check
         */

        if (
            experienceCards.length === 0 ||
            !explorePanel ||
            !exploreTitle ||
            !exploreText ||
            !exploreLink
        ) {

            console.warn(
                "Explore Bihar elements not found."
            );

            return;

        }


        /*
         * Loop backward
         */

        if (index < 0) {

            index =
                experienceCards.length - 1;

        }


        /*
         * Loop forward
         */

        if (
            index >=
            experienceCards.length
        ) {

            index = 0;

        }


        activeExperience =
            index;


        const activeCard =
            experienceCards[
                activeExperience
            ];


        if (!activeCard) return;


        const experienceType =
            activeCard.dataset.explore;


        const experience =
            exploreData[
                experienceType
            ];


        if (!experience) {

            console.warn(
                "Unknown Explore experience:",
                experienceType
            );

            return;

        }


        /*
         * Change panel content
         */

        exploreTitle.textContent =
            experience.title;


        exploreText.textContent =
            experience.text;


        exploreLink.href =
            experience.link;


        /*
         * Active card
         */

        experienceCards.forEach(
            function (card) {

                card.classList.remove(
                    "explore-active"
                );

            }
        );


        activeCard.classList.add(
            "explore-active"
        );


        /*
         * Animation
         */

        explorePanel.classList.remove(
            "panel-changing"
        );


        void explorePanel.offsetWidth;


        explorePanel.classList.add(
            "panel-visible"
        );

    }


    /* =====================================================
       EXPLORE CARD CLICK
       ===================================================== */

    if (
        experienceCards.length > 0 &&
        explorePanel &&
        exploreTitle &&
        exploreText &&
        exploreLink
    ) {

        experienceCards.forEach(
            function (card, index) {

                card.addEventListener(
                    "click",
                    function (event) {

                        /*
                         * IMPORTANT:
                         * Prevent the <a> card from
                         * immediately navigating.
                         */

                        event.preventDefault();


                        /*
                         * Stop parent handlers.
                         */

                        event.stopPropagation();


                        /*
                         * Change experience.
                         */

                        updateExploreExperience(
                            index
                        );

                    }
                );

            }
        );


        /* =================================================
           INITIAL EXPERIENCE
           ================================================= */

        updateExploreExperience(0);

    }


    /* =====================================================
       PREVIOUS EXPERIENCE
       ===================================================== */

    if (
        previousButton &&
        experienceCards.length > 0
    ) {

        previousButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                updateExploreExperience(
                    activeExperience - 1
                );

            }
        );

    }


    /* =====================================================
       NEXT EXPERIENCE
       ===================================================== */

    if (
        nextButton &&
        experienceCards.length > 0
    ) {

        nextButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                updateExploreExperience(
                    activeExperience + 1
                );

            }
        );

    }


    /* =====================================================
       EXPLORE PANEL LINK
       ===================================================== */

    if (exploreLink) {

        exploreLink.addEventListener(
            "click",
            function () {

                /*
                 * Do NOT prevent default.
                 *
                 * Browser will follow the
                 * dynamically assigned href.
                 */

                console.log(
                    "Opening:",
                    exploreLink.href
                );

            }
        );

    }


    /* =====================================================
   TRAVEL ITINERARY — INTERACTIVE TABS
   ===================================================== */

const travelTabs =
    document.querySelectorAll(
        ".travel-day-tab[data-day]"
    );

const travelPanels =
    document.querySelectorAll(
        ".travel-itinerary-panel[data-day-panel]"
    );


if (
    travelTabs.length > 0 &&
    travelPanels.length > 0
) {

    function showTravelDay(day) {

        const selectedDay =
            String(day);


        travelTabs.forEach(function (tab) {

            const active =
                tab.dataset.day ===
                selectedDay;


            tab.classList.toggle(
                "active",
                active
            );


            tab.setAttribute(
                "aria-selected",
                active
                    ? "true"
                    : "false"
            );

        });


        travelPanels.forEach(
            function (panel) {

                const active =
                    panel.dataset.dayPanel ===
                    selectedDay;


                if (active) {

                    panel.hidden = false;

                    panel.classList.remove(
                        "travel-panel-refresh"
                    );

                    void panel.offsetWidth;

                    panel.classList.add(
                        "travel-panel-refresh"
                    );

                } else {

                    panel.hidden = true;

                    panel.classList.remove(
                        "travel-panel-refresh"
                    );

                }

            }
        );

    }


    travelTabs.forEach(
        function (tab) {

            tab.addEventListener(
                "click",
                function () {

                    showTravelDay(
                        tab.dataset.day
                    );

                }
            );

        }
    );


    travelTabs.forEach(
        function (tab, index) {

            tab.addEventListener(
                "keydown",
                function (event) {

                    let newIndex = index;


                    if (
                        event.key ===
                        "ArrowRight"
                    ) {

                        newIndex =
                            (index + 1) %
                            travelTabs.length;

                    }


                    if (
                        event.key ===
                        "ArrowLeft"
                    ) {

                        newIndex =
                            (
                                index -
                                1 +
                                travelTabs.length
                            ) %
                            travelTabs.length;

                    }


                    if (
                        newIndex !== index
                    ) {

                        event.preventDefault();


                        const nextTab =
                            travelTabs[
                                newIndex
                            ];


                        showTravelDay(
                            nextTab.dataset.day
                        );


                        nextTab.focus();

                    }

                }
            );

        }
    );


    /* Start with Day 1 */

    showTravelDay(1);

}


    /* =====================================================
       11. CURRENT YEAR
       ===================================================== */

    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    new Date()
                        .getFullYear();

            }
        );


    /* =====================================================
       12. IMAGE LOADING
       ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(
            function (image) {

                if (image.complete) {

                    image.classList.add(
                        "loaded"
                    );

                } else {

                    image.addEventListener(
                        "load",
                        function () {

                            image.classList.add(
                                "loaded"
                            );

                        },
                        {
                            once: true
                        }
                    );

                }


                image.addEventListener(
                    "error",
                    function () {

                        image.classList.add(
                            "image-error"
                        );

                    },
                    {
                        once: true
                    }
                );

            }
        );


        /* =====================================================
   10. SMART SITE SEARCH
   ===================================================== */

const openSearchButton =
    document.getElementById("openSearch");

const closeSearchButton =
    document.getElementById("closeSearch");

const searchOverlay =
    document.getElementById(
        "siteSearchOverlay"
    );

const searchInput =
    document.getElementById(
        "siteSearchInput"
    );

const searchResults =
    document.getElementById(
        "siteSearchResults"
    );


const searchData = [

    {
        title: "Mahabodhi Temple",
        category: "Historical Places",
        description:
            "Explore one of Bihar's most important heritage sites in Bodh Gaya.",
        url:
            "pages/historical-places.html#mahabodhi"
    },

    {
        title: "Nalanda Mahavihara",
        category: "Historical Places",
        description:
            "Discover the ancient centre of learning at Nalanda.",
        url:
            "pages/historical-places.html#nalanda"
    },

    {
        title: "Rajgir",
        category: "Historical Places",
        description:
            "Explore the hills, heritage and ancient landscape of Rajgir.",
        url:
            "pages/historical-places.html#rajgir"
    },

    {
        title: "Golghar",
        category: "Historical Places",
        description:
            "Discover one of Patna's best-known historic landmarks.",
        url:
            "pages/historical-places.html#golghar"
    },

    {
        title: "Hidden Bihar",
        category: "Heritage",
        description:
            "Find waterfalls, forests, hills and lesser-known destinations.",
        url:
            "pages/hidden-places.html"
    },

    {
        title: "Madhubani Art",
        category: "Art & Culture",
        description:
            "Explore Bihar's famous traditional painting tradition.",
        url:
            "pages/art-culture.html"
    },

    {
        title: "Sujuni",
        category: "Art & Culture",
        description:
            "Discover Bihar's traditional embroidery craft.",
        url:
            "pages/art-culture.html"
    },

    {
        title: "Sikki Craft",
        category: "Art & Culture",
        description:
            "Explore the traditional craft made from golden-hued grass.",
        url:
            "pages/art-culture.html"
    },

    {
        title: "Chhath Puja",
        category: "Festivals",
        description:
            "Experience one of Bihar's most important cultural festivals.",
        url:
            "pages/festivals.html#chhath-story"
    },

    {
        title: "Sonepur Mela",
        category: "Festivals",
        description:
            "Discover the famous fair and its cultural traditions.",
        url:
            "pages/festivals.html#sonepur-story"
    },

    {
        title: "Litti Chokha",
        category: "Food",
        description:
            "Taste Bihar's iconic smoky litti and chokha.",
        url:
            "pages/food.html#litti"
    },

    {
        title: "Khaja",
        category: "Food",
        description:
            "Explore the delicate layered sweet associated with Bihar.",
        url:
            "pages/food.html#khaja"
    },

    {
        title: "Thekua",
        category: "Food",
        description:
            "Discover the traditional festive sweet of Bihar.",
        url:
            "pages/food.html#thekua"
    },

    {
        title: "Malpua",
        category: "Food",
        description:
            "Explore Bihar's traditional sweet delicacy.",
        url:
            "pages/food.html#malpua"
    },

    {
        title: "Famous Personalities",
        category: "People",
        description:
            "Meet personalities connected with Bihar's intellectual and cultural history.",
        url:
            "pages/personalities.html"
    },

    {
        title: "Gallery",
        category: "Visual Journey",
        description:
            "Browse photographs from across Bihar.",
        url:
            "pages/gallery.html"
    },

    {
        title: "Travel Bihar",
        category: "Travel",
        description:
            "Plan your journey through Bihar.",
        url:
            "pages/travel.html"
    },

    {
        title: "Explore Bihar",
        category: "Discover",
        description:
            "Explore Bihar by heritage, culture, hidden escapes and food.",
        url:
            "pages/explore.html"
    }

];


function renderSearchResults(query) {

    if (!searchResults) return;


    const cleanQuery =
        query.trim().toLowerCase();


    if (!cleanQuery) {

        searchResults.innerHTML = `
            <p class="search-empty">
                Start typing to explore Bihar.
            </p>
        `;

        return;
    }


    const matches =
        searchData.filter(function (item) {

            return (
                item.title
                    .toLowerCase()
                    .includes(cleanQuery) ||

                item.category
                    .toLowerCase()
                    .includes(cleanQuery) ||

                item.description
                    .toLowerCase()
                    .includes(cleanQuery)
            );

        });


    if (matches.length === 0) {

        searchResults.innerHTML = `
            <div class="search-no-result">

                <i class="bi bi-compass"></i>

                <strong>
                    No results found
                </strong>

                <span>
                    Try another Bihar destination,
                    food, festival or cultural tradition.
                </span>

            </div>
        `;

        return;
    }


    searchResults.innerHTML =
        matches
            .map(function (item) {

                return `
                    <a
                        href="${item.url}"
                        class="search-result-item">

                        <div class="search-result-icon">
                            <i class="bi bi-arrow-up-right"></i>
                        </div>

                        <div class="search-result-content">

                            <span>
                                ${item.category}
                            </span>

                            <strong>
                                ${item.title}
                            </strong>

                            <p>
                                ${item.description}
                            </p>

                        </div>

                    </a>
                `;

            })
            .join("");

}


function openSiteSearch() {

    if (!searchOverlay) return;

    searchOverlay.classList.add(
        "active"
    );

    document.body.classList.add(
        "search-open"
    );


    setTimeout(function () {

        if (searchInput) {
            searchInput.focus();
        }

    }, 200);

}


function closeSiteSearch() {

    if (!searchOverlay) return;

    searchOverlay.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "search-open"
    );


    if (searchInput) {
        searchInput.value = "";
    }


    renderSearchResults("");

}


if (
    openSearchButton &&
    searchOverlay
) {

    openSearchButton.addEventListener(
        "click",
        openSiteSearch
    );

}


if (closeSearchButton) {

    closeSearchButton.addEventListener(
        "click",
        closeSiteSearch
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            renderSearchResults(
                searchInput.value
            );

        }
    );

}


if (searchOverlay) {

    searchOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                searchOverlay
            ) {

                closeSiteSearch();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            searchOverlay &&
            searchOverlay.classList.contains(
                "active"
            )
        ) {

            closeSiteSearch();

        }

    }
);


/* =====================================================
   11. BIHAR DISTRICT EXPLORER
   ===================================================== */

const districtCards =
    document.querySelectorAll(
        ".district-card[data-district]"
    );


const districtSearch =
    document.getElementById(
        "districtSearch"
    );


const divisionFilter =
    document.getElementById(
        "divisionFilter"
    );


const districtCount =
    document.getElementById(
        "districtResultCount"
    );


const districtNoResult =
    document.getElementById(
        "districtNoResult"
    );


const districtDetailPanel =
    document.getElementById(
        "districtDetailPanel"
    );


const districtDetailNumber =
    document.querySelector(
        ".district-detail-number"
    );


const districtDetailDivision =
    document.getElementById(
        "districtDetailDivision"
    );


const districtDetailTitle =
    document.getElementById(
        "districtDetailTitle"
    );


const districtDetailText =
    document.getElementById(
        "districtDetailText"
    );


const districtDetailLink =
    document.getElementById(
        "districtDetailLink"
    );


const districtData = {

    patna: {
        name: "Patna",
        division: "Patna Division",
        text:
            "Explore Bihar's capital through historic landmarks, the Ganga riverfront, museums and the city's evolving cultural landscape.",
        link:
            "historical-places.html#golghar"
    },

    nalanda: {
        name: "Nalanda",
        division: "Patna Division",
        text:
            "Discover one of India's most important ancient centres of learning through the ruins of Nalanda Mahavihara.",
        link:
            "historical-places.html#nalanda"
    },

    bhojpur: {
        name: "Bhojpur",
        division: "Patna Division",
        text:
            "Explore the cultural landscape of western Bihar, known for its distinctive Bhojpuri traditions and historic places.",
        link:
            "art-culture.html"
    },

    buxar: {
        name: "Buxar",
        division: "Patna Division",
        text:
            "Discover a district shaped by the Ganga, historic memory and cultural traditions of western Bihar.",
        link:
            "historical-places.html"
    },

    rohtas: {
        name: "Rohtas",
        division: "Patna Division",
        text:
            "Explore dramatic landscapes and historic heritage including the region around Rohtasgarh.",
        link:
            "hidden-places.html"
    },

    kaimur: {
        name: "Kaimur",
        division: "Patna Division",
        text:
            "Discover forested landscapes, waterfalls and archaeological heritage in the southwestern edge of Bihar.",
        link:
            "hidden-places.html"
    },

    gaya: {
        name: "Gaya",
        division: "Magadh Division",
        text:
            "Explore an important pilgrimage landscape associated with Buddhism, Hindu traditions and ancient history.",
        link:
            "historical-places.html"
    },

    nawada: {
        name: "Nawada",
        division: "Magadh Division",
        text:
            "Discover southern Bihar through its landscapes, heritage and connections with the wider Magadh region.",
        link:
            "hidden-places.html"
    },

    jehanabad: {
        name: "Jehanabad",
        division: "Magadh Division",
        text:
            "Explore the historic Magadh landscape and cultural traditions around Jehanabad.",
        link:
            "historical-places.html"
    },

    aurangabad: {
        name: "Aurangabad",
        division: "Magadh Division",
        text:
            "Discover historic sites, cultural traditions and landscapes in Bihar's southwestern region.",
        link:
            "hidden-places.html"
    },

    arwal: {
        name: "Arwal",
        division: "Magadh Division",
        text:
            "Experience a quieter side of the Magadh region through local landscapes and cultural life.",
        link:
            "art-culture.html"
    },

    saran: {
        name: "Saran",
        division: "Saran Division",
        text:
            "Explore the cultural landscape of northwestern Bihar and traditions shaped by the Ganga and its surrounding plains.",
        link:
            "art-culture.html"
    },

    siwan: {
        name: "Siwan",
        division: "Saran Division",
        text:
            "Discover local traditions, historic associations and the distinctive cultural identity of western north Bihar.",
        link:
            "art-culture.html"
    },

    gopalganj: {
        name: "Gopalganj",
        division: "Saran Division",
        text:
            "Explore the green landscapes and cultural traditions of northern Bihar.",
        link:
            "hidden-places.html"
    },

    muzaffarpur: {
        name: "Muzaffarpur",
        division: "Tirhut Division",
        text:
            "Discover a major cultural and commercial centre of north Bihar surrounded by the traditions of Tirhut.",
        link:
            "art-culture.html"
    },

    vaishali: {
        name: "Vaishali",
        division: "Tirhut Division",
        text:
            "Walk through an ancient landscape connected with the Buddha, Mahavira and the republican traditions of ancient India.",
        link:
            "historical-places.html"
    },

    sitamarhi: {
        name: "Sitamarhi",
        division: "Tirhut Division",
        text:
            "Explore a culturally significant region associated with Mithila traditions and the Ramayana landscape.",
        link:
            "art-culture.html"
    },

    sheohar: {
        name: "Sheohar",
        division: "Tirhut Division",
        text:
            "Discover a small district in north Bihar through its local culture, landscapes and traditions.",
        link:
            "art-culture.html"
    },

    "east-champaran": {
        name: "East Champaran",
        division: "Tirhut Division",
        text:
            "Explore Champaran's historic landscape, cultural traditions and places connected with India's freedom movement.",
        link:
            "historical-places.html"
    },

    "west-champaran": {
        name: "West Champaran",
        division: "Tirhut Division",
        text:
            "Discover forests, wildlife landscapes and the cultural heritage of westernmost Bihar.",
        link:
            "hidden-places.html"
    },

    darbhanga: {
        name: "Darbhanga",
        division: "Darbhanga Division",
        text:
            "Experience the heart of Mithila through music, cuisine, architecture and living cultural traditions.",
        link:
            "art-culture.html"
    },

    madhubani: {
        name: "Madhubani",
        division: "Darbhanga Division",
        text:
            "Explore the home of Madhubani painting and the rich artistic traditions of Mithila.",
        link:
            "art-culture.html"
    },

    samastipur: {
        name: "Samastipur",
        division: "Darbhanga Division",
        text:
            "Discover the agricultural heartland and cultural traditions of north-central Bihar.",
        link:
            "art-culture.html"
    },

    saharsa: {
        name: "Saharsa",
        division: "Kosi Division",
        text:
            "Explore the Kosi region through its river landscapes, local traditions and changing rural life.",
        link:
            "hidden-places.html"
    },

    madhepura: {
        name: "Madhepura",
        division: "Kosi Division",
        text:
            "Discover the cultural landscape and rural traditions of the Kosi belt.",
        link:
            "art-culture.html"
    },

    supaul: {
        name: "Supaul",
        division: "Kosi Division",
        text:
            "Experience the landscapes and local culture shaped by the Kosi region.",
        link:
            "hidden-places.html"
    },

    purnia: {
        name: "Purnia",
        division: "Purnia Division",
        text:
            "Explore eastern Bihar through its diverse communities, landscapes and regional culture.",
        link:
            "art-culture.html"
    },

    katihar: {
        name: "Katihar",
        division: "Purnia Division",
        text:
            "Discover an important eastern Bihar district shaped by rivers, agriculture and regional traditions.",
        link:
            "hidden-places.html"
    },

    araria: {
        name: "Araria",
        division: "Purnia Division",
        text:
            "Explore the northeastern landscapes and cultural diversity of Bihar.",
        link:
            "hidden-places.html"
    },

    kishanganj: {
        name: "Kishanganj",
        division: "Purnia Division",
        text:
            "Discover Bihar's northeastern edge through its green landscapes and cultural diversity.",
        link:
            "hidden-places.html"
    },

    bhagalpur: {
        name: "Bhagalpur",
        division: "Bhagalpur Division",
        text:
            "Explore the historic silk city and the cultural landscape of eastern Bihar.",
        link:
            "art-culture.html"
    },

    banka: {
        name: "Banka",
        division: "Bhagalpur Division",
        text:
            "Discover hills, forests and cultural landscapes in southeastern Bihar.",
        link:
            "hidden-places.html"
    },

    munger: {
        name: "Munger",
        division: "Munger Division",
        text:
            "Explore a historic city and its surrounding landscape along the Ganga.",
        link:
            "historical-places.html"
    },

    jamui: {
        name: "Jamui",
        division: "Munger Division",
        text:
            "Discover forested landscapes, historic associations and quieter destinations in southeastern Bihar.",
        link:
            "hidden-places.html"
    },

    khagaria: {
        name: "Khagaria",
        division: "Munger Division",
        text:
            "Explore a riverine landscape shaped by the Ganga and its tributaries.",
        link:
            "hidden-places.html"
    },

    begusarai: {
        name: "Begusarai",
        division: "Munger Division",
        text:
            "Discover the cultural and natural landscape of north-central Bihar.",
        link:
            "hidden-places.html"
    },

    lakhisarai: {
        name: "Lakhisarai",
        division: "Munger Division",
        text:
            "Explore ancient heritage, hills and historic landscapes in eastern Magadh.",
        link:
            "historical-places.html"
    },

    sheikhpura: {
        name: "Sheikhpura",
        division: "Munger Division",
        text:
            "Discover a quieter district landscape with local traditions and historic associations.",
        link:
            "art-culture.html"
    }

};


let activeDistrict =
    "patna";


function updateDistrictPanel(
    districtKey
) {

    const data =
        districtData[districtKey];


    if (
        !data ||
        !districtDetailPanel
    ) {
        return;
    }


    activeDistrict =
        districtKey;


    const card =
        document.querySelector(
            '.district-card[data-district="' +
            districtKey +
            '"]'
        );


    if (!card) return;


    const number =
        card.querySelector(
            ".district-number"
        );


    const division =
        card.querySelector(
            ".district-card-content small"
        );


    if (districtDetailNumber) {

        districtDetailNumber.textContent =
            number
                ? number.textContent.trim()
                : "";

    }


    if (districtDetailDivision) {

        districtDetailDivision.textContent =
            data.division.toUpperCase();

    }


    if (districtDetailTitle) {

        districtDetailTitle.textContent =
            data.name;

    }


    if (districtDetailText) {

        districtDetailText.textContent =
            data.text;

    }


    if (districtDetailLink) {

        districtDetailLink.href =
            data.link;

    }


    districtCards.forEach(
        function (item) {

            item.classList.remove(
                "active"
            );

        }
    );


    card.classList.add(
        "active"
    );


    districtDetailPanel.classList.remove(
        "district-panel-refresh"
    );


    void districtDetailPanel.offsetWidth;


    districtDetailPanel.classList.add(
        "district-panel-refresh"
    );

}


function filterDistricts() {

    const searchValue =
        districtSearch
            ? districtSearch.value
                .trim()
                .toLowerCase()
            : "";


    const divisionValue =
        divisionFilter
            ? divisionFilter.value
            : "all";


    let visibleCount = 0;


    districtCards.forEach(
        function (card) {

            const district =
                card.dataset.district
                    .toLowerCase();


            const division =
                card.dataset.division
                    .toLowerCase();


            const matchesSearch =
                !searchValue ||
                district.includes(
                    searchValue
                );


            const matchesDivision =
                divisionValue === "all" ||
                division ===
                    divisionValue;


            const visible =
                matchesSearch &&
                matchesDivision;


            card.style.display =
                visible
                    ? ""
                    : "none";


            if (visible) {

                visibleCount++;

            }

        }
    );


    if (districtCount) {

        districtCount.textContent =
            visibleCount;

    }


    if (districtNoResult) {

        districtNoResult.hidden =
            visibleCount !== 0;

    }


    /*
     * If active district is filtered out,
     * select the first visible district.
     */

    const activeCard =
        document.querySelector(
            ".district-card.active"
        );


    if (
        activeCard &&
        activeCard.style.display === "none"
    ) {

        const firstVisible =
            Array.from(
                districtCards
            ).find(
                function (card) {

                    return (
                        card.style.display !==
                        "none"
                    );

                }
            );


        if (firstVisible) {

            updateDistrictPanel(
                firstVisible.dataset.district
            );

        }

    }

}


if (districtCards.length > 0) {

    districtCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    updateDistrictPanel(
                        card.dataset.district
                    );

                    openDistrictModal(
                        card.dataset.district
                    );

                }
            );

        }
    );


    if (districtSearch) {

        districtSearch.addEventListener(
            "input",
            filterDistricts
        );

    }


    if (divisionFilter) {

        divisionFilter.addEventListener(
            "change",
            filterDistricts
        );

    }


    /*
     * Initial district
     */

    updateDistrictPanel(
        "patna"
    );


    filterDistricts();

}


/* =====================================================
   12. DISTRICT DETAILS MODAL
   ===================================================== */

const districtModal =
    document.getElementById(
        "districtModal"
    );


const districtModalClose =
    document.getElementById(
        "districtModalClose"
    );


const districtModalBackdrop =
    document.querySelector(
        ".district-modal-backdrop"
    );


const districtModalImage =
    document.getElementById(
        "districtModalImage"
    );


const districtModalDivision =
    document.getElementById(
        "districtModalDivision"
    );


const districtModalTitle =
    document.getElementById(
        "districtModalTitle"
    );


const districtModalDescription =
    document.getElementById(
        "districtModalDescription"
    );


const districtModalNumber =
    document.getElementById(
        "districtModalNumber"
    );


const districtModalLink =
    document.getElementById(
        "districtModalLink"
    );


const districtModalHighlights =
    document.getElementById(
        "districtModalHighlights"
    );


const districtImages = {

    patna:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Golghar%2C_Patna.jpg/1280px-Golghar%2C_Patna.jpg",

    nalanda:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Nalanda_University_Archaeological_Complex.jpg/1280px-Nalanda_University_Archaeological_Complex.jpg",

    bhojpur:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rajendra_Prasad_%28cropped%29.jpg/800px-Rajendra_Prasad_%28cropped%29.jpg",

    buxar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Golghar%2C_Patna.jpg/1280px-Golghar%2C_Patna.jpg",

    rohtas:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rajgir_hills.jpg/1280px-Rajgir_hills.jpg",

    kaimur:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Kakolat_Waterfall.jpg/1280px-Kakolat_Waterfall.jpg",

    gaya:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mahabodhi_Temple%2C_Bodh_Gaya%2C_India.jpg/1280px-Mahabodhi_Temple%2C_Bodh_Gaya%2C_India.jpg",

    nawada:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Kakolat_Waterfall.jpg/1280px-Kakolat_Waterfall.jpg",

    jehanabad:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rajgir_hills.jpg/1280px-Rajgir_hills.jpg",

    aurangabad:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rajgir_hills.jpg/1280px-Rajgir_hills.jpg",

    arwal:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rajgir_hills.jpg/1280px-Rajgir_hills.jpg",

    saran:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Sonepur_Mela.jpg/1280px-Sonepur_Mela.jpg",

    siwan:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Sonepur_Mela.jpg/1280px-Sonepur_Mela.jpg",

    gopalganj:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Valmiki_National_Park.jpg/1280px-Valmiki_National_Park.jpg",

    muzaffarpur:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Madhubani_painting.jpg/1280px-Madhubani_painting.jpg",

    vaishali:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Nalanda_University_Archaeological_Complex.jpg/1280px-Nalanda_University_Archaeological_Complex.jpg",

    sitamarhi:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Madhubani_painting.jpg/1280px-Madhubani_painting.jpg",

    sheohar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Madhubani_painting.jpg/1280px-Madhubani_painting.jpg",

    "east-champaran":
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Nalanda_University_Archaeological_Complex.jpg/1280px-Nalanda_University_Archaeological_Complex.jpg",

    "west-champaran":
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Valmiki_National_Park.jpg/1280px-Valmiki_National_Park.jpg",

    darbhanga:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Madhubani_painting.jpg/1280px-Madhubani_painting.jpg",

    madhubani:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Madhubani_painting.jpg/1280px-Madhubani_painting.jpg",

    samastipur:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Madhubani_painting.jpg/1280px-Madhubani_painting.jpg",

    saharsa:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Maner_Sharif_Dargah.jpg/1280px-Maner_Sharif_Dargah.jpg",

    madhepura:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Maner_Sharif_Dargah.jpg/1280px-Maner_Sharif_Dargah.jpg",

    supaul:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Maner_Sharif_Dargah.jpg/1280px-Maner_Sharif_Dargah.jpg",

    purnia:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Maner_Sharif_Dargah.jpg/1280px-Maner_Sharif_Dargah.jpg",

    katihar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Maner_Sharif_Dargah.jpg/1280px-Maner_Sharif_Dargah.jpg",

    araria:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Maner_Sharif_Dargah.jpg/1280px-Maner_Sharif_Dargah.jpg",

    kishanganj:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Maner_Sharif_Dargah.jpg/1280px-Maner_Sharif_Dargah.jpg",

    bhagalpur:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Madhubani_painting.jpg/1280px-Madhubani_painting.jpg",

    banka:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rajgir_hills.jpg/1280px-Rajgir_hills.jpg",

    munger:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rajgir_hills.jpg/1280px-Rajgir_hills.jpg",

    jamui:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rajgir_hills.jpg/1280px-Rajgir_hills.jpg",

    khagaria:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rajgir_hills.jpg/1280px-Rajgir_hills.jpg",

    begusarai:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rajgir_hills.jpg/1280px-Rajgir_hills.jpg",

    lakhisarai:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Nalanda_University_Archaeological_Complex.jpg/1280px-Nalanda_University_Archaeological_Complex.jpg",

    sheikhpura:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rajgir_hills.jpg/1280px-Rajgir_hills.jpg"

};


const districtHighlights = {

    patna: [
        ["bi-bank2", "HERITAGE"],
        ["bi-building", "CITY LIFE"],
        ["bi-cup-hot", "FOOD"]
    ],

    nalanda: [
        ["bi-bank2", "ANCIENT LEARNING"],
        ["bi-book", "HISTORY"],
        ["bi-compass", "HERITAGE"]
    ],

    bhojpur: [
        ["bi-music-note", "FOLK CULTURE"],
        ["bi-people", "TRADITIONS"],
        ["bi-palette", "ART"]
    ],

    buxar: [
        ["bi-bank2", "HISTORY"],
        ["bi-water", "GANGA"],
        ["bi-palette", "CULTURE"]
    ],

    rohtas: [
        ["bi-bank2", "FORTS"],
        ["bi-tree", "NATURE"],
        ["bi-compass", "EXPLORATION"]
    ],

    kaimur: [
        ["bi-tree", "FORESTS"],
        ["bi-water", "WATERFALLS"],
        ["bi-compass", "NATURE"]
    ],

    gaya: [
        ["bi-bank2", "PILGRIMAGE"],
        ["bi-globe2", "BUDDHISM"],
        ["bi-clock-history", "HISTORY"]
    ],

    nawada: [
        ["bi-tree", "LANDSCAPES"],
        ["bi-compass", "ESCAPES"],
        ["bi-clock-history", "HISTORY"]
    ],

    jehanabad: [
        ["bi-bank2", "HISTORY"],
        ["bi-clock-history", "MAGADH"],
        ["bi-compass", "HERITAGE"]
    ],

    aurangabad: [
        ["bi-bank2", "HERITAGE"],
        ["bi-tree", "LANDSCAPES"],
        ["bi-compass", "TRAVEL"]
    ],

    arwal: [
        ["bi-palette", "CULTURE"],
        ["bi-tree", "LANDSCAPE"],
        ["bi-compass", "DISCOVERY"]
    ],

    saran: [
        ["bi-shop", "FAIR"],
        ["bi-people", "CULTURE"],
        ["bi-calendar-event", "TRADITIONS"]
    ],

    siwan: [
        ["bi-people", "CULTURE"],
        ["bi-clock-history", "HISTORY"],
        ["bi-palette", "TRADITIONS"]
    ],

    gopalganj: [
        ["bi-tree", "NATURE"],
        ["bi-compass", "ESCAPES"],
        ["bi-people", "LOCAL LIFE"]
    ],

    muzaffarpur: [
        ["bi-palette", "CULTURE"],
        ["bi-flower1", "TRADITIONS"],
        ["bi-cup-hot", "FOOD"]
    ],

    vaishali: [
        ["bi-bank2", "ANCIENT HISTORY"],
        ["bi-globe2", "BUDDHISM"],
        ["bi-clock-history", "HERITAGE"]
    ],

    sitamarhi: [
        ["bi-book", "MYTHOLOGY"],
        ["bi-palette", "MITHILA"],
        ["bi-people", "CULTURE"]
    ],

    sheohar: [
        ["bi-tree", "LANDSCAPE"],
        ["bi-people", "LOCAL LIFE"],
        ["bi-palette", "CULTURE"]
    ],

    "east-champaran": [
        ["bi-clock-history", "HISTORY"],
        ["bi-bank2", "HERITAGE"],
        ["bi-people", "CULTURE"]
    ],

    "west-champaran": [
        ["bi-tree", "FORESTS"],
        ["bi-compass", "NATURE"],
        ["bi-camera", "WILDLIFE"]
    ],

    darbhanga: [
        ["bi-palette", "MITHILA"],
        ["bi-music-note", "MUSIC"],
        ["bi-cup-hot", "CUISINE"]
    ],

    madhubani: [
        ["bi-palette", "MITHILA ART"],
        ["bi-brush", "PAINTING"],
        ["bi-people", "CULTURE"]
    ],

    samastipur: [
        ["bi-tree", "LANDSCAPES"],
        ["bi-people", "LOCAL LIFE"],
        ["bi-palette", "CULTURE"]
    ],

    saharsa: [
        ["bi-water", "KOSI"],
        ["bi-tree", "LANDSCAPE"],
        ["bi-compass", "EXPLORATION"]
    ],

    madhepura: [
        ["bi-people", "LOCAL LIFE"],
        ["bi-tree", "LANDSCAPE"],
        ["bi-palette", "CULTURE"]
    ],

    supaul: [
        ["bi-water", "KOSI"],
        ["bi-tree", "NATURE"],
        ["bi-compass", "ESCAPES"]
    ],

    purnia: [
        ["bi-people", "DIVERSITY"],
        ["bi-tree", "LANDSCAPE"],
        ["bi-palette", "CULTURE"]
    ],

    katihar: [
        ["bi-water", "RIVERS"],
        ["bi-tree", "LANDSCAPE"],
        ["bi-people", "LOCAL LIFE"]
    ],

    araria: [
        ["bi-tree", "NATURE"],
        ["bi-people", "DIVERSITY"],
        ["bi-compass", "EXPLORATION"]
    ],

    kishanganj: [
        ["bi-tree", "GREEN LANDSCAPES"],
        ["bi-people", "DIVERSITY"],
        ["bi-compass", "NORTHEAST BIHAR"]
    ],

    bhagalpur: [
        ["bi-palette", "SILK"],
        ["bi-bank2", "HERITAGE"],
        ["bi-cup-hot", "FOOD"]
    ],

    banka: [
        ["bi-tree", "HILLS"],
        ["bi-compass", "NATURE"],
        ["bi-palette", "CULTURE"]
    ],

    munger: [
        ["bi-bank2", "HISTORY"],
        ["bi-water", "GANGA"],
        ["bi-clock-history", "HERITAGE"]
    ],

    jamui: [
        ["bi-tree", "FORESTS"],
        ["bi-compass", "NATURE"],
        ["bi-clock-history", "HISTORY"]
    ],

    khagaria: [
        ["bi-water", "RIVER LANDSCAPE"],
        ["bi-tree", "PLAINS"],
        ["bi-people", "LOCAL LIFE"]
    ],

    begusarai: [
        ["bi-tree", "LANDSCAPE"],
        ["bi-people", "CULTURE"],
        ["bi-compass", "DISCOVERY"]
    ],

    lakhisarai: [
        ["bi-bank2", "ANCIENT HERITAGE"],
        ["bi-compass", "HISTORY"],
        ["bi-tree", "LANDSCAPE"]
    ],

    sheikhpura: [
        ["bi-palette", "CULTURE"],
        ["bi-people", "LOCAL LIFE"],
        ["bi-compass", "DISCOVERY"]
    ]

};


function openDistrictModal(
    districtKey
) {

    if (
        !districtModal ||
        !districtData ||
        !districtData[districtKey]
    ) {
        return;
    }


    const data =
        districtData[districtKey];


    const card =
        document.querySelector(
            '.district-card[data-district="' +
            districtKey +
            '"]'
        );


    if (!card) return;


    const numberElement =
        card.querySelector(
            ".district-number"
        );


    /* Image */

    const image =
        districtImages[districtKey];


    if (districtModalImage) {

        districtModalImage.src =
            image ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Rajgir_hills.jpg/1280px-Rajgir_hills.jpg";

        districtModalImage.alt =
            data.name +
            " district, Bihar";

    }


    /* Text */

    if (districtModalDivision) {

        districtModalDivision.textContent =
            data.division.toUpperCase();

    }


    if (districtModalTitle) {

        districtModalTitle.textContent =
            data.name;

    }


    if (districtModalDescription) {

        districtModalDescription.textContent =
            data.text;

    }


    if (districtModalNumber) {

        districtModalNumber.textContent =
            numberElement
                ? numberElement.textContent.trim()
                : "";

    }


    /* Link */

    if (districtModalLink) {

        districtModalLink.href =
            data.link;

    }


    /* Highlights */

    if (districtModalHighlights) {

        const highlights =
            districtHighlights[districtKey] ||
            [
                ["bi-compass", "DISCOVER"],
                ["bi-palette", "CULTURE"],
                ["bi-bank2", "HERITAGE"]
            ];


        districtModalHighlights.innerHTML =
            highlights
                .map(function (item) {

                    return `
                        <div class="district-modal-highlight">

                            <i class="bi ${item[0]}"></i>

                            <span>
                                ${item[1]}
                            </span>

                        </div>
                    `;

                })
                .join("");

    }


    /* Open */

    districtModal.classList.add(
        "active"
    );


    districtModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "district-modal-open"
    );


    if (districtModalClose) {

        setTimeout(function () {

            districtModalClose.focus();

        }, 150);

    }

}


function closeDistrictModal() {

    if (!districtModal) {
        return;
    }


    districtModal.classList.remove(
        "active"
    );


    districtModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "district-modal-open"
    );

}


/* Card click */

if (districtCards.length > 0) {

    districtCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    openDistrictModal(
                        card.dataset.district
                    );

                }
            );

        }
    );

}


/* 
 * IMPORTANT:
 * Single click still updates the existing
 * district detail panel.
 *
 * Double click opens the detailed modal.
 */


/* Close button */

if (districtModalClose) {

    districtModalClose.addEventListener(
        "click",
        closeDistrictModal
    );

}


/* Backdrop */

if (districtModalBackdrop) {

    districtModalBackdrop.addEventListener(
        "click",
        closeDistrictModal
    );

}


/* Escape */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            districtModal &&
            districtModal.classList.contains(
                "active"
            )
        ) {

            closeDistrictModal();

        }

    }
);


    /* =====================================================
       13. PAGE READY
       ===================================================== */

    document.body.classList.add(
        "page-ready"
    );


    /* =====================================================
       JAVASCRIPT STATUS
       ===================================================== */

    console.log(
        "Discover Bihar JavaScript loaded successfully."
    );

});

/* =========================================================
   DISCOVER BIHAR — DARK MODE
   ========================================================= */

(function () {
    const STORAGE_KEY = "discover-bihar-theme";

    function applyTheme(theme) {
        const isDark = theme === "dark";

        document.documentElement.classList.toggle("dark-mode", isDark);

        const button = document.getElementById("themeToggle");

        if (button) {
            button.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );

            button.setAttribute(
                "title",
                isDark ? "Light mode" : "Dark mode"
            );
        }
    }

    function addThemeToggle() {
        const searchButton = document.getElementById("openSearch");

        if (!searchButton || document.getElementById("themeToggle")) {
            return;
        }

        const button = document.createElement("button");

        button.type = "button";
        button.id = "themeToggle";
        button.className = "theme-toggle";

        button.setAttribute("aria-label", "Switch to dark mode");
        button.setAttribute("title", "Dark mode");

        button.innerHTML = `
            <i class="bi bi-moon-stars-fill" aria-hidden="true"></i>
            <i class="bi bi-sun-fill" aria-hidden="true"></i>
        `;

        searchButton.parentNode.insertBefore(button, searchButton);

        button.addEventListener("click", function () {
            const isDark =
                document.documentElement.classList.contains("dark-mode");

            const nextTheme = isDark ? "light" : "dark";

            localStorage.setItem(STORAGE_KEY, nextTheme);

            applyTheme(nextTheme);
        });
    }

    /* Load saved theme */
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    /* Use saved theme, otherwise use system preference */
    const preferredTheme =
        savedTheme ||
        (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
        );

    /* Apply theme immediately */
    applyTheme(preferredTheme);

    /* Add toggle button after page loads */
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            addThemeToggle
        );
    } else {
        addThemeToggle();
    }
})();