import type { Action } from 'svelte/action';

type TypingAction = Action<HTMLElement, number> & {
	reset?: () => void;
};

export const typing: TypingAction = (node: HTMLElement, interval) => {
	let index = 0;
	const text = node.textContent?.trim() || '';

	const arr = text.split('');
	node.textContent = '';
	for (let i of arr) {
		let span = document.createElement('span');
		span.style.opacity = '0';
		span.textContent = i;
		node.appendChild(span);
	}
	let spans: any = Array.from(node.querySelectorAll('span'));
	let intervalId = 0;

	const startInterval = () => {
		clearInterval(intervalId);

		intervalId = setInterval(() => {
			if (index < spans.length) {
				spans[index].style.opacity = '1';
				index++;
			} else {
				clearInterval(intervalId);
			}
		}, interval);
	};

	startInterval();

	function reset() {
		index = 0;
		node.textContent = '';
		for (let i of arr) {
			let span = document.createElement('span');
			span.style.opacity = '0';
			span.textContent = i;
			node.appendChild(span);
		}
		spans = Array.from(node.querySelectorAll('span'));
		startInterval();
	}

	const returnValue = {
		update(newInterval: number) {
			clearInterval(intervalId);
			intervalId = setInterval(() => {
				if (index < spans.length) {
					spans[index].style.opacity = '1';
					index++;
				} else {
					clearInterval(intervalId);
				}
			}, newInterval);
		},
		destroy() {
			clearInterval(intervalId);
		},
	};

	(returnValue as any).reset = reset;

	return returnValue;
};

export default typing;
