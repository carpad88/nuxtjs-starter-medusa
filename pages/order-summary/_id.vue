<template>
  <div class="container mx-auto p-8">
    <div v-if="order" class="layout-base flex justify-center pb-16">
      <div class="max-w-xl">
        <span class="text-xs font-medium mb-2">THANK YOU</span>
        <h1 class="text-2xl font-bold">
          Order Confirmed
        </h1>
        <p class="text-md font-light mt-3">
          Your order <span class="font-semibold">#{{ order.display_id }}</span> was successfully processed. You will
          receive an email with the tracking number of your parcel once it’s
          available.
        </p>
        <div class="my-8">
          <!-- Start items section -->
          <order-item
            v-for="item in order.items"
            :key="item.id"
            :item="item"
            :currency="order.currency_code"
          />
        </div>

        <div>
          <totals :item="order" />
        </div>
      </div>
    </div>
    <div v-else>
      "We couldn't find your order, it might have gone through but we can't seem to find it at the moment. Please check your email for an order confirmation."
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderSummary',
  data () {
    return {
      order: null
    }
  },
  async beforeMount () {
    const { data: { order } } = await this.$axios(`/orders/${this.$route.params.id}`)
    this.order = order
  }
}
</script>
