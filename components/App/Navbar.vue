<template>
  <div class="sticky top-0 z-20">
    <header class="relative bg-white">
      <nav class="px-4 sm:px-6 lg:px-8 border-b border-ui-medium flex items-center justify-between">
        <div class="flex items-center">
          <app-logo />
          <div class="hidden lg:flex lg:items-center">
            <div class="hidden flex-grow items-center justify-center lg:flex text-sm font-medium">
              <nuxt-link
                to="/"
                class="block mt-4 mr-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-600 last:mr-0"
              >
                Home
              </nuxt-link>
              <nuxt-link
                to="/products"
                class="block mt-4 mr-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-600 last:mr-0"
              >
                Products
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end">
          <div class="hidden lg:flex">
            <dropdowns-regions />

            <div class="relative inline-block text-left">
              <div>
                <button
                  class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-600"
                  type="button"
                >
                  Account
                </button>
              </div>
            </div>
          </div>

          <dropdowns-cart-popover />
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'AppNavbar'
}
</script>
