<template>
  <d-function-wrapper :classes="['d-code-snippet']" v-bind="{...$props, ...$attrs}">
    <d-card block depressed class="d-code-snippet__card" elevation="8">
      <d-row class="d-code-snippet__title">
        <d-column>
          <d-card-subtitle color="primary">
            {{ label }}
          </d-card-subtitle>
        </d-column>
        <d-spacer/>
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
        <d-column v-if="!!(this.$slots.default || [])[0]" class="d-code-snippet__preview pa-0 ma-3 elevation-2">
          <d-card-content flex column no-gap>
            <div class="d-code-snippet__preview__title">
              <d-card-subtitle>
                <d-icon name="eye"/>
                Preview
              </d-card-subtitle>
              <d-divider size="2px" color="primary" class="mx-3"/>
            </div>
            <d-card-content class="mt-3">
              <slot></slot>
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

export default {
  name: "d-code-snippet",
  props: {
    label: {type: String, required: true},
    code: String,
    language: {type: String, default: 'vue'}
  },

  data: () => ({
    hover: false,
    parsedCode: [],
  }),

  methods: {
    copy() {
      navigator.clipboard.writeText(this.parsedCode.map((line) => {
        return line + '\n'
      }).join(''));
      this.$notify('Copied', 'Code copied', 'success', {icon: 'clipboard-notes'})
    },
    process() {
      const div = document.createElement('div');
      div.innerHTML = this.code.trim();
      const html = this.format(div, 0);

      let code = html.innerHTML.split('\n')
      for (let i = 0; i < code.length; i++) {
        if (!code[i].replace(/\s/g, '').length) {
          code.splice(i, 1)
        }
      }
      this.parsedCode = code;
    },
    format(node, level) {
      let indentBefore = new Array(level++ + 1).join('  '),
          indentAfter = new Array(level - 1).join('  '),
          textNode;
      for (let i = 0; i < node.children.length; i++) {
        textNode = document.createTextNode('\n' + indentBefore);
        node.insertBefore(textNode, node.children[i]);
        this.format(node.children[i], level);
        if (node.lastElementChild === node.children[i]) {
          textNode = document.createTextNode('\n' + indentAfter);
          node.appendChild(textNode);
        }
      }
      return node;
    }
  },
  mounted() {
    this.process();
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
    left: 0;
  }

  &__card {
    max-width: inherit;
    overflow: hidden;
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
