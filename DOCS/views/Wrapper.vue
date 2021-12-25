<template>
  <div>
    <d-card-title class="title">
      {{ title }}
    </d-card-title>
    <d-card-subtitle class="subtitle">
      {{ subtitle }}
    </d-card-subtitle>

    <d-column column gap>
      <d-column block v-for="{component, name} in examples" :key="name">
        <d-code-snippet :label="name" :code="component"/>
      </d-column>
    </d-column>
  </div>
</template>

<script>
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
      const req = require.context('!raw-loader!../examples', true, /\.(js|vue)$/i);
      let comps = [];

      req.keys().forEach((key) => {
        if (key.match(this.$route.path)) {

          const nameReg = new RegExp("name: \"(.*)\"");
          const name = req(key).default.match(nameReg)[1];

          const weightReg = new RegExp("weight: \"(.*)\"");
          let weight = req(key).default.match(weightReg);
          if(weight !== null){
            weight = parseInt(weight[1])
          }else {
            weight = 100
          }
          console.log(weight)

          const compReg = new RegExp("<template>\\r\\n(.*)\\r\\n</template>", 's');
          //console.log(req(key))
          comps.push({name, weight, component: req(key).default.match(compReg)[1]});
        }
      })
      this.examples = comps.sort((a, b) => a.weight - b.weight);
      //console.log(this.examples)
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
