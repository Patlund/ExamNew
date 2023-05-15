<script>
    export let color = "blue";
</script>

<button
    class="button"
    style="background-color: {color}"
    on:click={() => dispatch("click")}
>
    <slot />
</button>

<style>
    .button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: 0.3s;
    }

    .button:hover {
        opacity: 0.8;
    }
</style>
