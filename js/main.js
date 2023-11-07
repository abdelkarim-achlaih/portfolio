import { englishContent, frenchContent } from "../js/content.js";
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

window.onload = (_) => {
	projectsSetup();
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
	let projectsContent = [
		{
			name: "Landing Pages",
			techs: ["bootstrap", "js", "css"],
			imgLink: "Landings.png",
			demoLink: "https://abdelkarim-achlaih.github.io/Currency_App/",
			desc: "In these projects, I transformed given PSD designs into fully functional websites using HTML, CSS, and JavaScript. Some of them have an integrated API that fetches data in real time, in order to prevent page multiple reloadings. I meticulously coded and optimized the design to ensure it's responsive and accessible, providing a seamless user experience across various devices and browsers.",
		},
		{
			name: "Modern UI Designs",
			techs: ["bootstrap", "js", "css"],
			imgLink: "Modern UI Designs.png",
			demoLink: "https://abdelkarim-achlaih.github.io/Fylo/",
			desc: "In this project, I transformed given PSD designs into fully functional websites using HTML and CSS. I meticulously coded and optimized the designs to ensure their responsiveness, providing a seamless user experience across various devices and browsers.",
		},
		{
			name: "Scroll Activated Animations",
			techs: ["bootstrap", "js", "css"],
			imgLink: "Next-Gen.png",
			demoLink:
				"https://abdelkarim-achlaih.github.io/Next-Gen-Solutions-Website/",
			desc: "If you asked me, what is your top 5 projects, I'm pretty sure that this one has a place among them, in this project, I tried to make the layout more interactive with the user inputs, such as on mouse move or on scrolling, so you will find a lot of animations, loaders, pinned sections, scroll activated animations... all these features have implemented with HTML, CSS, JS, Bootstrap, SASS, GSAP, Particles.JS, Lenis.JS... and of course a lot of time and dedicated hard work.",
		},
		{
			name: "Blog Website",
			techs: ["bootstrap", "js", "css"],
			imgLink: "Nexus Blog.png",
			demoLink: "http://myblog.abdelkarim.rf.gd/",
			desc: "Developing a customized WordPress theme for a personal blog website using HTML, CSS, JS, SASS, Bootstrap, PHP, and WordPress. This project started by installing a new customized theme, based on the PHP Loop provided by WordPress, pages, posts, and sidebars, then editing their appearance and responsiveness across all devices using Bootstrap and Sass, and some JS to fix issues cannot be handled using just HTML and CSS.",
		},
		{
			name: "Startup Website",
			techs: ["bootstrap", "js", "css"],
			imgLink: "Stara Immo.png",
			demoLink: "http://stara-immo.rf.gd/",
			desc: "This project highlights the services provided by a building construction company, the website was built under the requirements provided by the in-house marketing strategist. the website is SEO Friendly, not built by Elementor or another plugin, but the owner wanted to have a customized theme that suits his domain of expertise. So I built a new theme from scratch using mainly Bootstrap and Sass, configuring the backend using WordPress PHP Loops, sidebars, pages, and installing plugins such as WPforms.",
		},
		{
			name: "Online Store",
			techs: ["bootstrap", "js", "css"],
			imgLink: "SuitedUp.png",
			demoLink: "http://suitedup.rf.gd/",
			desc: "In this project, I initiated the development process with a thorough WooCommerce store setup, configuring product categories, attributes, and payment gateways with Stripe to create a fully functional e-commerce platform. My focus was on designing a user-friendly and visually appealing online store, optimizing product listings, implementing secure transaction processing, and integrating essential e-commerce features for a seamless shopping experience.",
		},
		{
			name: "PHP App",
			techs: ["bootstrap", "js", "css"],
			imgLink: "PHP App.png",
			demoLink: "http://blog.abdelkarim.rf.gd/",
			desc: "In this project, I began with the design of a robust MySQL database, establishing a structured foundation for a feature-rich PHP and MySQL-based blog system. This system offer user registration, content management, categorization, and interaction features using HTML, CSS and JavaScript, with a strong focus on security and responsive web design.",
		},
		{
			name: "PSD Conversion",
			techs: ["bootstrap", "js", "css"],
			imgLink: "Template 1.png",
			demoLink: "https://abdelkarim-achlaih.github.io/Template-One/",
			desc: "In this project, I transformed a given PSD design into a fully functional website using HTML and CSS. I meticulously coded and optimized the design to ensure it's responsive and accessible, providing a seamless user experience across various devices and browsers.",
		},
		{
			name: "PSD Conversion",
			techs: ["bootstrap", "js", "css"],
			imgLink: "Template 2.png",
			demoLink: "https://abdelkarim-achlaih.github.io/Template-Two/",
			desc: "In this project, I transformed a given PSD design into a fully functional website using HTML, CSS and JavaScript. I meticulously coded and optimized the design to ensure it's responsive and accessible, providing a seamless user experience across various devices and browsers.",
		},
		{
			name: "PSD Conversion",
			techs: ["bootstrap", "js", "css"],
			imgLink: "Template 3.png",
			demoLink: "https://abdelkarim-achlaih.github.io/Template-Three/",
			desc: "In this project, I transformed a given PSD design into a fully functional website using HTML, CSS and JavaScript. I meticulously coded and optimized the design to ensure it's responsive and accessible, providing a seamless user experience across various devices and browsers.",
		},
	];
	projectsContent.forEach((project) => {
		let div = document.createElement("div");
		div.classList.add("col-lg-4");
		div.innerHTML = `
					<div class="work p-lg-5 p-3 rounded-4 mb-5">
						<div class="work-info mb-4 d-flex justify-content-between">
							<h3 class="fs-5" data-content="">${project.name}</h3>
							<div class="languages">
								<i class="fa-brands fa-bootstrap"></i>
								<i class="fa-brands fa-square-js"></i>
								<i class="fa-brands fa-css3-alt"></i>
							</div>
						</div>
						<div class="work-img rounded-4"><img src="images/${project.imgLink}" alt="" class="img-fluid rounded-4"></div>
						<div class="work-links">
							<div class="work-link">
								<a href="${project.demo}" target="_blank" data-content="">Live Demo</a>
							</div>
							<div class="work-link">
								<a href="https://github.com/abdelkarim-achlaih/Fylo" target="_blank" data-content="">View Code</a>
							</div>
						</div>
					</div>
		`;
		projectsContainer.append(div);
	});
}
