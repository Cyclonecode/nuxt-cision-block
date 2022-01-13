<template>
  <div
      v-if="item"
  >
    {{ item.title }}
  </div>
</template>
<script>
export default {
  name: 'Article',
  props: {
    id: {
      type: String,
      required: false,
    }
  },
  data () {
    return {
      item: {}
    }
  },
  async fetch() {
    console.log('fetching', this.$route.params.id)
    this.item = (await this.$cision.fetch(this.$route.params.id))
    console.log(this.item)
  }
}
</script>
