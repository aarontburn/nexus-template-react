module.exports = {
    excluded: ["electron.ts", "./renderer/react-wrapper"],
    included: ["./renderer/react-wrapper/react_module"],
    build: {
        name: "Sample React Module",
        id: "developer.Sample_React_Module",
        process: "./process/main.js",
        replace: [
            {
                from: "{EXPORTED_MODULE_ID}",
                to: "%id%",
                at: ["./process/main.ts", "./renderer/renderer.ts"]
            },
            {
                from: "{EXPORTED_MODULE_NAME}",
                to: "%name%",
                at: ["./process/main.ts", "./module-info.json"]
            }
        ]
    }
}