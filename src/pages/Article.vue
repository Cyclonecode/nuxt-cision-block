<template>
  <div v-if="release">
    <h1>{{ release.title }}</h1>
    <div v-html="release.htmlIntro" />
    <div v-html="release.htmlBody" />
  </div>
</template>
<script>
export default {
  name: 'Article',
  props: {
    id: {
      type: String,
      required: false,
    },
    item: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      release: {},
    }
  },
  async fetch() {
    if (this.item) {
      this.release = this.item
      return
    }
    this.release = await this.$cision.fetch(this.id || this.$route.params.id)
  },
}
</script>
