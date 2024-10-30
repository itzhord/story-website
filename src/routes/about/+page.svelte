<script lang="ts">
	import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    
    	/** @type {import('./$types').ActionData} */
	export let form;
    
    export let data: PageData;
    console.log(data)
</script>


<h1>Simple GET Request Form</h1>
    <form method="POST" use:enhance>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="age">Age:</label>
        <input type="number" id="age" name="age" required>

        <button type="submit">Submit</button>
    </form>

    <h3>{form.info}</h3>
