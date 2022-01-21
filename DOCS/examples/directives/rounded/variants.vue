<template>
  <d-row gap>
    <d-card v-for="size in sizes" :key="size" elevation-dark="4" elevation-light="n4" outlined depressed width="100px"
            :height="size === 'pill'?'50px':'100px'"
            :rounded="size">
      <d-card-subtitle class="pa-3">{{ size }}</d-card-subtitle>
    </d-card>
  </d-row>
</template>

<script>
export default {
  name: "Variants",

  data: () => ({
    sizes: [
      'none',
      'md',
      'lg',
      'xl',
      'pill',
      'circle'
    ]
  })
}
</script>

<style scoped>

</style>
