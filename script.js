const cta = document.querySelector('.btn--cta');
const main = document.querySelector('.main');
const labels = document.querySelectorAll('.input-group__label');
const inputs = document.querySelectorAll('.input-group__input')
const form = document.querySelector('.form');
const progress = document.querySelector('.progress-container__progress');
const btnNext = document.querySelector('.btn--next');
const btnPrev = document.querySelector('.btn--prev');
const circles = document.querySelectorAll('.progress-container__circle');
const sections = document.querySelectorAll('.section');
const code = document.querySelector('.code-container__code');

inputs.forEach(input => input.value = '');

cta.addEventListener('click', () => main.scrollIntoView({ behavior: 'smooth' }));

labels.forEach(label => {
	label.innerHTML = label.innerText.split('').map((letter, idx) => `<span style="transition-delay:${idx*50}ms">${letter}</span>`).join('');
});

form.addEventListener('input', function(e) {
	if (e.target.classList.contains('input-group__input')) {
		const spans = e.target.nextElementSibling.children;
		for (const span of spans) {
			if (e.target.value !== '' && !span.classList.contains('translated')) {
					span.classList.add('translated');
			} else if (e.target.value === '' && span.classList.contains('translated')) {
					span.classList.remove('translated');
			}
		};
	}
});

let currentActive = 1;
let obj = {
							"name": "test-project",
							"version": "1.0.0",
							"description": "A Vue.js project",
							"main": "src/main.js","private": true
						};

function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function update() {
	circles.forEach((circle, idx) => {
		if (idx < currentActive) {
			circle.classList.add('active');
		} else {
			circle.classList.remove('active');
		}
	});

	const actives = document.querySelectorAll('.active');

	progress.style.width = `${((actives.length - 1) / (circles.length - 1)) * 100}%`;

	if (currentActive === 1) {
		btnPrev.disabled = true;
	} else if (currentActive === circles.length) {
		btnNext.disabled = true;
	} else {
		btnPrev.disabled = false;
		btnNext.disabled = false;
	}

	sections.forEach(section => section.classList.remove('show'));
	sections[currentActive - 1].classList.add('show');

	if (currentActive === 4) {
		code.textContent = JSON.stringify(obj, null, 2);
	}
}

btnNext.addEventListener('click', () => {
	currentActive++;

	if (currentActive > circles.length) {
		currentActive = circles.length;
	}

	update();
});

btnPrev.addEventListener('click', () => {
	currentActive--;

	if (currentActive < 1) {
		currentActive = 1;
	}

	update();
});

form.addEventListener('submit', function(e) {
	e.preventDefault();
	downloadObjectAsJson(obj, 'package');
});

