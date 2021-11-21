<template>
  <div style="padding: 40px">
    <d-card class="rounded-lg">
      <input type="checkbox" v-model="$store.state.theme.dark"/>
      <d-card-title class="font-size-small">Hello, this is a test ;)</d-card-title>
      <d-card-title class="font-size-medium">Hello, this is a test ;)</d-card-title>
      <d-card-title class="font-size-large font-weight-light" color="error">Hello, this is a test ;)</d-card-title>

      <div style="display: flex; gap: 4px; margin-bottom: 4px">
        <d-btn color="success">
          <d-icon name="check"/>
          Holo Success
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

      <div style="display: flex; gap: 4px; margin-top: 4px">
        <d-btn color="success" filled>
          <d-icon name="check"/>
          Filled Success
        </d-btn>
        <d-btn color="error" filled>
          <d-icon name="exclamation-triangle"/>
          Filled Error
        </d-btn>
        <d-btn color="warning" filled>
          <d-icon name="exclamation-octagon"/>
          Filled Warning
        </d-btn>
        <d-btn color="info" filled>
          <d-icon name="info-circle"/>
          Filled Info
        </d-btn>
      </div>
    </d-card>

    <d-card class="rounded-xl" style="margin-top: 8px">
      <d-card-title class="font-size-small font-weight-thicc" color="primary">Hello, this is a test ;)</d-card-title>
      <d-card-title class="font-size-medium font-weight-medium">Hello, this is a test ;)</d-card-title>
      <d-card-title class="font-size-large font-weight-light">Hello, this is a test ;)</d-card-title>
    </d-card>
  </div>
</template>

<script>
import DCard from "@/components/card/Card";
import DCardTitle from "@/components/card/text/CardTitle";
import DBtn from "@/components/button/Button";
import DIcon from "@/components/icon/Icon";

export default {
  name: 'HelloWorld',
  components: {DIcon, DBtn, DCard, DCardTitle},
  props: {
    msg: String
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
