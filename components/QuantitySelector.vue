<template>
  <div class="flex items-center rounded-md px-4 py-2 shadow">
    <button @click="$emit('decrement', quantity - 1)">
      –
    </button>
    <span class="w-8 text-center">{{ quantity }}</span>
    <button @click="$emit('increment', quantity + 1)">
      +
    </button>
  </div>
</template>

<script>
export default {
  name: 'QuantitySelector',
  props: {
    quantity: {
      type: Number,
      default: 1
    }
  }
}
</script>
