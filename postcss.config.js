module.exports = () => ({
    plugins: [
        require('stylelint')({
            configFile: '.stylelintrc',
        }),
        require('autoprefixer')({
            browsers: [
                '>=1%',
                'not ie 11',
                'not op_mini all',
            ],
        }),
    ],
});