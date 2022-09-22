<template>
  <d-card block>
    <d-row align="unset">
      <d-column block outlined class="ma-2">
        <d-card-title>
          {{ name }}
        </d-card-title>
        <d-divider/>
        <d-column class="pa-4" block style="justify-content: center; position: relative" v-if="activeProps">
          <slot :activeProps="activeProps"></slot>
        </d-column>
      </d-column>
      <d-column gap block elevation="2" class="ma-2">
        <d-card-subtitle class="font-size-medium">
          Props
        </d-card-subtitle>
        <d-column gap>
          <d-column gap v-for="type in ['Boolean', 'String', 'Number','Array']">
            <d-row gap>
              <d-card-subtitle class="pa-0 font-weight-bold" color="primary" tint="40">{{ type }}</d-card-subtitle>
              type
              <d-divider block elevation="20"/>
            </d-row>
            <d-row v-for="prop in getUniqueProps(type)">
              <d-checkbox v-model="activeProps[prop.name]" v-if="prop.type.name === 'Boolean'" color="primary"
                          size="24" off-icon="times" on-icon="smile-beam"
                          style="text-transform: capitalize">
                {{ prop.name }}
              </d-checkbox>
              <d-textfield v-model="activeProps[prop.name]"
                           v-if="prop.type.name !== 'Boolean' && prop.type.name === type" full-width filled solo
                           color="primary" :placeholder="prop.name.charAt(0).toUpperCase() + prop.name.slice(1)"/>
            </d-row>
          </d-column>
        </d-column>
        <d-spacer/>
        <d-accordion v-model="accordion" header-color="primary" elevation="3" width="100%">
          <template v-slot:header>
            Default Props
          </template>
          <template v-slot:content>
            <d-column gap>
              <d-column gap v-for="type in ['Boolean', 'String', 'Number']">
                <d-row gap>
                  <d-card-subtitle class="pa-0 font-weight-bold" color="primary" tint="40">{{ type }}</d-card-subtitle>
                  type
                  <d-divider block elevation="20"/>
                </d-row>
                <d-row v-for="prop in getDefaultProps(type)">
                  <d-checkbox v-model="activeProps[prop.name]" v-if="prop.type.name === 'Boolean'" color="primary"
                              size="24" off-icon="times" on-icon="smile-beam"
                              style="text-transform: capitalize">
                    {{ prop.name }}
                  </d-checkbox>
                  <d-textfield v-model="activeProps[prop.name]"
                               v-if="prop.type.name !== 'Boolean' && prop.type.name === type" full-width filled solo
                               color="primary" :placeholder="prop.name.charAt(0).toUpperCase() + prop.name.slice(1)"/>
                </d-row>
              </d-column>
            </d-column>
          </template>
        </d-accordion>
      </d-column>
    </d-row>
  </d-card>
</template>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({ wrapper });
import DRow from '../../../src/components/flex/DRow.vue'
import DColumn from '../../../src/components/flex/DColumn.vue'
import DSpacer from '../../../src/components/flex/DSpacer.vue'
import DAccordion from '../../../src/components/accordion/DAccordion.vue'
import DCheckbox from '../../../src/components/checkbox/DCheckbox.vue'
import DTextfield from '../../../src/components/textfield/DTextfield.vue'
import DDivider from '../../../src/components/divider/DDivider.vue'
import DCard from '../../../src/components/card/DCard.vue'
import DCardTitle from '../../../src/components/card/text/DCardTitle.vue'
import DCardSubtitle from '../../../src/components/card/text/DCardSubtitle.vue'
import DefaultProps from '../../../src/mixins/DefaultProps'
import {getCurrentInstance, reactive, ref} from "vue";

const instance: any = getCurrentInstance()
console.log(instance.slots.default())
const availableProps = instance.slots.default()[0].type.props;
const activeProps = reactive(instance.slots.default()[0].props || {});

for (const key in availableProps) {
  const prop = availableProps[key];
  if (prop.default) {
    console.log(key, prop.default, activeProps)
    activeProps[key] = prop.default
  }
}

let uniqueProps = Object.keys(availableProps).filter(function (obj: string) {
  return Object.keys(DefaultProps).indexOf(obj) == -1;
});
console.log(uniqueProps)

const accordion = ref(false)

const props = defineProps({
  name: {type: String, required: true},
})

const getUniqueProps = (type: string) => {
  const props: any = availableProps;
  return Object.keys(props).filter(x => Array.isArray(props[x].type) ?
      props[x].type.find((y: any) => y.name === type) :
      props[x].type.name === type && uniqueProps.indexOf(x) > -1).map(x => {
    return {...props[x], name: x}
  })
}

const getDefaultProps = (type: string) => {
  const props: any = DefaultProps;
  return Object.keys(props).filter(x => Array.isArray(props[x].type) ?
      props[x].type.find((y: any) => y.name === type) :
      props[x].type.name === type).map(x => {
    return {...props[x], name: x}
  })
}


</script>

<style scoped lang="scss">

</style>
