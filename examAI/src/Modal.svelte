<script>
    // @ts-ignore
    import Button from './Button.svelte';
    export let item;
  
    let name = item.name;
    let country = item.country;
    let hobby = item.hobby;
  
    function handleSubmit() {
      const updatedItem = {
        itemId: item.itemId,
        name,
        country,
        hobby
      };
      fetch('/api/items', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedItem)
      })
        .then(response => response.json())
        .then(data => {
          // Handle successful update
        })
        .catch(error => {
          console.error(error);
          // Handle error
        });
    }
  </script>
  
  <div class="modal">
    <h2>Update Item</h2>
    <div class="form-group">
      <label for="name">Enter your full name</label>
      <input type="text" id="name" bind:value={name}>
    </div>
    <div class="form-group">
      <label for="country">Which country do you live in?</label>
      <input type="text" id="country" bind:value={country}>
    </div>
    <div class="form-group">
      <label for="hobby">What's your favourite hobby?</label>
      <input type="text" id="hobby" bind:value={hobby}>
    </div>
    <div class="button-group">
      <Button color="green" on:click={handleSubmit}>Update</Button>
    </div>
  </div>