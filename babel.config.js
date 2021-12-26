const devPresets = ["@babel/preset-env"];
const buildPresets = ['@babel/preset-env'];

const devPlugins = ["@babel/plugin-transform-runtime"]
module.exports = {
    presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
    plugins: (process.env.NODE_ENV === 'development' ? devPlugins : [])
};
