<script lang='ts'>
  import { enhance } from '$app/forms';
  import { afterUpdate } from "svelte";
  import type { PageData, ActionData, SubmitFunction } from './$types';
  
  import Banner from "$lib/storytelling-4203628_1920-removebg-preview.png"
 import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js"
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


<!-- Banner Screen -->
<div class="w-100 h-[80vh] font-mono bg-[#1e272e] cm:w-100  relative">
 
  <div class="relative  top-[5.2rem] cm:top-[7.5rem]">
     <h1  class=" text-[2rem] text-white font-bold text-center ">HotStuff</h1>
  <h1 class="text-[2rem] text-white font-bold text-center relative top-[-3rem] mt-7 ">Story Maker</h1>
</div>
<div class="relative flex flex-col text-center mt-[5rem] text-white lg:text-[4.5rem] top-[3rem] md:px-[1rem] md:text-[4.5rem] md:leading-[4rem] cm:text-[2rem] cm:leading-[2rem] font-semibold leading-[4rem] cm:p-[1rem] cm:mt-[3rem]">
  <h2>The #1 Story Maker</h2>
  <h2>For readers In The Entire Space</h2>
</div>
<h2  class="text-[1.5] text-white font-bold text-center relative cm:top-[4rem] top-[9rem] cm:text-[0.8rem]  md:text-[1.5rem] ">Your Go-To Source For Creative stories</h2>
</div>

<!-- end of banner screen -->

<!-- story genartor -->
<div class="container mx-auto p-4">


  <div class="flex flex-col gap-4">
    <form use:enhance={handleSubmit} action="?/tell_story" method="POST">
      <label for="story-prompt" class="block text-gray-700 font-bold mb-2 cm:text-[0.8rem]">Enter your story prompt:</label>
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


<!-- Carousel  -->
<div class=" flex items-center justify-center my-4">
  <Carousel.Root class=" lg:w-[80rem] cm:mx-40 md:w-[67rem] cm:w-[13rem] ">
    <Carousel.Content>
      {#each items as item, i (i)}
        <Carousel.Item class="cm:basis-1/1 md:basis-1/2 lg:basis-1/2">
            <Card.Root>
              <Card.Content
                class="flex lg:flex-row md:flex-col items-center justify-center cm:flex-col cm:p-[0.2rem] p-6"
              >
              <img class="w-[10rem] cm:w-[5rem] p-[1.3rem]" src={item.image} alt="carousel" />
              <div class="flex flex-col text-[0.7rem] px-[1.2rem] ">
                <p class="text-left cm:text-[0.5rem] ">{item.testimony}</p>
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

  <form class="flex w-full max-w-sm items-center my-[1rem] cm:p-[1.5rem] space-x-2 m-auto">
    <Input class="text-black" type="email" placeholder="email" />
    <Button type="submit">Subscribe</Button>
  </form>
  <div class="container mx-auto text-[0.9rem] cm:text-[0.8rem] grid mt-10 grid-cols-1 md:grid-cols-4 gap-8">
    <div class="mb-4 md:mb-0">
      <a href="/" class="text-xl font-bold">HotStuff</a>
      <p class="text-sm mt-2">Your go-to source for creative stories.</p>

      <div class="flex space-x-4 mt-4"> 
        <a href="#" class="text-gray-400 hover:text-white">
          <i class="fab fa-facebook-f"></i> 
        </a>
        <a href="#" class="text-gray-400 hover:text-white">
          <i class="fab fa-twitter"></i> 
        </a>
        <a href="#" class="text-gray-400 hover:text-white">
          <i class="fab fa-instagram"></i> 
        </a>
      </div>
    </div>
    <div>
      <h3 class="text-lg font-semibold mb-2">Quick Links</h3>
      <ul class="space-y-2">
        <li><a href="/" class="hover:text-gray-300">Home</a></li>
        <li><a href="/latest" class="hover:text-gray-300">Latest</a></li>
        <li><a href="/about" class="hover:text-gray-300">About</a></li>
        <li><a href="/contact" class="hover:text-gray-300">Contact</a></li>
      </ul>
    </div>
    <div>
      <h3 class="text-lg font-semibold mb-2">Explore</h3>
      <ul class="space-y-2">
        <li><a href="/genres" class="hover:text-gray-300">Genres</a></li>
        <li><a href="/authors" class="hover:text-gray-300">Authors</a></li>
        <li><a href="/collections" class="hover:text-gray-300">Collections</a></li>
      </ul>
    </div>
    <div>
      <h3 class="text-lg font-semibold mb-2">Legal</h3>
      <ul class="space-y-2">
        <li><a href="/terms" class="hover:text-gray-300">Terms of Service</a></li>
        <li><a href="/privacy" class="hover:text-gray-300">Privacy Policy</a></li>
      </ul>
    </div>
  </div>

  <p class="text-center text-sm mt-[1rem]">© Copyright 2019-{new Date().getFullYear()} HotStuff</p>
</footer>

<!-- End of footer -->


<style></style>
