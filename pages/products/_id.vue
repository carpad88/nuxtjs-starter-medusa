<template>
  <div class="container mx-auto p-8">
    <div class="flex flex-col lg:flex-row">
      <div class="lg:w-3/5 lg:pr-14">
        <div class="flex">
          <div class="hidden lg:flex flex-col items-center mr-4">
            <div class="w-auto h-full object-center object-cover p-12">
              <img
                alt=""
                src="https://picsum.photos/150/150"
              >
            </div>
          </div>
          <div class="relative h-auto w-full flex rounded-lg overflow-hidden">
            <span class="text-sm absolute right-4 top-3 z-10">1 / 1</span>

            <div class="w-auto h-full object-center object-cover p-12">
              <img
                alt=""
                src="https://picsum.photos/600/600"
              >
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 lg:mt-0 lg:w-2/5 lg:max-w-xl">
        <h1 class="font-semibold text-3xl">
          Medusa Coffee Mug
        </h1>
        <p class="text-lg mt-2 mb-4">
          10 EUR
        </p>
        <p class="font-light">
          Every programmer's best friend.
        </p>
        <div class="mt-6">
          <div class="text-sm">
            <p class="font-medium mb-2">
              Select Size
            </p>
            <div>
              <button class="bg-ui-dark text-white inline-flex items-center justify-center rounded-sm text-xs h-12 w-12 mr-2 last:mr-0 hover:bg-ui-dark hover:text-white">
                One Size
              </button>
            </div>
          </div>
        </div>
        <div class="inline-flex mt-4">
          <button class="btn-ui mr-2 px-12">
            Add to bag
          </button>
          <div class="flex items-center rounded-md px-4 py-2 shadow">
            <button>–</button>
            <span class="w-8 text-center">1</span>
            <button>+</button>
          </div>
        </div>
        <div class="mt-12">
          <div class="border-t last:border-b border-ui-medium py-6">
            <h3 class="-my-3 flow-root">
              <button
                class="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                type="button"
                @click="showDetails = !showDetails"
              >
                <span class="font-medium text-gray-900">Details</span>
                <span class="ml-6 flex items-center">
                  <span>—</span>
                </span>
              </button>
            </h3>
            <div v-if="showDetails" class="pt-6">
              <div class="space-y-4 text-ui-dark text-sm">
                <ul class="list-inside list-disc">
                  <li>Weight: 0.4 kg</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data () {
    return {
      showDetails: false
    }
  }
}
</script>
