<script lang='ts'>
  import { enhance } from '$app/forms';
  import { afterUpdate } from "svelte";
  import type { PageData, ActionData, SubmitFunction } from './$types';
  import { Button } from "$lib/components/ui/button/index.js";

  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";

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

//Carousel
  let items = [
    {
      image: 'src/lib/image1.png',
      testimony: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam eaque officiis voluptates ipsam maiores nesciunt. Molestiae illum repellat ratione animi, excepturi nesciunt et dicta quibusdam possimus perspiciatis accusantium adipisci sunt facilis commodi quos, fugiat vero quaerat odit aliquam. Recusandae explicabo in veniam earum ut odit dolor possimus laboriosam omnis tempora.',
      name:'Tim Philip',
      speaker: 'C.E.O'
    },
    {
      image: 'src/lib/image2.png',
      testimony: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam eaque officiis voluptates ipsam maiores nesciunt. Molestiae illum repellat ratione animi, excepturi nesciunt et dicta quibusdam possimus perspiciatis accusantium adipisci sunt facilis commodi quos, fugiat vero quaerat odit aliquam. Recusandae explicabo in veniam earum ut odit dolor possimus laboriosam omnis tempora.',
      name:'Jonathan Queue',
      speaker: 'Creative'
    },
    {
      image: 'src/lib/image3.png',
      testimony: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam eaque officiis voluptates ipsam maiores nesciunt. Molestiae illum repellat ratione animi, excepturi nesciunt et dicta quibusdam possimus perspiciatis accusantium adipisci sunt facilis commodi quos, fugiat vero quaerat odit aliquam. Recusandae explicabo in veniam earum ut odit dolor possimus laboriosam omnis tempora.',
      name:'Anal Woods',
      speaker: 'Editor'
    },
    {
      image: 'src/lib/image4.png',
      testimony: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam eaque officiis voluptates ipsam maiores nesciunt. Molestiae illum repellat ratione animi, excepturi nesciunt et dicta quibusdam possimus perspiciatis accusantium adipisci sunt facilis commodi quos, fugiat vero quaerat odit aliquam. Recusandae explicabo in veniam earum ut odit dolor possimus laboriosam omnis tempora.',
      name:'Rope Fineman',
      speaker: 'Star User'
    }
  ];
  let currentIndex = 0;

  function next() {
    currentIndex = (currentIndex + 1) % items.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
  }

  // Dropdown menu
</script>

<!-- nav bar -->
<nav class="bg-gradient-to-r from-emerald-500 to-emerald-900 py-2 px-6 fixed w-full top-0 z-10">
  <div class="container mx-auto flex items-center justify-between">
    <a href="/" class="text-white text-2xl font-bold">HotStuff</a>
    <ul class="flex space-x-6">
      <li><a href="/" class="text-gray-300 hover:text-white">Home</a></li>

      <li class="relative group"> 
        <button class="text-gray-300 hover:text-white flex items-center">
          Latest 
        </button>
        <ul class="hidden group-hover:block absolute bg-emerald-700 text-white py-2 rounded-md shadow-md">
          <li><a href="/latest/option1" class="block px-4 py-2 hover:bg-emerald-800">Journals</a></li>
          <li><a href="/latest/option2" class="block px-4 py-2 hover:bg-emerald-800">Series</a></li>
        </ul>
      </li>

      <li><a href="/about" class="text-gray-300 hover:text-white">About</a></li>
      <li><a href="/contact" class="text-gray-300 hover:text-white">Contact</a></li>
    </ul>
  </div>
</nav>

<!-- end of nav bar -->

<!-- Banner Screen -->
<div class="w-100 h-[80vh] bg-gradient-to-r from-emerald-500 to-emerald-900">
  <h1  class=" relative text-[4.5rem] text-white font-bold text-center top-[3.2rem]">HotStuff</h1>
  <h1 class="text-[3rem] text-white font-bold text-center mt-7 ">Story Maker</h1>
  <img class="mx-auto w-[50rem] relative bottom-[3rem] " src="src/lib/storytelling-4203628_1920-removebg-preview.png" alt="Description of the image">
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
  </div>
</div>
<!-- end of story generator -->

<!-- Carousel -->
<div class="flex flex-row items-center justify-center gap-[6rem]">
  <button class="relative left-[4rem]" on:click={prev}><img class="w-[6rem]" src="src/lib/left.png"></button>
  <div class="flex gap-[3rem] ">
    {#each items.slice(currentIndex, currentIndex + 2) as item}
      <div class=" flex flex-row gap-5 w-[80%] h-[30%] bg-emerald-100 rounded-2xl ">
        <img class="w-[10rem] p-[1.3rem]" src={item.image} alt="carousel image" />
        <div class="flex flex-col text-[0.7rem] p-[1.2rem] ">
          <p class="text-left">{item.testimony}</p>
          <p class="text-left text-blue-800 text-[1rem]  relative top-[0.4rem]">{item.name}</p>
          <p class="text-left text-pink-700">{item.speaker}</p>
        </div>
      </div>
    {/each}
  </div>
  <button class="relative right-[4rem]" on:click={next}><img class="w-[6rem]" src="src/lib/right.png"></button>
</div>
<!-- ENd of Carousel -->

<!-- Load indicator function -->
<div class="flex items-center justify-center">
  {#if isLoading}
    <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full opacity-75 mr-2">🌀</div>
    <h2 class="font-bold">Your Story is Loading</h2>
  {/if}
</div>
<!-- End of load indicator function -->

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
