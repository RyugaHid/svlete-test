import type { Action } from 'svelte/action';

type TypingAction = Action<HTMLElement, number> & {
	reset?: () => void;
};

const typing: TypingAction = (node, interval) => {
	let text = node.textContent || '';
	let index = 0;
	let intervalId: number;

	const startInterval = () => {
		clearInterval(intervalId);
		node.textContent = '';
		index = 0;
		intervalId = setInterval(() => {
			if (index < text.length) {
				node.textContent += text.charAt(index);
				index++;
			} else {
				clearInterval(intervalId);
			}
		}, interval);
	};

	startInterval();

	function reset() {
		index = 0;
		startInterval();
	}

	const returnValue = {
		update(newInterval: number) {
			clearInterval(intervalId);
			intervalId = setInterval(() => {
				if (index < text.length) {
					node.textContent += text.charAt(index);
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

	// Добавляем метод reset к возвращаемому объекту
	(returnValue as any).reset = reset;

	return returnValue;
};

export default typing;
