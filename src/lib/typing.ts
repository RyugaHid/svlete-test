import type { Action } from 'svelte/action';

type TypingAction = Action<HTMLElement, number> & {
	reset?: () => void;
};

const typing: TypingAction = (node: any, interval) => {
	let text = node.textContent || '';
	const divWidth = node.clientWidth;
	console.log('divWidth', divWidth);
	let wordIndex = 0;
	let charIndex = 0;
	let intervalId: number;
	let words = text.split(' ');
	const getTextWidth = (text: any): any => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		if (context) {
			return context.measureText(text).width;
		}
		return 0;
	};
	const getDistanceFromTextToRight = (word: any) => {
		const regex = /.$/;
		const lastChar = word.textContent.match(regex)[1];
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		const lastWordWidth: any = context?.measureText(lastChar).width;
		const elementWidth = word.clientWidth;
		const distance = elementWidth - lastWordWidth;
		return distance;
	};
	const startInterval = () => {
		clearInterval(intervalId);
		node.textContent = '';

		intervalId = setInterval(() => {
			if (wordIndex < words.length) {
				let word = words[wordIndex];
				const nextWordWidth = getTextWidth(word);

				if (charIndex < word.length) {
					node.textContent += word[charIndex];

					charIndex++;
				} else {
					node.textContent += ' ';
					wordIndex++;
					charIndex = 0;
				}
			} else {
				clearInterval(intervalId);
			}
		}, interval);
	};

	startInterval();

	function reset() {
		wordIndex = 0;
		charIndex = 0;
		startInterval();
	}

	const returnValue = {
		update(newInterval: number) {
			clearInterval(intervalId);
			intervalId = setInterval(() => {
				if (wordIndex < words.length) {
					let word = words[wordIndex];
					const currentTextWidth = getTextWidth(node.textContent);
					const nextWordWidth = getTextWidth(word);

					if (currentTextWidth + nextWordWidth + getTextWidth(' ') > node.clientWidth) {
						node.innerHTML += '<br>';
					}
					if (charIndex < word.length) {
						node.textContent += word[charIndex];
						charIndex++;
					} else {
						node.textContent += ' ';
						wordIndex++;
						charIndex = 0;
					}
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
