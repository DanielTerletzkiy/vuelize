<script setup lang="ts">
import {nextTick, ref} from "vue";
import {useIntersectionObserver} from '@vueuse/core'

const props = defineProps({
    renderOnIdle: {type: Boolean},
    unRender: {type: Boolean},
    minHeight: {type: Number, default: 0},
    unRenderDelay: {
        type: Number,
        default: 10000,
    },
})

const target = ref<HTMLElement>();

const shouldRender = ref(false);
const fixedMinHeight = ref<number>(0);

let unRenderTimer: ReturnType<typeof setTimeout>;
let renderTimer: ReturnType<typeof setTimeout>;

const {stop} = useIntersectionObserver(target, ([{isIntersecting}]: Array<{ isIntersecting: boolean }>) => {
        if (isIntersecting) {
            clearTimeout(unRenderTimer);
            if (props.unRender) {
                renderTimer = setTimeout(
                    () => (shouldRender.value = true),
                    props.unRender ? 200 : 0
                );
            } else {
                shouldRender.value = true;
            }

            if (!props.unRender) {
                stop();
            }
        } else if (props.unRender) {
            // if the component was set to render, cancel that
            clearTimeout(renderTimer);
            unRenderTimer = setTimeout(() => {
                if (!target.value) {
                    return;
                }
                fixedMinHeight.value = target.value.clientHeight;
                shouldRender.value = false;
            }, props.unRenderDelay);
        }
    },
    {
        rootMargin: "600px",
    }
);
if (props.renderOnIdle) {
    onIdle(() => {
        shouldRender.value = true;
        if (!props.unRender) {
            stop();
        }
    });
}

function onIdle(cb = () => {}) {
    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(cb);
    } else {
        setTimeout(() => {
            nextTick(cb);
        }, 300);
    }
}

</script>
<template>
  <div
    ref="target"
    v-bind="{...$props, ...$attrs}"
    :style="`min-height:${fixedMinHeight ? fixedMinHeight : minHeight}px`"
  >
    <slot v-if="shouldRender" />
  </div>
</template>
