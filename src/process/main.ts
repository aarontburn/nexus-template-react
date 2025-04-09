import * as path from "path";
import { DataResponse, Process, Setting } from "@nexus/nexus-module-builder";
import { BooleanSetting } from "@nexus/nexus-module-builder/settings/types";

// These is replaced to the ID specified in export-config.js during export. DO NOT MODIFY.
const MODULE_ID: string = "{EXPORTED_MODULE_ID}";
const MODULE_NAME: string = "{EXPORTED_MODULE_NAME}";
// ---------------------------------------------------
const HTML_PATH: string = path.join(__dirname, "../renderer/index.html");
// const ICON_PATH: string = path.join(__dirname, "...");
const ICON_PATH: string = undefined;


export default class SampleProcess extends Process {

    /**
     *  The constructor. At this point, the renderer may not be fully initialized yet;
     *  therefor do not do any logic important to the renderer and 
     *  instead put that logic in initialize().
     * 
     *  @see initialize
     */
    public constructor() {
        super(MODULE_ID, MODULE_NAME, HTML_PATH, ICON_PATH);
    }

    /**
     *  The entry point of the module. Will be called once the 
     *      renderer sends the 'init' signal.
     */
    public initialize(): void {
        super.initialize(); // This should be called.

        this.refreshAllSettings();
        // Request the accent color from the built-in 'Settings' module and send it to the renderer.
        this.requestExternal("built_ins.Settings", "getAccentColor").then((value: DataResponse) => {
            this.sendToRenderer("accent-color-changed", value.body)
        });
    }

    public async handleEvent(eventType: string, data: any[]): Promise<any> {
        switch (eventType) {
            // This is called when the renderer is ready to receive events.
            case "init": {
                this.initialize();
                break;
            }
            case "count": {
                console.info("Sample React App: Received 'count': " + data[0])
                break;
            }

            default: {
                console.info(`Sample React App: Unhandled event: eventType: ${eventType} | data: ${data}`);
                break;
            }
        }
    }

    public registerSettings(): (Setting<unknown> | string)[] {
        return [
            "Sample Setting Group",
            new BooleanSetting(this)
                .setDefault(false)
                .setName("Sample Toggle Setting")
                .setDescription("An example of a true/false setting.")
                .setAccessID('sample_bool'),

        ];
    }


    public refreshSettings(modifiedSetting: Setting<unknown>): void {
        if (modifiedSetting.getAccessID() === "sample_bool") {
            this.sendToRenderer('sample-setting', modifiedSetting.getValue());
        }
    }



}