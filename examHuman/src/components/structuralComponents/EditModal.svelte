<script>
    import Button from "./Button.svelte";

    export let showModal = false;
    export let modalItem;

    modalItem = {
        name: modalItem.name,
        country: modalItem.country,
        hobby: modalItem.hobby,
    };

    let errors = { name: "", country: "", hobby: "" };

    $: showModal;

    function toggleModal() {
        showModal = !showModal;
        console.log("From the modal: " + showModal);
    }
</script>

{#if showModal}
    <div class="modal">
        <form on:submit|preventDefault={submitHandler}>
            <div class="form-field">
                <label for="fullName">Enter your full name</label>
                <input type="text" id="name" bind:value={modalItem.name} />
                <div class="error">{errors.name}</div>
            </div>
            <div class="form-field">
                <label for="country">Which country do you live in?</label>
                <input
                    type="text"
                    id="country"
                    bind:value={modalItem.country}
                />
                <div class="error">{errors.country}</div>
            </div>
            <div class="form-field">
                <label for="hobby">What's your favourite hobby?</label>
                <input type="text" id="hobby" bind:value={modalItem.hobby} />
                <div class="error">{errors.hobby}</div>
            </div>
            <Button type="addItem">Confirm</Button>
        </form>
        <div class="modal-content" />
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
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
</style>
