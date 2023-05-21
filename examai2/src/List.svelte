<script>
    import { activeMenu } from "./store";
    import { onMount } from "svelte";
    import Button from "./Button.svelte";
    import Modal from "./Modal.svelte";

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
        currentItem = { ...item };
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

<div class="items-grid">
    {#each items as item (item.itemId)}
        <div class="item-box">
            <ul class="item-list">
                <li>Name: {item.name}</li>
                <li>Country: {item.country}</li>
                <li>Hobby: {item.hobby}</li>
            </ul>
            <Button color="green" on:click={() => openModal(item)}>Edit</Button>
            <Button color="red" on:click={() => deleteItem(item.itemId)}
                >Delete</Button
            >
        </div>
    {/each}
</div>

<Modal bind:open={modalOpen} bind:currentItem on:updateItem={updateItem} />

<style>
    .items-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
        padding: 1rem;
    }

    .item-box {
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 1rem;
        background-color: #f9f9f9;
    }

    .item-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .item-list li {
        margin-bottom: 0.5rem;
    }
</style>
