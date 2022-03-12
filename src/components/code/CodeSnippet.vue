<template>
  <d-function-wrapper :classes="['d-code-snippet']" v-bind="{...$props, ...$attrs}">
    <d-card block depressed class="d-code-snippet__card" elevation-dark="n4" elevation-light="0">
      <d-row class="d-code-snippet__title" elevation-dark="n2" elevation-light="0">
        <d-column>
          <d-card-subtitle color="primary">
            {{ label }}
          </d-card-subtitle>
        </d-column>
        <d-row width="max-content" v-if="splitVueTags">
          <d-divider vertical block size="2px" class="my-4 mr-2"/>
          <d-tab-list v-model="currentVueTag">
            <d-tab-item height="0px" :color="currentVueTag === tag ? color : ''" v-for="{tag, icon, color} in vueTags"
                        :key="tag">
              <d-icon :name="icon"/>
              <d-card-subtitle color="inherit" root-tag="pre">{{ tag }}</d-card-subtitle>
            </d-tab-item>
          </d-tab-list>
        </d-row>
        <d-spacer/>
        <d-card-subtitle root-tag="pre">
          {{ currentLanguage }}
        </d-card-subtitle>
        <d-divider vertical block size="2px" class="my-3" :color="hover?'primary':''"/>
        <d-column>
          <d-icon-button size="40" color="primary" @click="copy"
                         v-hover="{ over: ()=>{this.hover = true}, leave: ()=>{this.hover = false} }">
            <d-icon name="clipboard-notes"/>
          </d-icon-button>
        </d-column>
      </d-row>
      <d-row wrap>
        <d-column class="d-code-snippet__code my-2">
          <d-card-content class="pa-0">
            <d-row v-for="(line, l) in parsedCode" :key="l" class="d-code-snippet__code__row">
              <d-column>
                <d-card-subtitle class="d-code-snippet__code__row__number">{{ l + 1 }}</d-card-subtitle>
              </d-column>
              <d-column>
                <d-card-title v-highlightjs="line" :key="currentLanguage" class="d-code-snippet__code__row__code font-size-small"><code
                    :class="currentLanguage"></code></d-card-title>
              </d-column>
            </d-row>
          </d-card-content>
        </d-column>
        <d-column v-if="showPreview" class="d-code-snippet__preview pa-0 ma-3" elevation-dark="n1" elevation-light>
          <d-card-content flex column no-gap>
            <div class="d-code-snippet__preview__title">
              <d-card-subtitle>
                <d-icon name="eye"/>
                Preview
              </d-card-subtitle>
              <d-divider size="2px" color="primary" class="mx-3"/>
            </div>
            <d-card-content
                class="mt-3">
              <slot>
                <v-runtime-template :template="code"></v-runtime-template>
              </slot>
            </d-card-content>
          </d-card-content>
        </d-column>
      </d-row>
    </d-card>
  </d-function-wrapper>
</template>

<script>
import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'

Vue.use(VueHighlightJS)

import VRuntimeTemplate from "v-runtime-template";

export default {
  name: "d-code-snippet",
  props: {
    label: {type: String, required: true},
    code: String,
    language: {type: String, default: 'html'},
    hidePreview: {type: Boolean, default: false},
    splitVueTags: Boolean,
  },

  components: {
    VRuntimeTemplate
  },

  data: () => ({
    hover: false,
    vueTags: [
      {tag: 'template', language: 'html', icon: 'html5-alt', color: '#DD6025'},
      {tag: 'script', language: 'javascript', icon: 'vuejs', color: '#41B883'},
      {tag: 'style', language: 'css', icon: 'css3-simple', color: '#3492CB'}
    ],
    currentVueTag: 'template'
  }),

  computed: {
    parsedCode() {
      if (this.splitVueTags) {
        let tagContents = []
        this.vueTags.forEach((item) => {
          const regex = new RegExp("<" + item.tag + ".*>(.*)</" + item.tag + ">", 's')
          const extract = this.code.match(regex)[0]
          tagContents.push(extract.split('\n'))
        })
        return tagContents[this.vueTags.findIndex((item) => item.tag === this.currentVueTag)]
      } else {
        return this.code.split('\n')
      }
    },
    currentLanguage() {
      if (this.splitVueTags) {
        return this.vueTags.find((item) =>
            item.tag === this.currentVueTag
        ).language
      } else {
        return this.language
      }
    },
    showPreview() {
      return (this.language.toLowerCase() === 'vue' || this.language.toLowerCase() === 'html' || this.splitVueTags) && !this.hidePreview
    }
  },

  methods: {
    copy() {
      navigator.clipboard.writeText(this.parsedCode.map((line) => {
        return line + '\n'
      }).join(''));
      this.$notify('Copied', 'Code copied', 'success', {icon: 'clipboard-notes'})
    },
  },

  mounted() {
    this.$forceUpdate()
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";
@import "../../styles/highlightjs/highlightjs";

.d-code-snippet {
  width: 100%;

  &__title {
    position: sticky;
    top: 54px;

    &.theme--light {
      background: $light_sheet;
    }
  }

  &__card {
    max-width: inherit;
  }

  &__code {
    max-width: inherit;
    overflow: auto;
    padding: 0 !important;

    &__row {
      width: 100%;

      &__number {
        user-select: none;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        margin-left: -6px !important;
        width: 40px !important;
        display: block !important;
        text-align: right;
      }

      &__code {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        min-height: auto !important;
        font-family: monospace;
        white-space: pre-wrap;
      }
    }
  }

  &__preview {
    width: 100%;

    &__title {
      width: min-content;
    }
  }
}
</style>
