<template>
  <d-function-wrapper :classes="['d-code-line']" v-bind="{...$props, ...$attrs}">
    <d-card block max-width="600px" depressed class="d-code-line__card">
      <d-row class="d-code-line__title" :elevation="this.$vuelize.theme.dark ? 'n1' : ''">
        <d-column>
          <d-card-subtitle color="primary">
            {{ label }}
          </d-card-subtitle>
        </d-column>
        <d-spacer/>
        <d-divider vertical block size="1.5px" class="my-3" :color="hover.includes(-1)?'primary':''"/>
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
          <d-card-subtitle class="d-code-line__row__code">
            {{ code }}
          </d-card-subtitle>
        </d-column>
        <d-spacer></d-spacer>
        <d-divider vertical block size="1.5px" class="my-3" :color="hover.includes(c)?'primary':''"/>
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
export default {
  name: "d-code-line",

  props: {
    label: {type: String, required: true},
    codeArray: Array,
  },

  data: () => ({
    hover: [],
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
