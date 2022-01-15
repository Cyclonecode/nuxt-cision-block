<template>
  <div id="wrapper" class="cision-feed-wrapper">
    <PressReleaseCard
      v-for="(item, index) in items"
      :key="'press-item-' + index"
      :show-media="showImage"
      :show-intro="showIntro"
      :show-body="showBody"
      :mark-item="markItem"
      :regulatory-text="regulatoryText"
      :non-regulatory-text="nonRegulatoryText"
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
    languageCode: {
      type: String,
      required: false,
    },
    mustHaveImage: {
      type: Boolean,
      default: false,
    },
    showImage: {
      type: Boolean,
      default: false,
    },
    showIntro: {
      type: Boolean,
      default: true,
    },
    showBody: {
      type: Boolean,
      default: true,
    },
    itemType: {
      type: Array,
      default: () => ['KMK', 'RDV', 'PRM', 'RPT', 'INB', 'NBR'],
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
      default: true,
    },
    itemCount: {
      type: Number,
      default: 50,
    },
    itemsPerPage: {
      type: Number,
      default: 0,
    },
    categories: {
      type: Array,
      default: () => [],
    },
    keywords: {
      type: Array,
      default: () => [],
    },
    markItem: {
      type: Boolean,
      default: false,
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
      default: 1,
    },
  },
  data() {
    return {
      releases: [],
      page: 0,
    }
  },
  computed: {
    numPages() {
      if (this.itemsPerPage > 0) {
        const max = Math.ceil(this.releases.length / this.itemsPerPage)
        return max || 1
      } else {
        return 1
      }
    },
    items() {
      if (this.itemsPerPage > 0) {
        return this.releases.slice(
          this.page * this.itemsPerPage,
          this.page * this.itemsPerPage + this.itemsPerPage
        )
      } else {
        return this.releases
      }
    },
  },
  watch: {
    $route(to, from) {
      this.fetchFeed()
    },
  },
  async fetch() {
    await this.fetchFeed()
  },
  methods: {
    async fetchFeed() {
      this.releases = (
        await this.$cision.fetchFeed({
          id: this.id,
          mustHaveImage: this.mustHaveImage,
          displayMode: this.displayMode,
          itemsPerPage: this.itemsPerPage,
          itemCount: this.itemCount,
          itemType: this.itemType,
          startDate: this.startDate,
          endDate: this.endDate,
          language: this.languageCode,
          categories: this.categories,
          keywords: this.keywords,
          useCache: this.useCache,
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
