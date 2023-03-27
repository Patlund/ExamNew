<script>
    export let type = "addItem";
</script>

<button class={type} on:click>
    <slot />
</button>

<style>
    button {
        border: 0;
        cursor: pointer;
        border-radius: 6px;
        padding: 8px 12px;
        font-weight: bold;
        box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    }

    .addItem {
        background: #177c30;
        color: white;
    }

    .deleteItem {
        background: #d91b42;
        color: #fff;
    }
</style>
