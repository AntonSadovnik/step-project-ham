//declaring functions
const workBlockGenerator = (i, category, placeToInsert) => {
    //convert data name to folder name
    //example: landing page -> landing-page
    let str;
    str = category.split("");
    if (category != "wordpress") {
        str.splice(str.indexOf(" "), 1, "-");
    }
    str = str.join("");
    placeToInsert.insertAdjacentHTML(
        "beforeend",
        `<div class="work-content-wrap" id="inserted" data-type="${category}">
    <img
        src="./img/${category}/${str}${i}.jpg"
        alt="work content item"
    />
    <div class="circles-wrap">
        <div class="circles">
            <div class="circle grey-circle">
                <img
                    src="./img/figma export/link.png"
                    alt="link"
                />
            </div>
            <div class="circle green-circle">
                <div></div>
            </div>
        </div>
        <div class="circles-description">
            <h3 class="circle-title">
                creative design
            </h3>
            <p class="category">${category}</p>
        </div>
    </div>
</div>`
    );
};

//declaring variables

//service tabs
const servicesTabWrap = document.querySelector(".our-services-tabs-wrap");
let oldServicesTab = null;
let activeServicesContent = null;
let servicesTab = document.querySelector(".our-services-active-tab");
const servicesContent = document.querySelector(".our-services-wrap");
let oldServicesContent = null;

//work button
const workLoadMoreBtn = document.getElementById("work-load-more");
const workContent = document.querySelector(".work-content");
let workButtonCounter = 0;
//work tabs
const workTabsWrap = document.querySelector(".work-tabs-wrap");
const workDefaultContent = document.querySelectorAll(".work-content-wrap");
const workPlaceToInsert = document.querySelector(".work-content");
let workTabActive = document.querySelector(".work-tab");
let workInsertedImages = null;
let oldWorkTab = null;

servicesTabWrap.addEventListener("mousedown", function (e) {
    if (servicesTab == e.target) {
        return;
    }
    //assign and hide old service tab
    oldServicesTab = servicesTab;
    oldServicesTab.classList.remove("our-services-active-tab");
    //assign and display new service tab
    servicesTab = e.target;
    servicesTab.classList.add("our-services-active-tab");
    //finding next tab content
    activeServicesContent = servicesContent.querySelector(
        `div[data-tab="${e.target.innerText.toLowerCase()}"]`
    );
    //finding old tab content
    oldServicesContent = servicesContent.querySelector(
        ".our-services-content-active"
    );
    //display new tab content
    activeServicesContent.classList.add("our-services-content-active");
    //hide old tab content
    oldServicesContent.classList.remove("our-services-content-active");
    e.preventDefault();
    e.stopPropagation();
});

workLoadMoreBtn.addEventListener("click", function (e) {
    //loading new 12 images
    for (let i = 1; i < 13; i++) {
        workContent.insertAdjacentHTML(
            "beforeend",
            `
        <div class="work-content-wrap" id="inserted">
        <img
            src="./img/graphic design/graphic-design${i}.jpg"
            alt="work content item"
        />
        <div class="circles-wrap">
            <div class="circles">
                <div class="circle grey-circle">
                    <img
                        src="./img/figma export/link.png"
                        alt="link"
                    />
                </div>
                <div class="circle green-circle">
                    <div></div>
                </div>
            </div>
            <div class="circles-description">
                <h3 class="circle-title">
                    creative design
                </h3>
                <p class="category">Graphic Design</p>
            </div>
        </div>
    </div>`
        );
    }
    workButtonCounter += 1;
    //hiding button
    if (workButtonCounter === 2) {
        workLoadMoreBtn.style.display = "none";
        workButtonCounter = 0;
    }
});

workTabsWrap.addEventListener("mousedown", function (e) {
    if (e.target == workTabActive) {
        return;
    }
    //restoring load more button after switching tabs
    if (workLoadMoreBtn.style.display == "none") {
        workLoadMoreBtn.style.display = "";
    }
    //finding inserted elements if they exist
    workInsertedImages = workPlaceToInsert.querySelectorAll("#inserted");
    //assign and hide old work tab
    oldWorkTab = workTabActive;
    oldWorkTab.classList.remove("work-tab-active");
    //assign and display new work tab
    workTabActive = e.target;
    workTabActive.classList.add("work-tab-active");
    //getting from active tab data-category
    workPlaceToInsert.dataset.category = workTabActive.innerText.toLowerCase();
    if (workPlaceToInsert.dataset.category == "all") {
        //if the tab didn't switch
        if (!workInsertedImages) {
            return;
        }
        //display default content
        workDefaultContent.forEach((element) => (element.style.display = ""));
        //hide all inserted elements
        workInsertedImages.forEach(
            (element) => (element.style.display = "none")
        );
    } else if (workPlaceToInsert.dataset.category == "graphic design") {
        //hide all default content
        workDefaultContent.forEach(
            (element) => (element.style.display = "none")
        );
        //removing all inserted elements
        workInsertedImages.forEach((element) => element.remove());
        //load 12 new images
        for (let i = 1; i < 13; i++) {
            workBlockGenerator(
                i,
                workPlaceToInsert.dataset.category,
                workPlaceToInsert
            );
        }
    } else if (
        workPlaceToInsert.dataset.category == "web design" ||
        workPlaceToInsert.dataset.category == "landing pages" ||
        workPlaceToInsert.dataset.category == "wordpress"
    ) {
        //hide all default content
        workDefaultContent.forEach(
            (element) => (element.style.display = "none")
        );
        //removing all inserted elements
        workInsertedImages.forEach((element) => element.remove());
        //load 8 new images
        for (let i = 1; i < 8; i++) {
            workBlockGenerator(
                i,
                workPlaceToInsert.dataset.category,
                workPlaceToInsert
            );
        }
    }
    e.stopPropagation();
    e.preventDefault();
});
//slider
document.addEventListener("DOMContentLoaded", function (e) {
    //declaring bigger slider
    const mainSlide = new Splide("#main-slider", {
        type: "fade",
        rewind: true,
        pagination: false,
        arrows: false,
    });
    //declaring smaller slider
    const thumbnails = new Splide("#thumbnail-slider", {
        fixedWidth: 60,
        fixedHeight: 60,
        gap: 20,
        rewind: true,
        pagination: false,
        cover: true,
        focus: "center",
        isNavigation: true,
    });
    //synchronizing main slider to small
    mainSlide.sync(thumbnails);
    //running big and small slider
    mainSlide.mount();
    thumbnails.mount();
});
