<script>
    import ItemDetails from "./ItemDetails.svelte";
    import { fade, scale } from "svelte/transition";
    import { flip } from "svelte/animate";
    import Modal from "./structuralComponents/EditModal.svelte";
    import { items }  from "./Store";

    
    let showModal = false;
    let modalItem = [];

    export async function getItems() {
        const response = await fetch("/api/getAllItems");
        const data = await response.json();
        items.set(data);
        items.update(value => value.reverse());
    }

    getItems();

    const deleteItem = async (e) => {
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
        items.update(value =>value.filter((value) => itemId != value.itemId));
    };

    const modifyItem = async (e) => {
        showModal = true;
        modalItem = e.detail;
    };

</script>

<div class="item-list">
    {#each $items as item (item.itemId)}
        <div in:fade out:scale|local animate:flip={{ duration: 500 }}>
            <ItemDetails
                {item}
                on:deleteItem={deleteItem}
                on:modifyItem={modifyItem}
            />
        </div>
    {/each}
    {#if showModal == true}
        <Modal bind:showModal {modalItem} {getItems}/>
    {/if}
</div>

<style>
    .item-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
    }
</style>
