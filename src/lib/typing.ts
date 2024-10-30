import type { Action } from 'svelte/action';

type TypingAction = Action<HTMLElement, number> & {
	reset?: () => void;
};

const typing: TypingAction = (node: HTMLElement, interval: number) => {
	let text = node.textContent || '';
	let wordIndex = 0;
	let charIndex = 0;
	let intervalId: number;
	let words = text.split(' ');
	const getTextWidth = (text: any): any => {
		const canvas = document.createElement('canvas');
		const context: any = canvas.getContext('2d');
		context.font = window.getComputedStyle(node).font;
		if (context) {
			return context.measureText(text).width;
		}
		return 0;
	};
	const getLastLine = (node: HTMLElement) => {
		const text = (node.textContent || '').trim();
		let currentLine = '';
		const words = text.split(' ');
		const containerWidth = node.clientWidth;

		for (let word of words) {
			const testLine = currentLine + word + ' ';
			const testWidth = getTextWidth(testLine);
			if (testWidth > containerWidth && currentLine) {
				currentLine = word + ' ';
			} else {
				currentLine = testLine;
			}
		}

		return currentLine.trim();
	};

	const getOffsetRight = (node: HTMLElement) => {
		const lastLineWidth = getTextWidth(getLastLine(node));
		const distance = node.offsetWidth - lastLineWidth;
		return distance;
	};
	const startInterval = () => {
		clearInterval(intervalId);
		node.textContent = '';
		let isNewWord = false;
		intervalId = setInterval(() => {
			if (wordIndex < words.length) {
				let word = words[wordIndex] || '';

				if (getTextWidth(word) && getOffsetRight(node) - getTextWidth(word) < 0 && isNewWord) {
					node.innerHTML += '<br>';
				}
				if (charIndex < word.length) {
					node.innerHTML += word[charIndex];
					isNewWord = false;
					charIndex++;
				} else {
					node.textContent += ' ';
					wordIndex++;
					isNewWord = true;
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
			let isNewWord = false;
			intervalId = setInterval(() => {
				if (wordIndex < words.length) {
					let word = words[wordIndex] || '';
					if (
						getTextWidth(word) &&
						getOffsetRight(node) &&
						getOffsetRight(node) - getTextWidth(word) < 0 &&
						isNewWord
					) {
						node.innerHTML += '<br>';
					}
					if (charIndex < word.length) {
						node.innerHTML += word[charIndex];
						isNewWord = false;
						charIndex++;
					} else {
						node.textContent += ' ';
						wordIndex++;
						isNewWord = true;
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
