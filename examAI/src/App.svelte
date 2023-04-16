<script>
  import { onMount } from "svelte";
  import Items from "./Items.svelte";
  import AddNewItem from "./AddNewItem.svelte";

  let activeMenuItem = "Items";

  function setActiveMenuItem(menuItem) {
    activeMenuItem = menuItem;
  }

  let activeComponent;

  function renderActiveComponent() {
    if (activeMenuItem === "Items") {
      activeComponent = Items;
    } else if (activeMenuItem === "Add New Item") {
      activeComponent = AddNewItem;
    }
  }

  onMount(() => {
    renderActiveComponent();
  });
</script>

<nav>
  <ul>
    <li
      class:selected={activeMenuItem === "Items"}
      on:click={() => {
        setActiveMenuItem("Items");
        renderActiveComponent();
      }}
    >
      Items
    </li>
    <li
      class:selected={activeMenuItem === "Add New Item"}
      on:click={() => {
        setActiveMenuItem("Add New Item");
        renderActiveComponent();
      }}
    >
      Add New Item
    </li>
  </ul>
</nav>

<main>
  {#if activeComponent}
    <svelte:component this={activeComponent} />
  {/if}
</main>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f2f2f2;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  }

  nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  nav li {
    margin-right: 1rem;
    padding: 0.5rem;
    border-bottom: 2px solid transparent;
    font-size: 1.2rem;
    cursor: pointer;
  }

  nav li:hover {
    color: red;
  }

  nav li.selected {
    color: red;
    border-bottom: 2px solid red;
  }
</style>
