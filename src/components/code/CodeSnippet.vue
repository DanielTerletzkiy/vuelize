<template>
  <d-function-wrapper :classes="['d-code-snippet']" v-bind="{...$props, ...$attrs}">
    <d-card block max-width="600px" depressed class="d-code-snippet__card">
      <d-row :elevation="this.$vuelize.theme.dark ? 'n1' : ''">
        <d-column>
          <d-card-subtitle color="primary">
            {{ label }}
          </d-card-subtitle>
        </d-column>
        <d-spacer/>
        <d-divider vertical block size="1.5px" class="my-3" :color="hover?'primary':''"/>
        <d-column>
          <d-icon-button size="40" color="primary" @click="copy"
                         v-hover="{ over: ()=>{this.hover = true}, leave: ()=>{this.hover = false} }">
            <d-icon name="clipboard-notes"/>
          </d-icon-button>
        </d-column>
      </d-row>

      <div v-html="parsedCode"/>

      <d-card-subtitle>
        {{ parsedCode }}
      </d-card-subtitle>

    </d-card>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-code-snippet",

  props: {
    label: {type: String, required: true},
    code: {type: String, required: true},
    parameter: Array
  },

  data: () => ({
    hover: false,
    parsedCode: '',
  }),

  watch: {
    code() {
      this.replaceCode();
    },
    parameter() {
      this.replaceCode();
    }
  },

  methods: {
    copy() {
      navigator.clipboard.writeText(this.$refs.codeInput.innerHTML);
    },

    replaceCode() {
      let code = this.code;
      this.parameter.forEach((param) => {
        param = param.replaceAll("'", '"');
        code = code.replace('#', param);
      });
      this.parsedCode = code;
    },

  },

  mounted() {
    this.replaceCode();
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.d-code-snippet {
  max-width: inherit;

  &__card {
    overflow: hidden;
  }

  &__code {
    max-width: inherit;
    overflow: auto;
  }
}
</style>
