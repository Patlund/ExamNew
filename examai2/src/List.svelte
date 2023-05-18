<script>
    import { activeMenu } from "./store";
    import Button from "./Button.svelte";
    import Modal from "./Modal.svelte";
    import { onMount } from "svelte";

    let items = [];
    let modalOpen = false;
    let currentItem = { itemId: null, name: "", country: "", hobby: "" };

    async function fetchItems() {
        const response = await fetch("/api/items");
        items = await response.json();
    }

    async function deleteItem(itemId) {
        await fetch(`/api/items/${itemId}`, { method: "DELETE" });
        await fetchItems();
    }

    function openModal(item) {
        currentItem = { ...item, itemId: item.itemId };
        modalOpen = true;
    }

    async function updateItem(updatedItem) {
        await fetch(`/api/items/${updatedItem.itemId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedItem),
        });
        modalOpen = false;
        await fetchItems();
    }

    onMount(fetchItems);
</script>

<!-- List component content and styles -->

<div class="items-list">
    {#each items as item (item.itemId)}
        <div class="item">
            <p>{item.name} - {item.country} - {item.hobby}</p>
            <Button color="green" on:click={() => openModal(item)}>Edit</Button>
            <Button color="red" on:click={() => deleteItem(item.itemId)}>
                Delete
            </Button>
        </div>
    {/each}
</div>

<Modal bind:open={modalOpen} bind:currentItem {updateItem} />

<style>
    .items-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        margin-top: 20px;
    }

    .item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        width: 80%;
        max-width: 400px;
    }
</style>
