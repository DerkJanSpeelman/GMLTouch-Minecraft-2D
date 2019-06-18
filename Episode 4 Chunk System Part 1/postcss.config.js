module.exports = () => ({
    plugins: [
        require('stylelint')({
            configFile: '.stylelintrc',
        }),
        require('autoprefixer'),
    ],
});