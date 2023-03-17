<script>
    import Card from "./Card.svelte";
    import Button from "./Button.svelte";
    import { createEventDispatcher } from "svelte/internal";

    let fields = { name: "", country: "", hobby: "" };
    let errors = { name: "", country: "", hobby: "" };
    let valid = false;

    let dispatch = createEventDispatcher();

    const submitHandler = async () => {
        const { name, country, hobby } = fields;
        const itemId = Math.round(Math.random() * 100000000);
        valid = true;
        //Validate question
        if (fields.name.trim().length < 5) {
            valid = false;
            errors.name = "Please enter your name";
        } else {
            errors.name = "";
        }
        //Validate answer A
        if (fields.country.trim().length < 1) {
            valid = false;
            errors.country = "You need to enter the country";
        } else {
            errors.country = "";
        }
        //Validate answer B
        if (fields.hobby.trim().length < 1) {
            valid = false;
            errors.hobby = "You need to enter your Hobby";
        } else {
            errors.hobby = "";
        }

        //Add new poll
        if (valid) {
            await fetch("/api/addItem", {
                method: "POST",
                body: JSON.stringify({
                    itemId,
                    name,
                    country,
                    hobby,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }).catch((err) => console.log(err));

            dispatch("add");
        }
    };
</script>

<div class="wrapper">
    <Card>
        <form on:submit|preventDefault={submitHandler}>
            <div class="form-field">
                <label for="fullName">Enter your full name</label>
                <input type="text" id="name" bind:value={fields.name} />
                <div class="error">{errors.name}</div>
            </div>
            <div class="form-field">
                <label for="country">Which country do you live in?</label>
                <input type="text" id="country" bind:value={fields.country} />
                <div class="error">{errors.country}</div>
            </div>
            <div class="form-field">
                <label for="hobby">What's your favourite hobby?</label>
                <input type="text" id="hobby" bind:value={fields.hobby} />
                <div class="error">{errors.hobby}</div>
            </div>
            <Button type="addItem">Add Item</Button>
        </form>
    </Card>
</div>

<style>
    form {
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }

    .form-field {
        margin: 18px auto;
    }

    input {
        width: 100%;
        border-radius: 5px;
        height: 2em;
        font-size: 18px;
    }

    label {
        margin: 10px auto;
        text-align: left;
        display: block;
    }

    .error {
        font-weight: bold;
        font-size: 12px;
        color: #d91b42;
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
