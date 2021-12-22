<template>
  <d-function-wrapper :classes="['d-code-line']" v-bind="{...$props, ...$attrs}">
    <d-card block depressed class="d-code-line__card" elevation="8">
      <d-row class="d-code-line__title">
        <d-column>
          <d-card-subtitle color="primary">
            {{ label }}
          </d-card-subtitle>
        </d-column>
        <d-spacer/>
        <d-card-subtitle root-tag="pre">
          {{ language }}
        </d-card-subtitle>
        <d-divider vertical block size="2px" class="my-3" :color="hover.includes(-1)?'primary':''"/>
        <d-column>
          <d-icon-button size="40" color="primary" @click="copySequence"
                         v-hover="{ over: ()=>{setHover(true, -1)}, leave: ()=>{setHover(false, -1)} }">
            <d-icon name="clipboard-notes"/>
          </d-icon-button>
        </d-column>
      </d-row>

      <d-row class="d-code-line__row" v-for="(code, c) in this.codeArray" :key="c">
        <d-column>
          <d-card-subtitle class="d-code-line__row__number">
            {{ c + 1 }}
          </d-card-subtitle>
        </d-column>
        <d-column>
          <d-card-title v-highlightjs="code" class="d-code-snippet__code__row__code font-size-small"><code
              :class="language"></code></d-card-title>
        </d-column>
        <d-spacer></d-spacer>
        <d-divider vertical block size="2px" class="my-3" :color="hover.includes(c)?'primary':''"/>
        <d-column>
          <d-icon-button size="40" color="primary" @click="()=>copy(code)"
                         v-hover="{ over: ()=>{setHover(true, c)}, leave: ()=>{setHover(false, c)} }">
            <d-icon name="clipboard"/>
          </d-icon-button>
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
  name: "d-code-line",

  props: {
    label: {type: String, required: true},
    codeArray: Array,
    language: {type: String, default: 'ShellScript'}
  },

  data: () => ({
    hover: [],
  }),

  methods: {
    copy(code) {
      navigator.clipboard.writeText(code);
      this.$notify('Copied', 'Code copied', 'success', {icon: 'clipboard-notes'})
    },
    copySequence() {
      const codeSequence = this.codeArray.map((code) => {
        return code + '\n'
      }).join('');
      this.copy(codeSequence)
    },
    setHover(state, index) {
      if (state) {
        if (index === -1) {
          for (let i = -1; i < this.codeArray.length; i++) {
            this.hover.push(i);
          }
        } else {
          this.hover = [index];
        }
      } else {
        this.hover = [];
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";
@import "../../styles/highlightjs/highlightjs";

.d-code-line {
  &__card {
    overflow: hidden;
  }


  &__row {
    width: 100%;

    &__number {
      user-select: none;
      padding-left: 16px !important;
    }

    &__code {
      font-family: monospace;
    }
  }
}
</style>
