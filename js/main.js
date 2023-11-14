import { englishContent, frenchContent } from "../js/content.js";
import { projects } from "../js/projects.js";
let introduceSection = document.querySelector(".introduce");
let skills = document.querySelectorAll(".skills .skill");

let showed1 = false;

window.onscroll = (_) => {
	if (window.scrollY > introduceSection.offsetTop - 200 && !showed1) {
		let time = 0;
		skills.forEach((skill) => {
			setTimeout(() => {
				skill.classList.add("animate");
			}, time);
			time += 700;
		});
		showed1 = true;
	}
};

let tabsHolder = document.querySelector(".testimonials .tabs-holder");
let lis = document.querySelectorAll(".testimonials li");
let tabs = document.querySelectorAll(".testimonials .tab");

tabs[0].classList.add("show");
lis.forEach((li) => {
	li.onclick = function () {
		lis.forEach((li) => {
			li.classList.remove("active");
		});
		this.classList.add("active");
		tabs.forEach((tab) => {
			if (tab.dataset.type === this.dataset.num) {
				tab.classList.add("show");
			} else {
				tab.classList.remove("show");
				tab.classList.add("hide");
				setTimeout(() => {
					tab.classList.remove("hide");
				}, 1000);
			}
		});
	};
});

let servicesPara = document.querySelectorAll(".services .service p");
let servicesTitle = document.querySelectorAll(".services .service h4");

window.onresize = (_) => {
	heightAuto(servicesPara);
	heightAuto(servicesTitle);
	setHeight(servicesPara);
	setHeight(servicesTitle);
	tabHolderHeight(tabs);
};

projectsSetup();
window.onload = (_) => {
	contact();
	setHeight(servicesPara);
	setHeight(servicesTitle);
	tabHolderHeight(tabs);
};

function heightAuto(array) {
	array.forEach((service) => {
		service.style.height = `auto`;
	});
}

function setHeight(array) {
	let max = 0;
	array.forEach((service) => {
		if (service.offsetHeight > max) {
			max = service.offsetHeight;
		}
	});
	array.forEach((service) => {
		service.style.height = `${max}px`;
	});
}
function tabHolderHeight(array) {
	let max = 0;
	array.forEach((item) => {
		if (item.offsetHeight > max) {
			max = item.offsetHeight;
		}
	});
	tabsHolder.style.height = `${max}px`;
}

function contact() {
	emailjs.init("IRmeyUBLgdA6L65yI");
	document
		.getElementById("contact-form")
		.addEventListener("submit", function (event) {
			event.preventDefault();
			emailjs.sendForm("potfolio_contact", "potfolio_contact", this).then(
				function () {
					document.querySelector(".contact .message").classList.add("show");
					document.querySelector(
						".contact .message"
					).innerHTML = `Thanks for starting this epic journey !`;
					console.log("SUCCESS!");
				},
				function (error) {
					document.querySelector(".contact .message").classList.add("show");
					document.querySelector(
						".contact .message"
					).innerHTML = `Ooops ! Try again please`;
					console.log("FAILED...", error);
				}
			);
		});
}

let baseTime = 3500;
let showTime = 3000;

animateServices();
setInterval(animateServices, servicesTitle.length * baseTime);

function animateServices() {
	let flag = document.querySelector(".flag");
	let i = 0;
	flag.innerHTML = servicesTitle[i].innerHTML;
	i++;
	toogleFlag(flag, showTime);
	let tmp = setInterval((_) => {
		flag.innerHTML = servicesTitle[i].innerHTML;
		toogleFlag(flag, showTime);
		i++;
	}, baseTime);

	setTimeout(() => {
		clearInterval(tmp);
	}, (servicesTitle.length - 1) * baseTime);
}

function toogleFlag(flag, showTime) {
	showFlag(flag);
	setTimeout(() => {
		hideFlag(flag);
	}, showTime);
}

function showFlag(flag) {
	flag.classList.add("show");
}

function hideFlag(flag) {
	flag.classList.remove("show");
}

let contents = Array.from(document.querySelectorAll('[data-content=""]'));
let tooglerLangs = Array.from(document.querySelectorAll(".dropdown-menu li"));
let dropToogle = document.querySelector(".nav-link.dropdown-toggle");

dropToogle.innerHTML = tooglerLangs[1].innerHTML;

let i = 0;
// contents.forEach((content) => {
// 	content.innerHTML = frenchContent[i];
// 	i++;
// });

tooglerLangs[0].addEventListener("click", (e) => {
	writeContent(englishContent, e);
});
tooglerLangs[1].addEventListener("click", (e) => {
	writeContent(frenchContent, e);
});

function writeContent(contentArray, e) {
	contents.forEach((content) => {
		content.innerHTML = "";
	});
	loader();
	setTimeout(() => {
		removeLoader();
		let i = 0;
		contents.forEach((content) => {
			content.innerHTML = contentArray[i];
			i++;
		});
		dropToogle.innerHTML = e.target.innerHTML;
		heightAuto(servicesPara);
		heightAuto(servicesTitle);
		setHeight(servicesPara);
		setHeight(servicesTitle);
		tabHolderHeight(tabs);
	}, 2000);
}

function loader() {
	let loaderElement = document.createElement("div");
	loaderElement.classList.add("loader");
	for (let i = 0; i < 3; i++) {
		let div = document.createElement("div");
		loaderElement.appendChild(div);
	}
	let tmp = [];
	for (let i = 0; i < contents.length; i++) {
		tmp[i] = loaderElement.cloneNode(true);
	}
	let x = 0;
	contents.forEach((content) => {
		content.prepend(tmp[x]);
		x++;
	});
}

function removeLoader() {
	let x = 0;
	contents.forEach((content) => {
		content.firstElementChild.remove();
		x++;
	});
}

function projectsSetup() {
	let projectsContainer = document.querySelector(".works .container .row");

	projects.forEach((project, index) => {
		let div = document.createElement("div");
		div.classList.add("col-lg-4");
		div.innerHTML = `
					<div class="work p-lg-5 p-3 rounded-4 mb-5"">
						<div class="work-info mb-4 d-flex justify-content-between">
							<h3 class="fs-5" data-content="">${project.name}</h3>
							<div class="languages">
								<i class="fa-brands fa-bootstrap"></i>
								<i class="fa-brands fa-square-js"></i>
								<i class="fa-brands fa-css3-alt"></i>
							</div>
						</div>
						<div class="work-img rounded-4"><img src="images/${project.imgLink}" data-num="${index} alt="" class="img-fluid rounded-4"></div>
					</div>
		`;
		// let imgConta = div.querySelector("work-img");
		// let imgEle = document.createElement('img');
		projectsContainer.append(div);
	});
	let projectsDiv = projectsContainer.querySelectorAll(".work .work-img img");
	projectsDiv.forEach((project) => {
		project.addEventListener("click", showPopup, false);
	});
}
let pop = document.querySelector(".popup");
let popInfos = {
	name: pop.querySelector(".popup-title h1"),
	imgLink: pop.querySelector("img"),
	techs: pop.querySelector(".skills-container"),
	desc: pop.querySelector(".description"),
	demoLink: pop.querySelector("a"),
};
function showPopup(e) {
	let ele = e.target;
	let index = parseInt(ele.dataset.num);
	let project = projects[index];
	popInfos.name.innerHTML = project.name;
	popInfos.imgLink.src = `images/${project.imgLink}`;
	popInfos.techs.innerHTML = project.techs;
	popInfos.desc.innerHTML = project.desc;
	popInfos.demoLink.innerHTML = project.demoLink;
	document.body.style.overflow = "hidden";
	pop.classList.add("show");
	pop.querySelector(".popup-content").scrollTo(0, 0);
}
document
	.querySelector(".close-btn")
	.addEventListener("click", closePopup, false);

function closePopup(e) {
	document.body.style.overflow = "auto";
	pop.classList.remove("show");
}
