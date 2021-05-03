import { 
	_inputs,
	_labels,
	_form,
	_cta,
	_btnNext,
	_btnPrev,
	_main,
	_progress,
	_circles,
	_sections,
	_code } from './abstracts/variables.js';

import { downloadObjectAsJson } from './abstracts/functions.js';

class App {
	constructor() {
		this.init();
		this.currentActive = 1;
		this.obj = {};
	}

	update() {
		_circles.forEach((circle, idx) => {
			if (idx < this.currentActive) {
				circle.classList.add('active');
			} else {
				circle.classList.remove('active');
			}
		});

		const _actives = document.querySelectorAll('.active');

		_progress.style.width = `${((_actives.length - 1) / (_circles.length - 1)) * 100}%`;

		if (this.currentActive === 1) {
			_btnPrev.disabled = true;
		} else if (this.currentActive === _circles.length) {
			_btnNext.disabled = true;
		} else {
			_btnPrev.disabled = false;
			_btnNext.disabled = false;
		}

		_sections.forEach(section => section.classList.remove('show'));
		_sections[this.currentActive - 1].classList.add('show');

		if (this.currentActive === 4) {
			_inputs.forEach(input => {
				if (input.value) {
					if (input.id === 'keywords') {
						this.obj[input.id] = input.value.split(' ');
					} else if (input.id === 'private') {
						this.obj[input.id] = (input.value === 'true');
					} else {
						this.obj[input.id] = input.value;
					}
				}
			});
			_code.textContent = JSON.stringify(this.obj, null, 2);
		}
	}

	init() {
		_inputs.forEach(input => input.value = '');

		_cta.addEventListener('click', () => _main.scrollIntoView({ behavior: 'smooth' }));

		_labels.forEach(label => {
			label.innerHTML = label.innerText.split('').map((letter, idx) => `<span style="transition-delay:${idx*50}ms">${letter}</span>`).join('');
		});

		_form.addEventListener('input', function(e) {
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

		_btnNext.addEventListener('click', () => {
			this.currentActive++;

			if (this.currentActive > _circles.length) {
				this.currentActive = circles.length;
			}

			this.update();
		});

		_btnPrev.addEventListener('click', () => {
			this.currentActive--;

			if (this.currentActive < 1) {
				this.currentActive = 1;
			}

			this.update();
		});


		_form.addEventListener('submit', (e) => {
			e.preventDefault();
			downloadObjectAsJson(this.obj, 'package');
		});
	}
}

new App();
