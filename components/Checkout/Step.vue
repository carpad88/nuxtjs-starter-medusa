<template>
  <div class="text-left mb-4 last:mb-0 w-full">
    <div class="bg-white rounded-lg p-8 shadow">
      <div class="w-full">
        <div class="flex items-center justify-between w-full">
          <h3 class="font-bold">
            {{ title }}
          </h3>
          <checkout-check-icon v-if="showSuccessIcon" class="bg-green-400" />
        </div>
      </div>

      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutStep',
  props: {
    showSuccessIcon: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Title'
    }
  }
}
</script>
