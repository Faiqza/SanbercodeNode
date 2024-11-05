// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const resultDiv = document.getElementById('result');
  
    // Event listener for the "Fetch /hello" button
    document.getElementById('fetchHello').addEventListener('click', async () => {
      try {
        const response = await fetch('/hello');
        const data = await response.json();
        resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
      } catch (error) {
        resultDiv.innerHTML = `<p>Error fetching /hello: ${error}</p>`;
      }
    });
  
    // Event listener for the "Fetch /user" button
    document.getElementById('fetchUser').addEventListener('click', async () => {
      try {
        const response = await fetch('/user');
        const data = await response.json();
        resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
      } catch (error) {
        resultDiv.innerHTML = `<p>Error fetching /user: ${error}</p>`;
      }
    });
  });
  
