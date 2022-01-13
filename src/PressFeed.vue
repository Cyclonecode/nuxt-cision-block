<template>
  <div id="wrapper" class="cision-feed-wrapper">
    <div id="controls">
      <label>
        Images
        <input
          v-model="showImages"
          type="checkbox"
          v-on:change="fetchFeed()"
        /><br />
        Intro
        <input
          v-model="showIntro"
          type="checkbox"
          v-on:change="fetchFeed()"
        /><br />
        Body
        <input
          v-model="showBody"
          type="checkbox"
          v-on:change="fetchFeed()"
        /><br />
        Regulatory
        <input v-model="regulatory" type="checkbox" v-on:change="fetchFeed()" />
        ItemsPerPage
        <input
          v-model="itemsPerPage"
          type="number"
          min="0"
          max="100"
          v-on:change="fetchFeed()"
        />
      </label>
      {{ showImages }} {{ regulatory }} {{ itemsPerPage }}
    </div>
    <PressReleaseCard
      v-for="(item, index) in list"
      :key="'press-item-' + index"
      :show-media="showImages"
      :show-intro="showIntro"
      :show-body="showBody"
      :item="item"
    >
    </PressReleaseCard>
    <ul id="pager" class="cision-feed-pager">
      <li v-for="index in pages" :key="'page-' + index">
        <nuxt-link :to="{ query: { cbid: id, page: index } }">
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
  data() {
    return {
      id: 'cb',
      feed: {},
      list: [],
      pages: 0,
      page: 0,
      itemsPerPage: 5,
      //
      showImages: false,
      showIntro: true,
      showBody: true,
      regulatory: true,
    }
  },
  computed: {},
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
      this.feed = await this.$cision.fetchFeed({
        hasImage: this.hasImage,
        regulatory: this.regulatory,
        index: this.$route.query.page || 0,
        count: this.itemsPerPage,
        language: 'sv',
        // categories: ['Regular pressreleases'],
      })
      const max = 20
      this.list = this.feed.items
      // this.itemsPerPage = this.feed.itemsPerPage
      // We could actually use totalItems to go through the entire feed
      // but we also need 'max' I think, in cases where we only would like to
      // paginate the first 50 or so releases
      this.pages = Math.ceil(
        (max ? Math.min(max, this.feed.totalItems) : this.feed.totalItems) /
          this.itemsPerPage
      )
      if (this.list.length === 0) {
        this.pages = 0
      }
      this.page = this.feed.index
      console.log(
        `${process.server ? 'serverside' : 'clientside'}`,
        this.$route.query,
        this.list.length,
        this.pages,
        this.page,
        this.feed.items.length
      )
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
