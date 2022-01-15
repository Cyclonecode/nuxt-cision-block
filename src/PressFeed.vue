<template>
  <div id="wrapper" class="cision-feed-wrapper">
    <PressReleaseCard
        v-for="(item, index) in items"
        :key="'press-item-' + index"
        :show-media="doShowImage"
        :show-intro="doShowIntro"
        :show-body="doShowBody"
        :mark-item="doMarkItem"
        :regulatory-text="getRegulatoryText"
        :non-regulatory-text="getNonRegulatoryText"
        :item="item"
    />
    <ul v-if="numPages > 1" id="pager" class="cision-feed-pager">
      <li v-for="index in numPages" :key="'page-' + index">
        <nuxt-link :to="{ query: { page: index - 1 } }">
          {{ index }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
import PressReleaseCard from './PressReleaseCard.vue'

export default {
  name: 'PressFeed',
  components: {
    PressReleaseCard,
  },
  props: {
    id: {
      type: String,
      default: undefined,
    },
    language: {
      type: String,
      required: undefined,
    },
    mustHaveImage: {
      type: Boolean,
      default: undefined,
    },
    showImage: {
      type: Boolean,
      default: undefined,
    },
    showIntro: {
      type: Boolean,
      default: undefined,
    },
    showBody: {
      type: Boolean,
      default: undefined,
    },
    itemType: {
      type: Array,
      default: undefined,
    },
    startDate: {
      type: String,
      default: undefined,
    },
    endDate: {
      type: String,
      default: undefined,
    },
    useCache: {
      type: Boolean,
      default: undefined,
    },
    itemCount: {
      type: Number,
      default: undefined,
    },
    itemsPerPage: {
      type: Number,
      default: undefined,
    },
    categories: {
      type: Array,
      default: undefined,
    },
    keywords: {
      type: Array,
      default: undefined,
    },
    markItem: {
      type: Boolean,
      default: undefined,
    },
    regulatoryText: {
      type: String,
      default: undefined,
    },
    nonRegulatoryText: {
      type: String,
      default: undefined,
    },
    displayMode: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      releases: [],
      page: 0,
    }
  },
  async fetch() {
    await this.fetchFeed()
  },
  computed: {
    numPages() {
      const itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : this.$cision.options.itemsPerPage
      if (itemsPerPage > 0) {
        const max = Math.ceil(this.releases.length / itemsPerPage)
        return max || 1
      } else {
        return 1
      }
    },
    items() {
      const itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : this.$cision.options.itemsPerPage
      if (itemsPerPage > 0) {
        return this.releases.slice(
            this.page * itemsPerPage,
            this.page * itemsPerPage + itemsPerPage
        )
      } else {
        return this.releases
      }
    },
    doShowImage() {
      return typeof this.showImage !== 'undefined' ? this.showImage : this.$cision.options.showImage
    },
    doShowIntro() {
      return typeof this.showIntro !== 'undefined' ? this.showIntro : this.$cision.options.showIntro
    },
    doShowBody() {
      return typeof this.showBody !== 'undefined' ? this.showBody : this.$cision.options.showBody
    },
    doMarkItem() {
      return typeof this.markItem !== 'undefined' ? this.markItem : this.$cision.options.markItem
    },
    getRegulatoryText() {
      return typeof this.regulatoryText !== 'undefined' ? this.regulatoryText : this.$cision.options.regulatoryText
    },
    getNonRegulatoryText() {
      return typeof this.nonRegulatoryText !== 'undefined' ? this.nonRegulatoryText : this.$cision.options.nonRegulatoryText
    }
  },
  watch: {
    /* eslint-disable  @typescript-eslint/no-unused-vars */
    $route(to, from) {
      this.fetchFeed()
    },
  },
  methods: {
    async fetchFeed() {
      this.releases = (
          await this.$cision.fetchFeed({
            id: this.id,
            mustHaveImage: this.mustHaveImage || this.$cision.options.mustHaveImage,
            displayMode: this.displayMode || this.$cision.options.displayMode,
            itemCount: this.itemCount || this.$cision.options.itemCount,
            itemType: this.itemType || this.$cision.options.itemType,
            startDate: this.startDate || this.$cision.options.startDate,
            endDate: this.endDate || this.$cision.options.endDate,
            language: this.language || this.$cision.options.language,
            categories: this.categories || this.$cision.options.categories,
            keywords: this.keywords || this.$cision.options.keywords,
            useCache: this.useCache || this.$cision.options.useCache,
          })
      )?.items

      this.page = this.$route.query.page || 0
    },
  },
}
</script>
<style scoped>
.cision-feed-wrapper {
  width: 100%;
}
.cision-feed-wrapper ul.cision-feed-pager {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  text-align: center;
}
.cision-feed-wrapper ul.cision-feed-pager li {
  margin: 0;
  padding-right: 10px;
  display: inline;
}
.cision-feed-wrapper ul.cision-feed-pager li a {
  text-decoration: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.cision-feed-wrapper ul.cision-feed-pager li a.active {
  text-decoration: underline;
}
.cision-feed-wrapper ul.cision-feed-filters {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.cision-feed-wrapper ul.cision-feed-filters li {
  display: inline;
}
.cision-feed-wrapper ul.cision-feed-filters li button {
  display: inline-block;
  float: left;
  background-color: transparent;
  color: #000;
}
.cision-feed-wrapper ul.cision-feed-filters li button:focus {
  outline: 0;
}
</style>
