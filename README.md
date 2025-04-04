
# Nexus: React Template
[@aarontburn](https://github.com/aarontburn)  
React template for [Nexus](https://github.com/aarontburn/nexus-core)

# Template Installation
To start, clone the template and do 
```
npm install
```
to install any required packages.

## Running the application
In the terminal, run the command:
```
npm start
```
This will initialize Nexus with the template module pre-installed.

## Initial Config
In the `src/` directory of the template, there is `export-config.js` and `module-info.json`. These files are important for configuring how your module is described and exported.

### `export-config.js`
You will need to modify two fields to change the name and ID of your module.
```
module.exports = {
	...
	build: {
		name: "Sample React Module",
		id: "developer.Sample_React_Module",
		...
	}
}
```
`name`: The display name of your module. 
`id`: The ID of your module. The ID **cannot contain white spaces or special characters (besides periods and underscores)**
>A good naming convention would be \<developerName>.\<moduleName>, using underscores for any white space.

More about this file can be found here. (TODO)

### `module-info.json`
This file is meant to describe your module. The only two fields you **should not** change are:

`name`: The name of the module. If this is set to the default value of `"{EXPORTED_MODULE_NAME}"`, it will automatically get replaced to the name set in `export-config.js`.

`build_version`: This is an internal counter that is updated when your module is updated. This is used when checking to recompile your module at runtime and modifying this may have unexpected side effects.

# Developing your Module
## Understanding Electron
As this platform is utilizes Electron, you must abide by some of their design principles, the main one being context-isolation and IPC. 

For safety reasons, Electron uses context-isolation to isolate the process and renderer. The process has full access to Node.js packages, but no access to the DOM. The renderer is the opposite; is no access to Node.js packages but full access to the DOM. This also means that you are unable to use `import` or `require` in the renderer.

In order to communicate between them, Electron offers [Inter-Process Communication (IPC)](https://www.electronjs.org/docs/latest/tutorial/ipc). It is important to understand what you can send, but the process to send and receive information has been streamlined in the code.

## Module Structure
Each module consists of a:
- **Process**: The back-end of your module. This **DOES NOT** have access to the DOM, but **DOES** have full access to Node packages.
> By default, this is `main.ts`

- **Renderer**: The front-end of your module. The **DOES** have access to the DOM but **DOES NOT** have access to Node packages.
> By default, this is `renderer.ts`

## Process Structure
The process file is the backend of your module. It has full access to Node packages. It does not have direct access to the frontend - you will need to communicate and send data to the frontend and do the updating there.

All `console.log()` will output to the terminal.

### Important Functions

#### `constructor()`
The constructor needs to pass the module ID, module name, and the path to the HTML file to `super()`. By omitting the HTML file, the module will be classified as an "internal" module and have no GUI.

**DO NOT** put logic that is relevant to to the front-end inside the constructor, as the front-end has not loaded yet. Instead, put initialization logic within the `initialize()` function, which (by default), is called when the front-end is ready.

#### `initialize()`
By default, this is called when the renderer (front-end) is loaded. Treat this as the entry point of your module. 

#### `handleEvent(eventType: string, data: any[])`
This is where you will receive events sent from the renderer. By default, the initialization event from the renderer is captured here.

`eventType: string` → The name of the event. Use a `switch-case` or `if`-statement to distinguish between events.  

`data: any[]` → Any data sent from the renderer. If no data is sent, will be an empty array.


#### `this.sendToRenderer(eventType: string, ...data: any[])`
This function is responsible for sending information to the renderer.

`eventType: string` → The name of the event.
`data: any[]` → Any data to be sent. See Electrons [Object Serialization](https://www.electronjs.org/docs/latest/tutorial/ipc#object-serialization) to verify if your data can be properly sent.

For more details about the process functions, see the [Process guide](https://github.com/aarontburn/modules-module-quickstart/blob/main/docs/Process.md).
	
## Renderer Structure 
When developing a module with React, the renderer structure changes. Most of your changes will be done within `/react-wrapper/`, where within it is a standard `Vite + React + TypeScript` web app.

During development, the React application 


 # Exporting your Module
After you finish developing your module, you will need to export it to distribute it. 

In the terminal, run the command:
```
npm run export
```
This will open a file dialog where you can choose the location to export your module. 

Assuming you followed the provided naming scheme, your module will be exported as `<moduleID>.zip` (for example, the Volume Controller is exported as `aarontburn.Volume_Controller.zip`)

That's it! Your module is exported. If you utilized any dependencies, they will automatically be bundled into your exported module inside the `node_modules` folder, including all parent dependencies. You can now distribute this archive file.
