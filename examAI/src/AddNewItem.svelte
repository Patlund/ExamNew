<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let fullName = "";
    let country = "";
    let hobby = "";

    function submitForm() {
        const formData = {
            fullName,
            country,
            hobby,
        };
        fetch("/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch("itemCreated", data);
            });
    }
</script>

<div class="add-new-item-container">
    <label for="fullName">Enter your full name:</label>
    <input type="text" id="fullName" bind:value={fullName} />

    <label for="country">Which country do you live in?</label>
    <input type="text" id="country" bind:value={country} />

    <label for="hobby">What's your favourite hobby?</label>
    <input type="text" id="hobby" bind:value={hobby} />

    <button on:click={submitForm}>Add Item</button>
</div>

<style>
    .add-new-item-container {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border: 1px solid #ccc;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
    }

    label {
        margin-top: 0.5rem;
        font-size: 1.2rem;
        font-weight: bold;
    }

    input[type="text"] {
        padding: 0.5rem;
        border-radius: 3px;
        border: 1px solid #ccc;
        margin-bottom: 1rem;
    }

    button {
        margin-top: 1rem;
        padding: 0.5rem;
        background-color: #008000;
        color: #fff;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
</style>
