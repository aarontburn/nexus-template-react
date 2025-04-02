import * as path from "path";
import { Process, Setting } from "@nexus/nexus-module-builder";

// These is replaced to the ID specified in export-config.js during export. DO NOT MODIFY.
const MODULE_ID: string = "{EXPORTED_MODULE_ID}";
const MODULE_NAME: string = "{EXPORTED_MODULE_NAME}";
// ---------------------------------------------------
const HTML_PATH: string = path.join(__dirname, "../renderer/index.html");


export default class SampleProcess extends Process {

    /**
     *  The constructor. Should not directly be called, 
     *      and should not contain logic relevant to the renderer.
     */
    public constructor() {
        super(MODULE_ID, MODULE_NAME, HTML_PATH);
    }

    /**
     *  The entry point of the module. Will be called once the 
     *      renderer sends the 'init' signal.
     */
    public initialize(): void {
        super.initialize(); // This should be called.

    }


    public registerSettings(): (Setting<unknown> | string)[] {
        return []
    }


    public refreshSettings(modifiedSetting: Setting<unknown>): void {


    }


    public async handleEvent(eventType: string, data: any[]): Promise<any> {
        switch (eventType) {
            case "init": {
                this.initialize();
                break;
            }

            default: {
            }
        }
    }

}