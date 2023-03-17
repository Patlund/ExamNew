<script>
    import Card from "./Card.svelte";
    import Button from "./Button.svelte";
    import { createEventDispatcher } from "svelte";

    export let item;

    const dispatch = createEventDispatcher();
</script>

<Card>
    <div class="item">
        <h3>{item.name}</h3>
        <ul>
            <li>{item.country}</li>
            <li>{item.hobby}</li>
        </ul>
        <div class="delete">
            <Button type="deleteItem">Delete</Button>
        </div>
    </div>
</Card>

<style>
    ul {
        list-style: none;
        padding: 0;
        font-size: 18px;
    }
</style>
