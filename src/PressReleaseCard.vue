<template>
  <section class="cision-feed-item">
    <h1>{{ item.title }}</h1>
    <time>{{ item.date }}</time>
    <span v-if="markItem">
      {{ releaseText }}
    </span>
    <div v-if="showMedia && item.image" class="cision-feed-item-media">
      <img :src="item.image" :alt="item.title" />
    </div>
    <p class="intro" v-if="showIntro">{{ item.intro }}</p>
    <p v-if="showBody">{{ item.body }}</p>
    <nuxt-link :to="link">
      {{ linkText }}
    </nuxt-link>
  </section>
</template>
<script>
export default {
  name: 'PressReleaseCard',
  components: {},
  props: {
    item: {
      type: Object,
      required: true,
    },
    showMedia: {
      type: Boolean,
      default: false,
    },
    showIntro: {
      type: Boolean,
      default: false,
    },
    showBody: {
      type: Boolean,
      default: true,
    },
    markItem: {
      type: Boolean,
      default: false,
    },
    regulatoryText: {
      type: String,
      required: false,
      default: 'Regulatory',
    },
    nonRegulatoryText: {
      type: String,
      required: false,
      default: 'Non-regulatory',
    },
    linkText: {
      type: String,
      default: 'Read more',
    },
  },
  computed: {
    link() {
      return `${this.$cision.options?.basePath + '/' + this.item.encryptedId}`
    },
    releaseText() {
      return this.item.isRegulatory
        ? this.regulatoryText
        : this.nonRegulatoryText
    },
  },
}
</script>
<style scoped>
.cision-feed-item {
  overflow: hidden;
  border-bottom: 1px solid #c0c0c0;
  padding: 15px 0 30px 0;
  margin-bottom: 15px;
}
.cision-feed-item .cision-feed-regulatory {
  display: block;
  padding: 15px 0;
}
.cision-feed-item-media {
  width: 100%;
  padding-bottom: 10px;
  display: block;
}
.cision-feed-item-media img {
  display: block;
  margin: 5px auto;
  max-width: 100%;
  vertical-align: middle;
  border: 0;
}
@media screen and (min-width: 768px) {
  .cision-feed-item {
    padding: 30px;
  }
}
</style>
