import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);

  // Upload assignment to AWS S3
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      await axios.post('http://localhost:5000/api/upload', formData);
      alert('File uploaded successfully!');
    } catch (err) {
      alert('Upload failed.');
    }
  };

  return (
    <div className="App">
      <h1>Student Study Platform</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload Assignment</button>
      </form>
    </div>
  );
}

export default App;
