<template>
  <d-function-wrapper :classes="['d-code-snippet']" v-bind="{...$props, ...$attrs}">
    <d-card block depressed class="d-code-snippet__card" elevation="8">
      <d-row class="d-code-snippet__title" :elevation="$vuelize.theme.dark?8:'0'">
        <d-column>
          <d-card-subtitle color="primary">
            {{ label }}
          </d-card-subtitle>
        </d-column>
        <d-spacer/>
        <d-card-subtitle root-tag="pre">
          {{ language }}
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
                <d-card-title v-highlightjs="line" class="d-code-snippet__code__row__code font-size-small"><code
                    :class="language"></code></d-card-title>
              </d-column>
            </d-row>
          </d-card-content>
        </d-column>
        <d-column v-if="showPreview" class="d-code-snippet__preview pa-0 ma-3 elevation-2">
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
    hidePreview: {type: Boolean, default: false}
  },

  components: {
    VRuntimeTemplate
  },

  data: () => ({
    hover: false,
  }),

  computed: {
    parsedCode() {
      return this.code.split('\n')
    },
    showPreview() {
      return (this.language.toLowerCase() === 'vue' || this.language.toLowerCase() === 'html') && !this.hidePreview
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
