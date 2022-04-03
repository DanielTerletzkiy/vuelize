<template>
  <DWrapper :classes="['d-text-field', classesObject]" v-bind="{...$props, ...$attrs}"
            :style="textFieldStylesObject"
            @mouseenter="()=> this.hover = true" @mouseleave="()=> this.hover = false">
    <div class="d-text-field__prefix">
      <slot name="prefix"/>
    </div>
    <component v-if="componentType !== 'input'" :is="componentType" v-bind="{...$props, ...$attrs}" :id="instance.uid"
               class="d-text-field__input"
               :placeholder="placeholderActive ? placeholder : ' '"
               :value="modelValue" @input="onInput"
               @removeFocus="removeFocus"
               @focusin="()=>this.selected = true" @focusout="()=>this.selected = false">
      <template v-if="componentType !== 'input'" slot="label" slot-scope="props">
        <slot name="label" v-bind="props"></slot>
      </template>
      <template v-if="componentType !== 'input'" slot="item" slot-scope="props">
        <slot name="item" v-bind="props"></slot>
      </template>
    </component>
    <input v-else v-bind="{...$props, ...$attrs}" :id="instance.uid"
           class="d-text-field__input"
           :placeholder="placeholderActive ? placeholder : ' '"
           :value="modelValue" @input="onInput"
           @keyup.enter="$emit('enter')"
           @removeFocus="removeFocus"
           @focusin="()=>this.selected = true" @focusout="()=>this.selected = false"/>
    <label v-if="label && !solo" :for="instance.uid" class="d-text-field__label" :class="labelClassesObject">{{
        label
      }}</label>
    <div class="d-text-field__suffix">
      <slot name="suffix"/>
    </div>
  </DWrapper>
</template>

<script setup lang="ts">
import DSelect from "@/components/textfield/variant/Select.vue";
import DAutocomplete from "@/components/textfield/variant/Autocomplete.vue";
import {computed, inject, onMounted, ref} from "vue";
import defaultProps from "../../mixins/DefaultProps";
import {getCurrentInstance} from 'vue';
import DWrapper from "../DWrapper.vue";


const instance: any = getCurrentInstance();
const vuelize: any = inject('vuelize');

const emit = defineEmits(['update:modelValue', 'enter']);
const props = defineProps({
  autocomplete: {type: Boolean},
  filled: {type: Boolean},
  fullWidth: {type: Boolean},
  solo: {type: Boolean},
  label: {type: String},
  placeholder: {type: String, default: ''},
  select: {type: Boolean},
  modelValue: {type: [String, Object]},
  ...defaultProps
});

const hover = ref(false);
const selected = ref(false);

const placeholderActive = !!props.placeholder && !props.modelValue;

const classesObject = computed(() => {
  return {
    'd-text-field--active': (hover.value || selected.value),
    'd-text-field--placeholder': placeholderActive,
    'd-text-field--outlined outlined depressed elevation': props.outlined,
    'd-text-field--filled glow glow--active': props.filled,
    'd-text-field--solo': props.solo,
  }
});

const componentType = computed(() => {
  if (props.select) {
    return 'd-select'
  } else if (props.autocomplete) {
    return 'd-autocomplete'
  } else {
    return 'input'
  }
})

const labelClassesObject = computed(() => {
  return {
    'd-text-field--filled': props.filled,
  }
});

const textFieldStylesObject = computed(() => {
  return {
    color: (hover.value || selected.value) ? vuelize.getColor(props.color, props.tint) : null,
    caretColor: (hover.value || selected.value) ? vuelize.getColor(props.color, props.tint) : null,
    width: props.width,
    'min-width': props.fullWidth ? '100%' : 'unset',
  }
});


onMounted(() => {
  hover.value = false;
  selected.value = false;

  instance.proxy.$forceUpdate();
});

function onInput(e: { target: HTMLInputElement }) {
  emit('update:modelValue', typeof e === 'object' ? e.target.value : e)
}

function removeFocus() {
  hover.value = false;
  selected.value = false;
  //@ts-ignore
  document.activeElement.blur();
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-text-field {
  position: relative;
  width: 250px;
  height: 3rem;
  caret-color: currentColor;
  transition-duration: 0.15s;
  display: flex;
  align-items: center;

  &__input, :deep(.d-text-field__input__autocomplete) {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: inherit;
    font-family: inherit;
    font-size: inherit;
    outline: none;
    padding: 0 1.25em;
    background: none;
    align-items: center;

    color: currentColor;
    caret-color: inherit;

    transition-duration: 0.2s;
    transition-timing-function: ease-in;
  }

  &__label {
    border-radius: 50px 50px 0 0;
    position: absolute;
    left: 1rem;
    top: 0.8rem;
    margin: 0 0.5rem;
    cursor: text;
    transition-duration: 0.2s;
    background: inherit;
    height: 10px;
  }

  &__prefix {
    position: relative;
    left: 0.7rem;
    font-size: 20px;
  }

  &__suffix {
    position: relative;
    right: 0.7rem;
    font-size: 20px;
  }

  &--outlined {
    background: inherit;
    box-shadow: none;

    &.d-text-field--active {
      outline: solid 1.8px currentColor !important;
      border-color: currentColor;
    }

    &:focus-within::before {
      transition-duration: 0.2s;
    }
  }

  &--filled {
    &.glow--active:not(:hover):not(.d-text-field--active)::before {
      opacity: 0.05 !important;
    }

    height: 3.6rem;

    .d-text-field__label {
      height: auto;
      top: 1rem;
      font-size: 1.2rem;
    }

    .d-text-field__input {
      padding-top: 12px !important;
      padding-bottom: 0 !important;
      padding-left: 1.2em;
      padding-right: 1.2em;
    }

    &:not(.d-text-field--solo) {

      .d-text-field__prefix {
        padding-top: 12px;
      }

      .d-text-field__suffix {
        padding-top: 12px;
      }
    }
  }

  &--solo {
    height: 3rem !important;

    .d-text-field__input {
      padding: 0 1.25em !important;
    }

    .d-text-field__label {
      display: none;
    }
  }

  &.d-text-field--filled.d-text-field--outlined label {
    background: none !important;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    border-radius: inherit;
  }

  &.dark {
    .d-text-field__input {
      color: $dark_card_text;
    }
  }

  &.light {
    .d-text-field__input {
      color: $light_card_text;
    }
  }
}

.d-text-field__input:focus ~ .d-text-field__label, .d-text-field--placeholder .d-text-field__input ~ .d-text-field__label,
.d-text-field__input:not(:placeholder-shown).d-text-field__input:not(:focus) ~ .d-text-field__label {

  font-size: 0.9rem;
  padding: 0 0.3rem;
  top: -0.485rem;
  left: 0.4rem;

  &.d-text-field--filled {
    top: 0.2rem !important;
  }
}

</style>
