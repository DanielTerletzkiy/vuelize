<template>
  <div>
    <d-card-title class="title">
      {{ title }}
    </d-card-title>
    <d-card-subtitle class="subtitle">
      {{ subtitle }}
    </d-card-subtitle>

    <d-column column gap>
      <d-column block v-for="{name, code, component} in examples" :key="name">
        <d-code-snippet :label="name" :code="code" split-vue-tags>
          <component :is="component"/>
        </d-code-snippet>
      </d-column>
    </d-column>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: "Wrapper",

  data: () => ({
    examples: null,
  }),

  watch: {
    '$route.params.directive'() {
      this.getExamples()
    }
  },

  computed: {
    title() {
      return this.$route.name
    },
    subtitle() {
      return this.$route.params.directive
    }
  },

  methods: {
    getExamples() {
      const req = require.context('../examples', true, /\.(js|vue)$/i, 'sync');
      let comps = [];
      req.keys().forEach((key) => {
        if (key.match(this.$route.path)) {
          const vueCode = require('!raw-loader!../examples' + key.substring(1)).default;

          const nameReg = new RegExp("name: \"(.*)\"");
          const name = vueCode.match(nameReg)[1];

          const weightReg = new RegExp("weight: \"(.*)\"");
          let weight = vueCode.match(weightReg);
          if(weight !== null){
            weight = parseInt(weight[1])
          }else {
            weight = 100
          }

          const code = req(key).default;
          comps.push( {name, code: vueCode, component: Vue.component(key, code), weight});
        }
      });
      this.examples = comps.sort((a, b) => a.weight - b.weight);
    }
  },

  mounted() {
    this.getExamples()
    console.log(this.$route)
  }
}
</script>

<style scoped lang="scss">
.title {
}

.subtitle {
  text-transform: capitalize;
}
</style>
