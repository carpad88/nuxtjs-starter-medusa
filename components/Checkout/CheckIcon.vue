<template>
  <span
    class="rounded-3xl flex bg-green-400 items-center justify-center"
    :class="`w-${size} h-${size}`"
  >
    <svg
      :class="`w-${size/2} h-${size/2}`"
      fill="#ffffff"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 64 64"
      xml:space="preserve"
    >
      <path
        d="M62.3,12.7c-0.7-0.7-1.8-0.7-2.5,0L23.3,48.1c-0.3,0.3-0.7,0.3-1,0L4.2,30.5c-0.7-0.7-1.8-0.7-2.5,0c-0.7,0.7-0.7,1.8,0,2.5l18.1,17.6c0.8,0.8,1.9,1.2,2.9,1.2c1.1,0,2.1-0.4,2.9-1.2l36.5-35.4C62.9,14.5,62.9,13.4,62.3,12.7z"
      />
    </svg>
  </span>
</template>

<script>
export default {
  name: 'CheckIcon',
  props: {
    size: {
      type: Number,
      default: 8
    }
  }
}
</script>
