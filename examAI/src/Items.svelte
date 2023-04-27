<script lang="ts">
    import { onMount } from 'svelte';
    import Button from './Button.svelte';
  
    let items = [];
  
    async function fetchItems() {
      const response = await fetch('/api/items');
      items = await response.json();
    }
  
    onMount(fetchItems);

    function openModal(item) {
    const modalContent = `
      <h2>Update Item</h2>
      <label>Enter your full name</label>
      <input type="text" name="name" value="${item.name}">
      <label>Which country do you live in?</label>
      <input type="text" name="country" value="${item.country}">
      <label>What's your favourite hobby?</label>
      <input type="text" name="hobby" value="${item.hobby}">
    `;
    showModal(modalContent, () => updateItem(item.itemId));
  }

    async function deleteItem(itemId) {
      const response = await fetch(`/api/items/${itemId}`, { method: 'DELETE' });
      if (response.ok) {
        // remove item from the list
        items = items.filter(item => item.itemId !== itemId);
      }
    }
  
    // function to update an item
  async function updateItem(itemId) {
    const form = document.querySelector('.modal input[name="name"]').form;
    const formData = new FormData(form);
    const body = {
      name: formData.get('name'),
      country: formData.get('country'),
      hobby: formData.get('hobby')
    };
    const res = await fetch(`/api/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      const updatedItem = await res.json();
      items = items.map(item => {
        if (item.itemId === updatedItem.itemId) {
          return updatedItem;
        } else {
          return item;
        }
      });
    }
}
  </script>
  
  <h2>Items</h2>
  
  <div class="item-grid">
    {#each items as item (item.itemId)}
      <div class="item-box">
        <ul class="item-list">
          <li><strong>Name:</strong> {item.name}</li>
          <li><strong>Country:</strong> {item.country}</li>
          <li><strong>Hobby:</strong> {item.hobby}</li>
        </ul>
        <div class="item-buttons">
          <Button color="red" on:click={() => deleteItem(item.itemId)}>Delete</Button>
          <Button color="green" on:click={() => updateItem(item.itemId)}>Update</Button>
        </div>
      </div>
    {/each}
  </div>
  <style>
    .item-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
  
    .item-box {
      padding: 1rem;
      background-color: #fff;
      border: 1px solid #ddd;
      box-shadow: 2px 2px #eee;
    }
  
    .item-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  
    .item-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    }
  </style>