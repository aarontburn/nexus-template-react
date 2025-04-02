import { useEffect, useState } from 'react'
import './App.css'
import { addProcessListener, removeProcessListener, sendToProcess } from './ModulesBridge';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const func = addProcessListener((eventType: string, data: any[]) => {
            switch (eventType) {
                default: {
                    console.log("Uncaught message: " + eventType + " | " + data)
                    break;
                }
            }
        });
        sendToProcess("init");

        return () => {
            removeProcessListener(func);
        }
    }, []);


    return (
        <>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    )
}

export default App
