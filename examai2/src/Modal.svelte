<script>
    import Button from "./Button.svelte";
    export let open = false;
    export let currentItem = { itemId: null, name: "", country: "", hobby: "" };
    export let updateItem;

    function close() {
        open = false;
    }
</script>

{#if open}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="modal" on:click={close}>
        <div class="modal-content" on:click={(e) => e.stopPropagation()}>
            <h2>Edit Item</h2>
            <input
                type="text"
                class="input-field"
                bind:value={currentItem.name}
                placeholder="Your full name"
            />
            <input
                type="text"
                class="input-field"
                bind:value={currentItem.country}
                placeholder="Country"
            />
            <input
                type="text"
                class="input-field"
                bind:value={currentItem.hobby}
                placeholder="Your favourite hobby"
            />
            <Button color="green" on:click={() => updateItem(currentItem)}>
                Update Item
            </Button>
            <Button color="red" on:click={close}>Cancel</Button>
        </div>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 400px;
    }

    .input-field {
        width: 100%;
        padding: 5px;
        margin-bottom: 20px;
    }
</style>
