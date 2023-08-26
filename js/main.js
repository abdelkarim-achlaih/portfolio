let introduceSection = document.querySelector(".introduce");
let skills = document.querySelectorAll(".skills .skill");

let showed = false;

window.onscroll = (_) => {
	if (window.scrollY > introduceSection.offsetTop - 200 && !showed) {
		let time = 0;
		skills.forEach((skill) => {
			setTimeout(() => {
				skill.classList.add("animate");
			}, time);
			time += 700;
		});
		showed = true;
	}
};
