# Cision Block Module For Nuxt

This module can be used to fetch and display press releases from Cision.

## Demo

A small demo can be found here: http://cyclonecode.tk:3030/

## Installation:

    npm install nuxt-cision-block --save

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
* `articleShowImage` Display image in article.
* `articleShowIntro` Display excerpt in article.
* `articleShowBody` Display body in article.
* `articleShowFiles` Display list of files in article.
* `mustHaveImage` Remove items missing any image.
* `useCache` Enable caching.
* `cacheMax*` Maximum number of entries to cache.
* `cacheMaxAge*` Maximum age in ms, can be set till 0 to disable caching.
* `basePath*` The base slug for each news article.
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

`*` The setting can only be used during build time, e.g it can only be set as an option in `nuxt.config.js`
for the module.

## Example

You can try out the module using docker:

    npm run build && docker-compose up

Then visit the sample page at:

    http://localhost:8080

Check `docker-compose.yaml` for environment variables that you may override by using a `.env` file.
