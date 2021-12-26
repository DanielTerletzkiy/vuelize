const devPresets = ["@vue/cli-plugin-babel/preset", {
    "useBuiltIns": false,
}];
const buildPresets = ['@babel/preset-env'];
module.exports = {
    presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
};
