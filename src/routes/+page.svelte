<script lang='ts'>
  import { enhance } from '$app/forms';
  import { afterUpdate } from "svelte";
  import type { PageData, ActionData, SubmitFunction } from './$types';
  import { Button } from "$lib/components/ui/button/index.js";
  import Banner from "$lib/storytelling-4203628_1920-removebg-preview.png"

  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";

  

  import {items} from './data'

  let isLoading = false;
  
  export let data: PageData;
  
  export let form: ActionData;

  let prompt = '';
  let story = '';

  let showAlert = false;
  let alertMessage = '';

  const showErrorAlert = (message: string) => {
    showAlert = true;
    alertMessage = message;
  };

  const hideAlert = () => {
    showAlert = false;
  };

  afterUpdate(() => {
    if (form?.error) {
      showErrorAlert(form.error);
    }
  });

  const handleSubmit: SubmitFunction = () => {   
    isLoading = true; // Show the load spinner
    // ... (your existing form submission logic)
    return async ({update, result}) => {
      await update()
      isLoading = false;
    }
    // Hide the load spinner
  };

  const downloadStory = async () => {
    if (form?.result) {
      try {
        const storyText = typeof form?.result === 'string' ? form?.result : await form?.result;
        const file = new Blob([storyText], { type: 'text/plain' });
        const element = document.createElement('a');
        element.href = URL.createObjectURL(file);
        element.download = 'my_story.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element); // Clean up
      } catch (error) {
        console.error("Error downloading story:", error);
        // Handle the error, e.g., show an error message to the user
      }
    } else {
      console.error("No story to download");
      // Handle the case where there's no story
    }
  };
  // Dropdown menu
</script>

<!-- nav bar -->
<nav class="bg-[#1e272e] py-2 px-6 fixed w-full top-0 z-10">
  <div class="container mx-auto flex items-center justify-between">
    <a href="/" class="text-white text-2xl font-bold">HotStuff</a>
    <ul class="flex space-x-6">
      <li><a href="/" class="text-gray-300 hover:text-white">Home</a></li>

      <li class="relative group"> 
        <button class="text-gray-300 hover:text-white flex items-center">
          Latest 
        </button>
        <ul class="hidden group-hover:block absolute bg-[#535c68] text-white py-2 rounded-md shadow-md">
          <li><a href="/latest/option1" class="block px-4 py-2 hover:bg-[#95a5a6]">Journals</a></li>
          <li><a href="/latest/option2" class="block px-4 py-2 hover:bg-[#95a5a6]">Series</a></li>
        </ul>
      </li>

      <li><a href="/about" class="text-gray-300 hover:text-white">About</a></li>
      <li><a href="/contact" class="text-gray-300 hover:text-white">Contact</a></li>
    </ul>
  </div>
</nav>

<!-- end of nav bar -->

<!-- Banner Screen -->
<div class="w-100 h-[80vh] bg-[#1e272e]">
  <h1  class=" relative text-[2rem] text-white font-bold text-center top-[5.2rem]">HotStuff</h1>
  <h1 class="text-[2rem] text-white font-bold text-center relative top-[2rem] mt-7 ">Story Maker</h1>
  <!-- <img class="mx-auto w-[50rem] relative bottom-[3rem] " src={Banner} alt="Description of Banner"/> -->

  <h2 class="text-[4.5rem] text-white font-bold text-center relative top-[1.9rem] mt-7 " > The #1 Story Maker</h2>
  <h2 class="text-[4.5rem] text-white font-bold text-center relative bottom-[1rem] "> For Readers in the entire space</h2>
  <h2  class="text-[1.5] text-white font-bold text-center relative top-[1rem] ">Your center for innoavtive stories</h2>
</div>

<!-- end of banner screen -->

<!-- story genartor -->
<div class="container mx-auto p-4">


  <div class="flex flex-col gap-4">
    <form use:enhance={handleSubmit} action="?/tell_story" method="POST">
      <label for="story-prompt" class="block text-gray-700 font-bold mb-2">Enter your story prompt:</label>
      <textarea
        bind:value={prompt}
        id="story-prompt"
        name="story"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none" 
        placeholder="Write your story prompt here..."
      ></textarea>

      <Button
        variant='destructive'
        type='submit'
        class="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Generate Story
      </Button>

    </form>
    <div id="story-output" class="mt-4 border rounded p-4 bg-white shadow-md">
      {form?.result}
    </div>
    {#if form?.result} 
    <button on:click={downloadStory} class="bg-[#95a5a6] hover:bg-[#95a5a6] text-white font-bold py-2 px-4 rounded">
      Download Story
    </button>
  {/if}

  </div>
</div>
<!-- end of story generator -->
<!-- Load indicator function -->
<div class="flex relative items-center justify-center">
  {#if isLoading}
    <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full opacity-75 mr-2">🌀</div>
    <h2 class="font-bold">Your Story is Loading</h2>
  {/if}
</div>
<!-- End of load indicator function -->

<div class=" flex items-center justify-center my-4">
  <Carousel.Root class="px-20 w-[80rem]  ">
    <Carousel.Content>
      {#each items as item, i (i)}
        <Carousel.Item class="md:basis-1/2 lg:basis-1/2">
         
            <Card.Root>
              <Card.Content
                class="flex  items-center justify-center p-6"
              >
              <img class="w-[10rem] p-[1.3rem]" src={item.image} alt="carousel" />
              <div class="flex flex-col text-[0.7rem] p-[1.2rem] ">
                <p class="text-left">{item.testimony}</p>
                <p class="text-left text-blue-800 text-[1rem]  relative top-[0.4rem]">{item.name}</p>
                <p class="text-left text-pink-700">{item.speaker}</p>
              </div>
              </Card.Content>
            </Card.Root>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
  
</div>



<!-- Errror handling for request -->
{#if showAlert}
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-4">
      <p class="text-red-500">{alertMessage}</p>
      <button on:click={hideAlert} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Close
      </button>
    </div>
  </div>
{/if}
<!-- end of request error handling -->


<footer class="bg-gray-800 text-white py-4 mt-16">
  <div class="container mx-auto flex flex-col items-center justify-between md:flex-row">
    <div class="mb-4 md:mb-0">
      <a href="/" class="text-xl font-bold">HotStuff</a>
      <p class="text-sm mt-2">Your go-to source for creative stories.</p>
    </div>
    <div class="flex space-x-4">
      <a href="/" class="hover:text-gray-300">Home</a>
      <a href="/about" class="hover:text-gray-300">About</a>
      <a href="/contact" class="hover:text-gray-300">Contact</a>
    </div>
  </div>
</footer>
<!-- End of footer -->

<!-- <Typewriter>
  <div class="flex text-center font-bold flex-col justify-center">
    <h1  class="text-[3rem] ">WHILE YOUR HERE</h1>
    <h1  class="text-[2rem] ">WE HOPE YOU ENJOY OUR STORIES</h1>
  </div>
 </Typewriter> -->

<style>
  .bg-gray-100 {
    background-color: #f5f5f5;
  }

  /* Responsive Styling */
  @media (max-width: 768px) {
    .container {
      padding: 2rem; /* Adjust padding as needed */
    }

    .flex-col {
      flex-direction: column; /* Stack elements vertically */
    }

    textarea {
      height: 10rem; /* Adjust height as needed */
    }
  }
</style>
