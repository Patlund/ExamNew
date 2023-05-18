<script>
  import { onMount } from "svelte";
  // @ts-ignore
  import Button from "./Button.svelte";

  let name = "";
  let country = "";
  let hobby = "";

  const createItem = async () => {
    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        country,
        hobby,
      }),
    });

    if (response.ok) {
      // success, do something here
      name = "";
      country = "";
      hobby = "";
    } else {
      // error handling here
    }
  };

  onMount(() => {
    // highlight 'Add New Items' in the menu
  });
</script>

<form on:submit={createItem}>
  <div class="add-new-item">
    <div class="input-field">
      <label for="name">Enter your full name</label>
      <input type="text" id="name" bind:value={name} />
    </div>
    <div class="input-field">
      <label for="country">Which country do you live in?</label>
      <input type="text" id="country" bind:value={country} />
    </div>
    <div class="input-field">
      <label for="hobby">What's your favourite hobby?</label>
      <input type="text" id="hobby" bind:value={hobby} />
    </div>
    <Button color="green" on:click={() => createItem}>Create Item</Button>
  </div>
</form>

<style>
  .add-new-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }

  .input-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    width: 100%;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    width: 100%;
  }
</style>
