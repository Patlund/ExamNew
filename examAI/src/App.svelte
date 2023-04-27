<script>
    import { onMount } from 'svelte';
    import AddNewItem from './AddNewItem.svelte';
    import Items from './Items.svelte';
  
    let activeMenuItem = 'items';
  
    onMount(() => {
      // Set the active menu item based on the current path
      const path = window.location.pathname;
      if (path.includes('add-new-items')) {
        activeMenuItem = 'add-new-items';
      } else {
        activeMenuItem = 'items';
      }
    });
  
    function setActiveMenuItem(menuItem) {
      activeMenuItem = menuItem;
      // Update the URL to reflect the active menu item
      const path = menuItem === 'items' ? '/' : '/add-new-items';
      window.history.pushState({}, '', path);
    }
  </script>
  
  <style>
    .menu-item {
      display: inline-block;
      padding: 8px;
      cursor: pointer;
      border-bottom: 2px solid transparent;
    }
  
    .menu-item.active {
      color: red;
      border-bottom-color: red;
    }
  </style>
  
  <div class="menu">
    <div class="menu-item {activeMenuItem === 'items' ? 'active' : ''}" on:click={() => setActiveMenuItem('items')}>Items</div>
    <div class="menu-item {activeMenuItem === 'add-new-items' ? 'active' : ''}" on:click={() => setActiveMenuItem('add-new-items')}>Add New Items</div>
  </div>
  
  <div class="content">
    {#if activeMenuItem === 'items'}
      <Items />
    {:else if activeMenuItem === 'add-new-items'}
      <AddNewItem/>
    {/if}
  </div>