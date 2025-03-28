import * as path from "path";
import { Process } from "./module_builder/Process";
import { IPCCallback } from "./module_builder/IPCObjects";
import { Setting } from "./module_builder/Setting";


export class SampleModuleProcess extends Process {

    private static readonly MODULE_NAME: string = "Sample Module";
    private static readonly MODULE_ID: string = "developer.Sample_Module";
    private static readonly HTML_PATH: string = path.join(__dirname, "./{SampleModule}HTML.html");


    /**
     *  The constructor. Should not directly be called, 
     *      and should not contain logic relevant to the renderer.
     */
    public constructor(ipcCallback: IPCCallback) {
        super(
            SampleModuleProcess.MODULE_ID,
            SampleModuleProcess.MODULE_NAME,
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