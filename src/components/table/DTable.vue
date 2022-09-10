<template>
  <DWrapper ref="wrapper" :classes="['d-table']" v-bind="{...$props, ...$attrs}" @click="$emit('click')"
            width="100%">
    <table style="width: 100%; border-radius: inherit">
      <tr style="border-radius: inherit">
        <th v-for="header in headers" :key="header.value" :colspan="header.colspan" :style="{width: header.width}"
            style="display: table-cell; border-radius: inherit" class="glow" @click="handleSorting(header.key)"
            v-ripple>
          <DRow>
            <slot :name="`header(${header.key})`" :value="header.value" :key="header.key" :type="header.type"
                  :params="header.params"
                  :color="header.color">
              <DCardSubtitle :color="header.color">
                {{ header.value }}
              </DCardSubtitle>
            </slot>
            <DIcon v-if="sort.key === header.key" :name="sortIcon"/>
          </DRow>
        </th>
      </tr>
      <tr>
        <td :colspan="headers.length">
          <DDivider block width="100%"/>
        </td>
      </tr>
      <tr v-for="(row, r) in visibleData" :key="r" @click="$emit(`rowClick`, r)">
        <td v-for="(cell, c) in row" :key="r+c" :colspan="cell.colspan" @click="$emit(`cellClick`, c)">
          <slot :name="`data(${cell.key})`" :value="cell.value" :key="cell.key" :type="cell.type"
                :params="cell.params"
                :row="r"
                :color="cell.color">
            <DCardSubtitle :color="cell.color">
              {{ cell.value }}
            </DCardSubtitle>
          </slot>
        </td>
      </tr>
    </table>
    <DDivider v-if="paginationAvailable" block width="100%"/>
    <DRow v-if="paginationAvailable" class="pa-2" block>
      <DSpacer/>
      <DPagination v-model="currentPage" :color="color||'primary'" :size="24" rounded="md" :total="pages"/>
    </DRow>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DTable',
}
</script>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({ wrapper });
import defaultProps from "../../mixins/DefaultProps";
import DWrapper from "../DWrapper.vue";
import DCardSubtitle from "../card/text/DCardSubtitle.vue";
import DDivider from "../divider/DDivider.vue";
import DPagination from "../pagination/DPagination.vue";
import DRow from "../flex/DRow.vue";
import DSpacer from "../flex/DSpacer.vue";
import {computed, reactive, ref} from "vue";
import DIcon from "../icon/DIcon.vue";

const emit = defineEmits(['click']);

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  visibleItems: {
    type: Number,
    default: -1
  },
  ...defaultProps
})

const currentPage = ref(1);

const sort = reactive({
  // @ts-ignore
  key: props.headers[0].key,
  reverse: true,
})

const sortIcon = computed(() => {
  return sort.reverse ? 'angle-down' : 'angle-up'
})

function handleSorting(key: string) {
  if (sort.key === key) {
    sort.reverse = !sort.reverse;
  } else {
    sort.reverse = true;
    sort.key = key;
  }
}

const visibleData = computed(() => {
  const result = props.data.sort(
      (a: any, b: any) => {
        return sort.reverse ?
            a.find((e: any) => e.key === sort.key).value
                .localeCompare(b.find((e: any) => e.key === sort.key).value, undefined, {numeric: true}) :
            b.find((e: any) => e.key === sort.key).value
                .localeCompare(a.find((e: any) => e.key === sort.key).value, undefined, {numeric: true});
      })
  if (paginationAvailable.value) {
    return result.slice((currentPage.value - 1) * props.visibleItems, currentPage.value * props.visibleItems)
  }
  return result;
})

const pages = computed(() => {
  return Math.ceil(props.data.length / props.visibleItems);
})

const paginationAvailable = computed(() => {
  return props.visibleItems > -1
})
</script>

<style scoped lang="scss">

</style>
