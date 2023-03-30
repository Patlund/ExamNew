<script>
    import Card from "./structuralComponents/Card.svelte";
    import Button from "./structuralComponents/Button.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let item;
</script>

<Card>
    <div class="item">
        
        <ul>
            <h3>{item.name}</h3>
            <li><span>Country:</span> {item.country}</li>
            <li><span>Hobby:</span> {item.hobby}</li>
        </ul>
        <div class="buttonsContainer">
            <div class="modify">
            <Button
            type="addItem"
            on:click={() => dispatch("modifyItem", item)}
            >
            Modify
            </Button>
            </div>
            <div class="delete">
                <Button
                type="deleteItem"
                on:click={() => dispatch("deleteItem", item)}
                >
                Delete
            </Button>
            </div>
        </div>
    </div>
</Card>

<style>
    ul {
        list-style: none;
        padding: 0;
        font-size: 18px;
    }

    li{
        padding-top: 5px;
        padding-bottom: 5px;
    }

    span{
        font-weight: bold;
    }

    .buttonsContainer{
        display: flex;
    }

    .delete{
        margin-left: 20px;
    }

    .item{
        width: 200px;
        height: 200px;
    }
</style>
