import * as path from "path";
import { IPCCallback, Process, Setting } from "@nexus/nexus-module-builder";

const MODULE_NAME: string = "{EXPORTED_MODULE_NAME}";
const MODULE_ID: string = "{EXPORTED_MODULE_ID}";



export default class SampleModuleProcess extends Process {

    private static readonly HTML_PATH: string = path.join(__dirname, "../renderer/index.html");


    /**
     *  The constructor. Should not directly be called, 
     *      and should not contain logic relevant to the renderer.
     */
    public constructor(ipcCallback: IPCCallback) {
        super(
            MODULE_ID,
            MODULE_NAME,
            SampleModuleProcess.HTML_PATH,
            ipcCallback);


    }

    /**
     *  The entry point of the module. Will be called once the 
     *      renderer sends the 'init' signal.
     */
    public initialize(): void {
        super.initialize(); // This should be called.

    }


    public registerSettings(): (Setting<unknown> | string)[] {
        return [
            
 
        ]
    }


    public refreshSettings(modifiedSetting: Setting<unknown>): void {


    }


    public async handleEvent(eventType: string, data: any): Promise<any> {
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