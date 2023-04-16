<script>
    export let color = "green";
    export let disabled = false;
</script>

<button class={`button ${color} ${disabled ? "disabled" : ""}`}>
    <slot />
</button>

<style>
    .button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .green {
        background-color: green;
        color: white;
    }

    .red {
        background-color: red;
        color: white;
    }

    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
