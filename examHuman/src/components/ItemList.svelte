<script>
    import ItemDetails from "./ItemDetails.svelte";
    import { fade, scale } from "svelte/transition";
    import { flip } from "svelte/animate";

    let items = [];
    async function getItems() {
        const response = await fetch("/api/getAllItems");
        const data = await response.json();
        items = data;
    }
    getItems();
</script>

<div class="item-list">
    {#each items as item (item.itemId)}
        <div in:fade out:scale|local animate:flip={{ duration: 500 }}>
            <ItemDetails {item} />
        </div>
    {/each}
</div>

<style>
    .item-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }
</style>
