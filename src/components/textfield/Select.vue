<template>
  <div @input="(e)=>$emit('input',e)" v-bind="{...$props, ...$attrs}" @focusin="$emit('focusin')"
       @focusout="$emit('focusout')" @click="dropdownOpen = !dropdownOpen">
    {{$attrs.value}}
    <d-card v-if="dropdownOpen" class="d-text-field__input__dropdown" elevation outlined depressed>
      <d-list v-model="$attrs.value" color="primary">
        <d-list-item v-for="i in 10" :key="i">
          {{ i }}
        </d-list-item>
      </d-list>
    </d-card>
  </div>
</template>

<script>
import DCard from "@/components/card/Card";
import DList from "@/components/list/List";
import DListItem from "@/components/list/ListItem";

export default {
  name: "d-select",
  components: {DListItem, DList, DCard},

  data: () => ({
    dropdownOpen: false
  }),
}
</script>

<style scoped lang="scss">
.d-text-field__input {
  position: relative;
  padding: inherit;

  &__dropdown {
    position: absolute;
    box-sizing: inherit;
    width: 100%;
    top: 54px;
    left: 0;
  }
}
</style>
