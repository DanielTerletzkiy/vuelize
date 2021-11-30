<template>
  <d-function-wrapper :classes="['d-code-snippet']" v-bind="{...$props, ...$attrs}">
    <d-card block max-width="600px" depressed class="d-code-snippet__card">
      <d-row :elevation="this.$vuelize.theme.dark ? 'n1' : ''">
        <d-column>
          <d-card-subtitle color="primary">
            {{label}}
          </d-card-subtitle>
        </d-column>
        <d-spacer/>
        <d-divider vertical block size="1.4px" class="my-3" :color="hover?'primary':''"/>
        <d-column>
          <d-icon-button size="40" color="primary" @click="copySequence"
                         v-hover="{ over: ()=>{this.hover = true}, leave: ()=>{this.hover = false} }">
            <d-icon name="clipboard-notes"/>
          </d-icon-button>
        </d-column>
      </d-row>

      <d-row class="d-code-snippet__row" v-for="(code, c) in this.codeArray" :key="c">
        <d-column>
          <d-card-subtitle class="d-code-snippet__code">
            {{ code }}
          </d-card-subtitle>
        </d-column>
        <d-spacer></d-spacer>
        <d-divider vertical block size="1.4px" class="my-3" :color="hover?'primary':''"/>
        <d-column>
          <d-icon-button size="40" color="primary" @click="()=>copy(code)">
            <d-icon name="clipboard"/>
          </d-icon-button>
        </d-column>
      </d-row>
    </d-card>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-code-snippet",

  props: {
    label: {type: String, required: true},
    codeArray: Array,
  },

  data: () => ({
    hover: false
  }),

  methods: {
    copy(code) {
      navigator.clipboard.writeText(code);
    },
    copySequence() {
      const codeSequence = this.codeArray.map((code) => {
        return code + '\n'
      }).join('');
      this.copy(codeSequence)
    },
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.d-code-snippet {
  &__card {
    overflow: hidden;
  }

  &__code {
    font-family: monospace;
  }

  &__row {
    width: 100%;
  }
}
</style>
