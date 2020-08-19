const plugins = [
    [
        require.resolve('babel-plugin-module-resolver'),
        {
            root: ["./"],
            alias: {
                "server_property" : "./server_property"
            }
        }
    ]
];