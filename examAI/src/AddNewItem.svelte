<script>
    import { useState } from 'svelte';
    import Button from './Button.svelte';
    
  
    let name = '';
    let country = '';
    let hobby = '';
  
    function handleSubmit() {
      // Send the data to the backend using fetch
      const data = { name, country, hobby };
      fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          // Change to the "Items" component and update the active menu item
          activeMenuItem = 'items';
          setActiveMenuItem(activeMenuItem);
        })
        .catch(error => {
          console.error(error);
          // Show an error message to the user
        });
    }
  </script>
  <div class="container">
    <label class="label" for="name-input">Enter your full name:</label>
    <input type="text" id="name-input" bind:value={name}>
  
    <label class="label" for="country-input">Which country do you live in?</label>
    <input type="text" id="country-input" bind:value={country}>
  
    <label class="label" for="hobby-input">What's your favourite hobby?</label>
    <input type="text" id="hobby-input" bind:value={hobby}>
  
    <Button label="Create Item" on:click={handleSubmit} />
    </div>
    <style>
        .container {
          display: flex;
          flex-direction: column;
          box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
          padding: 16px;
        }
      
        .label {
          font-weight: bold;
          margin-bottom: 4px;
        }
      
        input {
          margin-bottom: 8px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      </style>