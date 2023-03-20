<script>
    import ItemDetails from "./ItemDetails.svelte";
    import { fade, scale } from "svelte/transition";
    import { flip } from "svelte/animate";

    let items = [];
    async function getItems() {
        const response = await fetch("/api/getAllItems");
        const data = await response.json();
        items = data;
        items.reverse();
    }
    getItems();

    const deleteItem = async (e) => {
        console.log(e.detail.itemId);
        const itemId = e.detail.itemId;
        await fetch("/api/deleteItem", {
            method: "DELETE",
            body: JSON.stringify({
                itemId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).catch((err) => console.log(err));
        let changedArray = items.filter((item) => itemId != item.itemId);
        console.log(changedArray);
        items = changedArray;
    };
</script>

<div class="item-list">
    {#each items as item (item.itemId)}
        <div in:fade out:scale|local animate:flip={{ duration: 500 }}>
            <ItemDetails {item} on:deleteItem={deleteItem} />
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
