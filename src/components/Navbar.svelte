<script>
    // You can add any necessary logic or state here, for example:
    let isDropdownOpen = false;
    let isMenuOpen = false;
  
    function toggleDropdown() {
      isDropdownOpen = !isDropdownOpen;
    }
 
    

function toggleMenu() {
  isMenuOpen = !isMenuOpen;
}
  </script>
  
  <nav class="bg-[#1e272e] py-2 px-4 font-sans fixed w-full top-0 z-10">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between">
      <a href="/" class="text-white text-2xl font-bold">HotStuff</a>
  
      <button 
      class="md:hidden text-white focus:outline-none" 
      on:click={toggleMenu}
      aria-label="{isMenuOpen ? 'Close Menu' : 'Open Menu'}" 
    > 
      <i class="{isMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} fa-lg"></i>
    </button>
    
  
      <ul class="{isMenuOpen ? 'block' : 'hidden'} md:flex md:space-x-6 space-y-4 md:space-y-0 mt-4 md:mt-0 bg-[#1e272e] md:bg-transparent w-full md:w-auto"> 
        <li><a href="/" class="text-gray-300 hover:text-white block px-4 py-2">Home</a></li>
        <li class="relative group">
          <button on:click={toggleDropdown} class="text-gray-300 hover:text-white flex items-center px-4 py-2">
            Latest
            <i class="fa-solid fa-chevron-down ml-2"></i> 
          </button>
          <ul class="{isDropdownOpen ? 'block' : 'hidden'} group-hover:block absolute bg-[#535c68] text-white py-2 rounded-md shadow-md left-0 md:left-auto mt-2"> 
            <li><a href="/latest/option1" class="block px-4 py-2 hover:bg-[#95a5a6]">Journals</a></li>
            <li><a href="/latest/option2" class="block px-4 py-2 hover:bg-[#95a5a6]">Series</a></li>
          </ul>
        </li>
        <li><a href="/about" class="text-gray-300 hover:text-white block px-4 py-2">About</a></li>
        <li><a href="/contact" class="text-gray-300 hover:text-white block px-4 py-2">Contact</a></li>
      </ul>
    </div>
  </nav>