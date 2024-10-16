<script lang="ts">
	import typing from '$lib/typing';

	const apply = () => {
		// Part of task 2
	};

	const reset = () => {
		// Part of task 2
	};
</script>

<main>
	<input type="number" />
	<button class="apply" on:click={apply}>Apply</button>
	<button class="reset" on:click={reset}>Reset</button>
	<div use:typing={100} />
</main>

<style>
	/* Task 1 */
</style>
