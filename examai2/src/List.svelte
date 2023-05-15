<script>
    import { activeMenu } from "./store";
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

{#each items as item}
    <!-- Render item details -->
    <p>{item.name} - {item.country} - {item.hobby}</p>
    <Button color="green" on:click={() => openModal(item)}>Edit</Button>
    <Button color="red" on:click={() => deleteItem(item.itemId)}>Delete</Button>
{/each}

<Modal bind:open={modalOpen} bind:currentItem on:updateItem={updateItem} />
