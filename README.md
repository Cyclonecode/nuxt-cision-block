# Cision Block Module For Nuxt

This module can be used to fetch and display press releases from Cision.

## Installation:

```javascript
npm install nuxt-cision-block --save
```

## Usage:

Install the module and then add the module to your `nuxt.config.js` file:

    'modules': {
      [
        'nuxt-cision-block', {
          id: 'A275C0BF733048FFAE9126ACA64DD08F',
          basePath: 'ir',
        },
      ],
    }

Add the `PressFeed` component where you would like to use it:

    <template>
        <PressFeed
            id="A275C0BF733048FFAE9126ACA64DD08F"
            :show-image="true"
            :show-intro="true"
            :show-body="false"
            :must-have-image="false"
            :use-cache="true"
            :item-count=50
            :items-per-page=10
            :display-mode=1
            :item-type="['KMK', 'RDV', 'PRM', 'RPT', 'INB', 'NBR']"
            :categories="[]"
            :keywords="[]"
            :mark-item="true"
            start-date="2011-01-01"
            end-date="2015-01-01"
            language-code="en"
            regulatory-text="REGULATORY"
            non-regulatory-text="NORMAL"
        />
    </template>

## Options

* `id` Unique id for your feed.
* `showImage` Display images or not.
* `showIntro` Display excerpt or not.
* `showBody` Display body or not.
* `mustHaveImage` Remove items missing any image.
* `useCache` Enable caching.
* `maxAge` Maximum age in ms.
* `basePath` The base slug for each news article.
* `itemCount` Maxium number of items to fetch.
* `itemsPerPage` The number of items per page.
* `displayMode` Whether we would like to display only regulatory releases,
non-regulatory releases or a mix of both.
* `itemType` Only include items with the following information type.
* `categories` Only include items with the following categories.
* `keywords` Only include items with the following keywords.
* `startDate` Only include items published after or on this date.
* `endDate` Only include items published before or up to this date.
* `markItems` Display regulatory or non regulatory text for each item.
* `regulatoryText` The text to display for regulatory items.
* `nonRegulatoryText` The text to display for non-regulatory items.
