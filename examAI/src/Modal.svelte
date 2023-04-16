<script>
    export let title = "";
    export let isOpen = false;
    export let onSave;
    export let onCancel;
    export let data;

    let newName = data.name;
    let newCountry = data.country;
    let newHobby = data.hobby;

    function handleSubmit() {
        const newData = {
            name: newName,
            country: newCountry,
            hobby: newHobby,
        };
        onSave(newData);
    }

    function handleCancel() {
        onCancel();
        closeModal();
    }

    function closeModal() {
        data = { name: "", country: "", hobby: "" };
    }
</script>

<div class={`modal ${isOpen ? "open" : ""}`}>
    <div class="modal-content">
        <h2>{title}</h2>
        <form>
            <div class="form-group">
                <label for="name">Enter your full name</label>
                <input type="text" id="name" bind:value={data.name} />
            </div>
            <div class="form-group">
                <label for="country">Which country do you live in?</label>
                <input type="text" id="country" bind:value={data.country} />
            </div>
            <div class="form-group">
                <label for="hobby">What's your favourite hobby?</label>
                <input type="text" id="hobby" bind:value={data.hobby} />
            </div>
        </form>
        <div class="modal-buttons">
            <button class="button red" on:click={handleCancel}>Cancel</button>
            <button class="button green" on:click={handleSubmit}>Save</button>
        </div>
    </div>
    <div class="modal-overlay" on:click={handleCancel} />
</div>

<style>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .modal.open {
        opacity: 1;
        visibility: visible;
    }

    .modal-content {
        background-color: white;
        padding: 32px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        max-width: 500px;
        width: 100%;
        position: relative;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
    }

    label {
        font-weight: bold;
        margin-bottom: 8px;
    }

    input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .modal-buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;
    }

    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
</style>
