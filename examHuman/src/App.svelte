<script>
    import ItemList from "./components/ItemList.svelte";
    import NewItemForm from "./components/NewItemForm.svelte";
    import Tabs from "./components/Tabs.svelte";

    let items = ["Items", "Add New Item"];
    let activeItem = "Items";
    const tabChange = (e) => {
        activeItem = e.detail;
    };

    const handleAdd = (e) => {
        activeItem = "Items";
    };
</script>

<main>
    <Tabs {items} {activeItem} on:tabChange={tabChange} />
    {#if activeItem === "Items"}
        <ItemList />
    {:else if activeItem === "Add New Item"}
        <NewItemForm on:add={handleAdd} />
    {/if}
</main>

<style>
    main {
        max-width: 960px;
        margin: 40px auto;
    }
</style>
