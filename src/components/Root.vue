<template>
  <div class="d-root">
    <slot/>
  </div>
</template>

<script>
import jss from "jss";
import jssPluginNested from 'jss-plugin-nested'
jss.use(jssPluginNested())

import preset from 'jss-preset-default'

// One time setup with default plugins and settings.
jss.setup(preset())
export default {
  name: "d-root",

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
    createStyle(attr){
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = attr;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  },

  mounted() {
    /*TODO

    let styles = {};
    //['dark','light'].forEach(themeKey => {
    const theme = this.$store.state.theme.themes[this.$store.state.theme.dark ? 'dark' : 'light']
    Object.keys(theme).forEach(key => {
      console.log(key, theme[key]);

      styles[key] = {
        color: theme[key],
        'caret-color': theme[key],
      };

      ['lighten', 'darken'].forEach(param => {
        for (let amount = 1; amount < 6; amount++) {
          const color = this.shadeColor(theme[key], (param === 'darken' ? (amount * -1) : (amount)) * 10 )
          styles[key][`&.${param}-${amount}`] = {
            color: color,
            'caret-color': color,
          };
        }
      })
    })
    //})

    console.log(styles)

    jss.createStyleSheet(styles).attach()
*/
  }
}
</script>

<style scoped>

</style>
