<script>
    import { onMount } from "svelte";
    import Button from "./Button.svelte";
    import Modal from "./Modal.svelte";

    let items = [];

    async function fetchItems() {
        const response = await fetch("/items");
        const data = await response.json();
        items = data.items;
    }

    async function deleteItem(id) {
        await fetch(`/items/${id}`, { method: "DELETE" });
        items = items.filter((item) => item.id !== id);
    }

    function openModal(item) {
        // set the current item in the modal
    }

    onMount(fetchItems);
</script>

<h1>Items</h1>

<div class="items-container">
    {#each items as item}
        <div class="item-box">
            <ul>
                <li><strong>Full name:</strong> {item.full_name}</li>
                <li><strong>Country:</strong> {item.country}</li>
                <li><strong>Hobby:</strong> {item.hobby}</li>
            </ul>
            <div class="buttons">
                <Button on:click={() => deleteItem(item.id)} color="red"
                    >Delete</Button
                >
                <Button on:click={() => openModal(item)} color="green"
                    >Edit</Button
                >
            </div>
        </div>
    {/each}
</div>

<Modal />
