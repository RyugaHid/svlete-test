<script lang="ts">
	import typing from '$lib/typing';
	let interval: number = 100;
	let inputValue: number = 100;
	let isDisabled = true;
	let node: HTMLDivElement | null = null;
	let typingAction: ReturnType<typeof typing> | null = null;
	const handleInput = () => {
		isDisabled = !Number(inputValue !== interval);
	};
	const apply = () => {
		isDisabled = true;
		interval = inputValue;
	};

	const reset = () => {
		isDisabled = true;
		inputValue = 100;
		interval = inputValue;

		if (typingAction && 'reset' in typingAction) {
			(typingAction as any).reset();
		}
	};
	const bindTyping = (node: HTMLDivElement, interval: number) => {
		typingAction = typing(node, interval);
		return typingAction;
	};
</script>

<main>
	<input bind:value={inputValue} type="number" on:input={handleInput} />
	<button class="apply" on:click={apply} disabled={isDisabled}>Apply</button>
	<button class="reset" on:click={reset}>Reset</button>
	<div use:bindTyping={interval} class="text" bind:this={node}>
		На просторах интернета существует множество интересных площадок, где пользователи могут делиться
		своими знаниями и опытом. Одна из таких площадок — Pikabu, популярный развлекательный портал с
		множеством интересных историй, мемов и другого контента. На Pikabu можно найти увлекательные
		рассказы о рыбалке, в том числе и с хорошим уловом. Пользователи делятся своими впечатлениями от
		процесса ловли рыбы и рассказывают об особенностях своего хобби. На Pikabu также можно найти
		познавательные статьи о различных видах рыб, их особенностях и среде обитания. Это может быть
		полезно как для начинающих рыболовов, так и для тех, кто просто интересуется миром природы.
		Кроме того, на Pikabu есть возможность обсудить свои рыболовные истории с другими
		пользователями, задать вопросы или поделиться опытом. Здесь царит дружелюбная атмосфера, где
		каждый может найти что-то интересное для себя.
	</div>
</main>

<style>
	main {
		max-width: 700px;
		margin: 0 auto;
		height: 300px;
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		font-family: 16px Arial, Helvetica, sans-serif ;

	}
	.text {
		background-color: #eeeeee;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.text::-webkit-scrollbar {
		display: none;
	}
	input {
		flex: 1;
		min-width: 0;
	}
</style>
