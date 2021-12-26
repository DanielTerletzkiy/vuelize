const devPresets = ["@babel/preset-env", {
    "useBuiltIns": false,
}];
const buildPresets = ['@babel/preset-env'];
module.exports = {
    presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
};
