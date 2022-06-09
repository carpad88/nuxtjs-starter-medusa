<template>
  <div class="bg-ui ">
    <div class="container mx-auto p-8 relative">
      <div class="layout-base">
        <div class="flex flex-col-reverse lg:flex-row">
          <div class="lg:w-1/2">
            <checkout-flow />
          </div>
          <div class="lg:w-1/2 lg:pl-16">
            <checkout-summary />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout'
}
</script>
