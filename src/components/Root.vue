<template>
  <div class="d-root" id="root" :class="themeMode">
    <d-notification-wrapper/>
    <header style="position: sticky; top: 0; width: 100%; max-height: 54px; z-index: 10;">
      <slot name="toolbar"></slot>
    </header>
    <div style="display: flex;">
      <aside>
        <slot name="navbar"></slot>
      </aside>
      <main style="flex: 1;" class="pa-3">
        <slot name="main"></slot>
      </main>
    </div>
    <footer>
      <slot name="footer"></slot>
    </footer>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "d-root",

  data: () => ({
    themeMode: 'theme--light'
  }),

  watch: {
    '$vuelize.theme.dark'() {
      this.themeMode = this.$vuelize.theme.dark ? 'theme--dark' : 'theme--light'
    }
  },

  mounted() {
    this.themeMode = this.$vuelize.theme.dark ? 'theme--dark' : 'theme--light'
  },

  methods: {
    shadeColor(color, percent) {

      let R = parseInt(color.substring(1, 3), 16);
      let G = parseInt(color.substring(3, 5), 16);
      let B = parseInt(color.substring(5, 7), 16);

      R = parseInt(R * (100 + percent) / 100);
      G = parseInt(G * (100 + percent) / 100);
      B = parseInt(B * (100 + percent) / 100);

      R = (R < 255) ? R : 255;
      G = (G < 255) ? G : 255;
      B = (B < 255) ? B : 255;

      const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
      const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
      const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

      return "#" + RR + GG + BB;
    },
    createStyle(attr) {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = attr;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  },
}
</script>

<style lang="scss">
@import "../styles/index";
</style>
