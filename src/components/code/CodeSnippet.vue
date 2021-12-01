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

      <div ref="codeInput" v-show="false">
        <slot>
        </slot>
      </div>
      <pre ref="codeOutput" class="d-code-snippet__code">

      </pre>

    </d-card>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-code-snippet",

  props: {
    label: {type: String, required: true},
  },

  data: () => ({
    hover: false,
  }),

  watch: {
    '$refs'() {
      this.code();
      this.$forceUpdate()
    }
  },

  methods: {
    copy() {
      navigator.clipboard.writeText(this.$refs.codeInput.innerHTML);
    },

    code() {
      this.$refs.codeOutput.innerText = this.process(this.$refs.codeInput.innerHTML);
    },

    process(str) {

      const div = document.createElement('div');
      div.innerHTML = str.trim();

      return this.format(div, 0).innerHTML;
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

      console.log(node)
      return node;
    }
  },

  mounted() {
    this.code();
    this.$forceUpdate()
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
