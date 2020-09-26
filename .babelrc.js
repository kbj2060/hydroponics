const plugins = [
    [
        require.resolve('babel-plugin-module-resolver'),
        {
            root: ["./"],
            alias: {
                "CLIENT" : "./client/"
            }
        }
    ]
];

module.exports = {  plugins: [...plugins] }
