<script>
    // You can add any necessary logic or state here, for example:
    let isDropdownOpen = false;
  
    function toggleDropdown() {
      isDropdownOpen = !isDropdownOpen;
    }
  </script>
  
  <nav class="bg-[#1e272e] py-2 px-6 font-sans fixed w-full top-0 z-10">
    <div class="container mx-auto flex items-center justify-between">
      <a href="/" class="text-white text-2xl font-bold">HotStuff</a>
      <ul class="flex space-x-6">
        <li><a href="/" class="text-gray-300 hover:text-white">Home</a></li>
        <li class="relative group">
          <button on:click={toggleDropdown} class="text-gray-300 hover:text-white flex items-center">
            Latest 
          </button>
          <ul class="{isDropdownOpen ? 'block' : 'hidden'} group-hover:block absolute bg-[#535c68] text-white py-2 rounded-md shadow-md">
            <li><a href="/latest/option1" class="block px-4 py-2 hover:bg-[#95a5a6]">Journals</a></li>
            <li><a href="/latest/option2" class="block px-4 py-2 hover:bg-[#95a5a6]">Series</a></li>
          </ul>
        </li>
        <li><a href="/about" class="text-gray-300 hover:text-white">About</a></li>
        <li><a href="/contact" class="text-gray-300 hover:text-white">Contact</a></li>
      </ul>
    </div>
  </nav>