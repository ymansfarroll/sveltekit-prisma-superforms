<script lang="ts">
	import { Helper } from 'flowbite-svelte';
	export let message: string[];
</script>

<Helper class="mt-2" color="red">
	<span class="font-medium">Oh, snapp!</span>
	{message}
</Helper>
