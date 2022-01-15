<template>
  <div v-if="release">
    <h1>{{ release.title }}</h1>
    <div v-if="showIntro" v-html="release.htmlIntro" />
    <div v-if="showBody" v-html="release.htmlBody" />
    <div v-if="showFiles && files.length" class="cision-block-files">
      <a
        v-for="(file, index) in files"
        :key="'file-' + index"
        :href="file.url"
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
  async fetch() {
    if (this.item) {
      this.release = this.item
      return
    }
    this.release = await this.$cision.fetch(this.id || this.$route.params.id)
  },
  computed: {
    files() {
      return this.release.files || []
    },
    showImage() {
      return this.$cision.options.articleShowImage
    },
    showIntro() {
      return this.$cision.options.articleShowIntro
    },
    showBody() {
      return this.$cision.options.articleShowBody
    },
    showFiles() {
      return this.$cision.options.articleShowFiles
    },
  },
}
</script>
