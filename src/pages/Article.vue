<template>
  <div v-if="release">
    <h1>{{ release.title }}</h1>
    <div v-html="release.htmlIntro" />
    <div v-html="release.htmlBody" />
    <div v-if="files.length" class="cision-block-files">
      <a
        v-for="(file, index) in files"
        :href="file.url"
        :key="'file-' + index"
        >{{ file.title }}</a
      >
    </div>
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
  computed: {
    files() {
      return this.release.files || []
    },
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
