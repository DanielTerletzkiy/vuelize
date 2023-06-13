<script setup lang="ts">
import VButton from "./components/VButton.vue";
import {GeneralColor} from "./composables/color.ts";
import VCard from "./components/VCard.vue";
import VToolbar from "./components/VToolbar.vue";
</script>

<template>
  <div>
    <v-toolbar>
      yooo
    </v-toolbar>

    <v-card class="m-32">
      <template v-slot:header>
        This is a header
      </template>
      Lorem Ipsum bla bla
      <template v-slot:actions>
        <v-button :color="GeneralColor.Primary">
          Lol
        </v-button>
      </template>
    </v-card>
  </div>
</template>

<style scoped>

</style>
