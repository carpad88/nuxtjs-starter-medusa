<template>
  <div>
    <div v-for="option in filteredOptions" :key="option.id" class="mt-6">
      <div class="text-sm">
        <p class="font-medium mb-2">
          {{ option.title }}
        </p>
        <div>
          <button
            v-for="value in option.values"
            :key="value.id"
            :class="value.value === currentOptions[option.id] ? 'bg-gray-500 text-white' : 'bg-gray-200 text-black'"
            class="inline-flex items-center justify-center rounded-sm text-xs h-12 w-12 mr-2 last:mr-0 hover:bg-gray-500 hover:text-white"
            @click="updateOption(option.id, value.value )"
          >
            {{ value.value }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductOptions',
  props: {
    options: {
      type: Array,
      default () { return [] }
    }
  },
  data () {
    return {
      currentOptions: { }
    }
  },
  computed: {
    filteredOptions () {
      return this.options.map((option) => {
        option.values = option.values.reduce((acc, curr) => {
          if (!acc.find(val => val.value === curr.value)) {
            return [...acc, { ...curr }]
          }
          return acc
        }, [])

        return option
      })
    }
  },
  watch: {
    options (val) {
      this.currentOptions = val.reduce((acc, curr) => {
        return { ...acc, [curr.id]: curr.values[0].value }
      }, {})
      this.$emit('updateSelectedOptions', this.currentOptions)
    }
  },
  methods: {
    updateOption (optionId, value) {
      this.currentOptions[optionId] = value
      this.$emit('updateSelectedOptions', this.currentOptions)
    }
  }
}
</script>
