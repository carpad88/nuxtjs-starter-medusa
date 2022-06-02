<template>
  <div class="relative text-left">
    <div v-if="$store.state.region">
      <button
        class="inline-flex justify-center w-full px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:text-gray-600 flex items-center"
        @click="showRegionsMenu = !showRegionsMenu"
      >
        <span class="mr-1">{{ $store.state.country.display_name }} / {{ $store.state.region.currency_code.toUpperCase() }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        ><path fill="currentColor" d="m12 13.172l4.95-4.95l1.414 1.414L12 16L5.636 9.636L7.05 8.222z" /></svg>
      </button>
    </div>

    <div
      v-if="$store.state.regions.length > 0 && showRegionsMenu"
      class="origin-top-right absolute right-0 mt-2 w-56 px-6 py-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <ul class="border-b border-ui last:border-b-0">
        <li v-for="(region) in $store.state.regions" :key="region.id" class="not-last:border-b border-gray-300">
          <button
            v-for="country in region.countries"
            :key="country.id"
            class="block py-3 text-sm w-full text-left text-gray-500 hover:text-black not-last:border-b border-gray-300"
            @click="$store.dispatch('updateRegion', {region: region, country: country})"
          >
            {{ country.display_name }} / {{ region.currency_code.toUpperCase() }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegionsPopOver',
  data () {
    return {
      showRegionsMenu: false
    }
  }
}
</script>
