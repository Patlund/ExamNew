<script>
    import { activeMenu } from "./store";
    import Button from "./Button.svelte";

    let name = "";
    let country = "";
    let hobby = "";

    async function handleSubmit() {
        const response = await fetch("/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, country, hobby }),
        });

        if (response.ok) {
            activeMenu.set("Items");
        } else {
            console.error("Error creating item");
        }
    }
</script>

<div class="input-container">
    <label for="name" class="input-label">Enter your full name</label>
    <input
        id="name"
        type="text"
        class="input-field"
        bind:value={name}
        placeholder="Your full name"
    />

    <label for="country" class="input-label"
        >Which country do you live in?</label
    >
    <input
        id="country"
        type="text"
        class="input-field"
        bind:value={country}
        placeholder="Country"
    />

    <label for="hobby" class="input-label">What's your favourite hobby?</label>
    <input
        id="hobby"
        type="text"
        class="input-field"
        bind:value={hobby}
        placeholder="Your favourite hobby"
    />

    <Button color="green" on:click={handleSubmit}>Add Item</Button>
</div>

<style>
    .input-container {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
    }

    .input-label {
        display: block;
        margin-bottom: 5px;
    }

    .input-field {
        width: 100%;
        padding: 5px;
        margin-bottom: 20px;
    }
</style>
