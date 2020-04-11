import React, { useState, useEffect } from 'react';
import api from './services/api';

import Header from './components/Header';
import './App.css';



function App() {
  const [projects, setProject] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProject(response.data);
      console.log(response);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: "Bruno Marques"
    });
    const project = response.data;
    setProject([...projects,project]);   
    
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>
      <button type="button" onClick={handleAddProject} >Add Project</button>
    </>
  );
}

export default App;
