<script>
    import { onMount } from 'svelte';
    import Button from './Button.svelte';
    import UpdateModal from './Modal.svelte';
    
    let items = [];
    let showUpdateModal = false;
    let selectedItem = null;

  
    const fetchItems = async () => {
      const response = await fetch('/api/items');
      items = await response.json();
    }
  
    onMount(() => {
      fetchItems();
    });
  
    const deleteItem = async (itemId) => {
      await fetch(`/api/items/${itemId}`, { method: 'DELETE' });
      items = items.filter(item => item.itemId !== itemId);
    }
  
    const updateItem = async (itemId, updatedItem) => {
      await fetch(`/api/items/${itemId}`, { method: 'PUT', body: JSON.stringify(updatedItem) });
      const index = items.findIndex(item => item.itemId === itemId);
      items[index] = updatedItem;
    }

    function openUpdateModal(item) {
    showUpdateModal = true;
    selectedItem = item;
  }

  function closeUpdateModal() {
    showUpdateModal = false;
    selectedItem = null;
  }
  </script>
  
  <h1>Items</h1>
  
  <div class="item-grid">
    {#each items as item (item.itemId)}
      <div class="item-box">
        <ul class="item-list">
          <li>Name: {item.name}</li>
          <li>Country: {item.country}</li>
          <li>Hobby: {item.hobby}</li>
        </ul>
        <div>
          <Button color="green" on:click={() => updateItem(item.itemId, { name: 'new name', country: 'new country', hobby: 'new hobby' })}>Update</Button>
          <Button color="red" on:click={() => deleteItem(item.itemId)}>Delete</Button>
        </div>
      </div>
    {/each}
    {#if showUpdateModal}
  <UpdateModal item={selectedItem} on:close={closeUpdateModal} on:update={updateItem} />
{/if}
  </div>

  <style>
    .item-box {
      padding: 1rem;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      margin: 0.5rem;
      display: flex;
      flex-direction: column;
    }
  
    .item-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  
    .item-list li {
      margin-bottom: 0.5rem;
    }
  
    .item-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 1rem;
    }
  </style>