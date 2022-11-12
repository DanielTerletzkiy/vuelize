<script setup lang="ts">
import DRoot from "../../src/components/root/DRoot.vue";
import DToolbar from "../../src/components/app/toolbar/DToolbar.vue";
import DCardTitle from "../../src/components/card/text/DCardTitle.vue";
import DCard from "../../src/components/card/DCard.vue";
import DButton from "../../src/components/button/DButton.vue";
import DCheckbox from "../../src/components/checkbox/DCheckbox.vue";
import DDialog from "../../src/components/dialog/DDialog.vue";
import DDivider from "../../src/components/divider/DDivider.vue";
import DIcon from "../../src/components/icon/DIcon.vue";
import DImage from "../../src/components/image/DImage.vue";
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
    <Demo name="DDialog" v-slot:default="props">
      <DButton @click="props.activeProps.modelValue = true">
        Dialog trigger
      </DButton>
      <DDialog v-bind="props?.activeProps">
        <DCard width="500px" height="100px">
          <d-card-title>
          This is a Dialog
          </d-card-title>
        </DCard>
      </DDialog>
    </Demo>
    <Demo name="DDivider" v-slot:default="props">
      <DDivider v-bind="props?.activeProps"/>
    </Demo>
    <Demo name="DIcon" v-slot:default="props">
      <DIcon v-bind="props?.activeProps"/>
    </Demo>
    <Demo name="DImage" v-slot:default="props">
      <DImage v-bind="props?.activeProps"/>
    </Demo>
  </DRoot>
</template>

<style>

</style>
