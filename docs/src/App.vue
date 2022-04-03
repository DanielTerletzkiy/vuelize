<script setup lang="ts">
import DRoot from "../../src/components/DRoot.vue";
import DToolbar from "../../src/components/app/toolbar/DToolbar.vue";
import DCardTitle from "../../src/components/card/text/DCardTitle.vue";
import DButton from "../../src/components/button/DButton.vue";
import Demo from "./components/Demo.vue";
</script>

<template>
  <DRoot>
    <template v-slot:toolbar>
      <DToolbar show-hamburger>
        <DCardTitle color="primary" class="font-size-medium">
          Vuelize
        </DCardTitle>
      </DToolbar>
    </template>
    <Demo name="DButton" v-slot:default="props">
      <DButton color="primary" glow v-bind="props?.activeProps">
        This is a Button
      </DButton>
    </Demo>
    <Demo name="DCard" v-slot:default="props">
      <DCard outlined v-bind="props?.activeProps">
        This is a Card
      </DCard>
    </Demo>
    <Demo name="DCheckbox" v-slot:default="props">
      <DCheckbox v-bind="props?.activeProps">
        This is a Checkbox
      </DCheckbox>
    </Demo>
  </DRoot>
</template>

<style>

</style>
