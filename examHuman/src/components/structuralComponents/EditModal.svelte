<script>
    import Button from "./Button.svelte";


    export let getItems;
    export let showModal = false;
    export let modalItem;

    
    let errors = { name: "", country: "", hobby: "" };
    let { itemId ,name, country, hobby } = modalItem;

    $: showModal;

    function toggleModal() {
        showModal = !showModal;
        console.log("From the modal: " + showModal);
    }

    


    async function submitHandler(){

        let valid = true;


        if (name.trim().length < 5 || name.includes('<') || name.includes('>')) {
            valid = false;
            errors.name = "Please enter your name and don't use special characters";
        } else {
            errors.name = "";
        }
        //Validate answer A
        if (country.trim().length < 1 || country.includes('<') || country.includes('>')) {
            valid = false;
            errors.country = "You need to enter the country and don't use special characters"
        } else {
            errors.country = "";
        }
        //Validate answer B
        if (hobby.trim().length < 1 || hobby.includes('<') || hobby.includes('>')) {
            valid = false;
            errors.hobby = "You need to enter your Hobby and don't use special characters";
        } else {
            errors.hobby = "";
        }

        if(valid){
        await fetch("/api/updateItem", {
                method: "PUT",
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
        
        getItems();
        toggleModal();
        }
        

        
    }
</script>

{#if showModal}
    <div class="modal">
        <div class="modal-content">
        <form on:submit|preventDefault={submitHandler}>
            <div class="form-field">
                <label for="fullName">Enter your full name</label>
                <input type="text" id="name" bind:value={name} />
                <div class="error">{errors.name}</div>
            </div>
            <div class="form-field">
                <label for="country">Which country do you live in?</label>
                <input
                    type="text"
                    id="country"
                    bind:value={country}
                />
                <div class="error">{errors.country}</div>
            </div>
            <div class="form-field">
                <label for="hobby">What's your favourite hobby?</label>
                <input type="text" id="hobby" bind:value={hobby} />
                <div class="error">{errors.hobby}</div>
            </div>
            <Button type="addItem">Confirm</Button>
        </form>
        </div>
    </div>
{/if}

<style>
    .modal {
        position:absolute;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background-color: white;
        padding: 50px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        z-index: 10;
        padding-right: 60px;
        
    }

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
        font-weight: bold;
    }

    .error {
        font-weight: bold;
        font-size: 12px;
        color: #d91b42;
    }
</style>
