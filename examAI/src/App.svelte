<script>
    import AddNewItem from './AddNewItem.svelte';
    import Items from './Items.svelte';

    let selectedItem = "items";
    
    function handleItemClick(item) {
      selectedItem = item;
    }
  </script>
  <main>
  <div class="menu">
    <button 
      class:selected={selectedItem === "items"}
      on:click={() => handleItemClick("items")}
    >
      Items
    </button>
    <button 
      class:selected={selectedItem === "addNew"}
      on:click={() => handleItemClick("addNew")}
    >
      Add New Items
    </button>
  </div>
  
  {#if selectedItem === "items"}
    <Items />
  {:else if selectedItem === "addNew"}
    <AddNewItem />
  {/if}

</main>