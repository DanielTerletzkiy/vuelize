<template>
  <div style="padding: 24px">
    <d-card class="rounded-lg elevation">
      <d-checkbox size="24" on-icon="sunset" off-icon="moonset" v-model="$store.state.theme.dark">
        Darkmode
      </d-checkbox>

      <d-card-title class="font-size-small">Hello, this is a test ;)</d-card-title>
      <d-card-title class="font-size-medium">Hello, this is a test ;)</d-card-title>
      <d-card-title class="font-size-large font-weight-light" color="primary">Hello, this is a test ;)</d-card-title>

      <d-card color="error" class="rounded-lg" block>
        <d-card-title color="white">
          <d-btn @click="openGithub">
            <d-icon name="github-alt"/>
            Github
          </d-btn>
        </d-card-title>
      </d-card>

      <div style="display: flex; gap: 8px; margin: 8px 0; flex-flow: row wrap;">
        <d-btn color="success" filled>
          <d-icon name="check"/>
          Success
        </d-btn>
        <d-btn color="error" filled>
          <d-icon name="exclamation-triangle"/>
          Error
        </d-btn>
        <d-btn color="warning" filled>
          <d-icon name="exclamation-octagon"/>
          Warning
        </d-btn>
        <d-btn color="info" filled>
          <d-icon name="info-circle"/>
          Info
        </d-btn>
      </div>

      <div style="display: flex; gap: 8px; margin: 8px 0; flex-flow: row wrap;">
        <d-btn color="success">
          <d-icon name="check"/>
          Success
        </d-btn>
        <d-btn color="error">
          <d-icon name="exclamation-triangle"/>
          Error
        </d-btn>
        <d-btn color="warning">
          <d-icon name="exclamation-octagon"/>
          Warning
        </d-btn>
        <d-btn color="info">
          <d-icon name="info-circle"/>
          Info
        </d-btn>
      </div>

      <d-btn color="primary" filled block @click="()=>this.$store.state.theme.themes.dark.primary = '#fafafa'">
        <d-icon name="angle-left" size="32"/>This is full width <d-icon name="angle-right" size="32"/>
      </d-btn>
    </d-card>
  </div>
</template>

<script>
import DCard from "@/components/card/Card";
import DCardTitle from "@/components/card/text/CardTitle";
import DBtn from "@/components/button/Button";
import DIcon from "@/components/icon/Icon";
import DCheckbox from "@/components/checkbox/Checkbox";

export default {
  name: 'HelloWorld',
  components: {DCheckbox, DIcon, DBtn, DCard, DCardTitle},
  props: {
    msg: String
  },

  methods: {
    openGithub() {
      window.open('https://github.com/DanielTerletzkiy/vue-materialize')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
