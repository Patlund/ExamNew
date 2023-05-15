<script>
  import { activeMenu } from "./store";
  import List from "./List.svelte";
  import Create from "./Create.svelte";
</script>

<div class="menu">
  <span
    class="menu-item"
    class:active={$activeMenu === "Items"}
    on:click={() => $activeMenu.set("Items")}
  >
    Items
  </span>
  <span
    class="menu-item"
    class:active={$activeMenu === "Add New Items"}
    on:click={() => $activeMenu.set("Add New Items")}
  >
    Add New Items
  </span>
</div>

{#if $activeMenu === "Items"}
  <List />
{:else if $activeMenu === "Add New Items"}
  <Create />
{/if}

<style>
  .menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    background-color: #f0f0f0;
  }

  .menu-item {
    cursor: pointer;
  }

  .menu-item.active {
    color: red;
    border-bottom: 2px solid red;
  }
</style>
