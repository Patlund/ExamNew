<script>
  export let show = false;
  export let title = '';
  export let name = '';
  export let country = '';
  export let hobby = '';
  
  function closeModal() {
    show = false;
  }
  
  function saveChanges() {
    const data = {
      name,
      country,
      hobby
    };
    // Call the function to update the item in the database here
    closeModal();
  }
</script>

{#if show}
  <div class="modal">
    <div class="modal-content">
      <span class="close" on:click={closeModal}>&times;</span>
      <h2>{title}</h2>
      <div class="input-group">
        <label for="name">Enter your full name:</label>
        <input type="text" id="name" bind:value={name}>
      </div>
      <div class="input-group">
        <label for="country">Which country do you live in?</label>
        <input type="text" id="country" bind:value={country}>
      </div>
      <div class="input-group">
        <label for="hobby">What's your favourite hobby?</label>
        <input type="text" id="hobby" bind:value={hobby}>
      </div>
      <div class="button-group">
        <button class="cancel" on:click={closeModal}>Cancel</button>
        <button class="save" on:click={saveChanges}>Save Changes</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    display: block;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    max-width: 600px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .input-group {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    display: block;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-top: 5px;
    font-size: 16px;
  }
  
  .button-group {
    margin-top: 20px;
    text-align: right;
  }
  
  button {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
  }
  
  .cancel {
    background-color: #ddd;
    color: #333;
  }
  
  .save {
    background-color: green;
    color: white;
  }
</style>