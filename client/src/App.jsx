import { useEffect, useState } from 'react';
// useState stores the status and updates the page when it changes
// useEffect starts the request when the component mounts - keeps outside system synchronized

function App() {
  const [apiStatus, setApiStatus] = useState('Connecting...');

  useEffect(() => {
    async function checkApi() {
      try {
        const response = await fetch('/api/health');

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        setApiStatus(data.status);
      } catch (error) {
        console.error('API health check failed:', error);
        setApiStatus('Unable to connect');
      }
    }

    checkApi();
  }, []);

  return (
    <main>
      <h1>Applican</h1>
      <p>Your job search, organized.</p>
      <p>API status: {apiStatus}</p>
    </main>
  );
}

export default App;