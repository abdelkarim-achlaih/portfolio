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

let lis = document.querySelectorAll(".testimonials li");
let tabs = document.querySelectorAll(".testimonials .tab");

tabs[0].style.display = "block";
lis.forEach((li) => {
	li.onclick = function () {
		lis.forEach((li) => {
			li.classList.remove("active");
		});
		this.classList.add("active");
		tabs.forEach((tab) => {
			if (tab.dataset.type === this.dataset.num) {
				tab.style.display = "block";
			} else {
				tab.style.display = "none";
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
};

window.onload = (_) => {
	contact();
	setHeight(servicesPara);
	setHeight(servicesTitle);
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
