<script>
  export let color = "blue";
</script>

<button class="button" style="background-color: {color}" on:click>
  <slot />
</button>

<style>
  .button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }

  .button:hover {
    opacity: 0.8;
  }
</style>
