import React, { useEffect, useState } from 'react'

function Projects() {
  const [openOptionsId, setOpenOptionsId] = useState(null);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProjects = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setProjects(data);
    setLoading(false);
    return data;
  }
  const deleteProject = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      alert('Project deleted successfully!');
    } else {
      alert('Failed to delete project.');
    }
  };


  const toggleOptionsForm = (id) => {
    setOpenOptionsId(openOptionsId === id ? null : id);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row p-3 align-items-center justify-content-between mb-3 rounded" style={{ backgroundColor: 'grey' }}>
          <div className="col-auto">
            <h4 className="mb-0">Projects</h4>
          </div>
          <div className="col-auto">
            <a href='/admin-panel/add-project' target="_blank"><button className="btn btn-light">Add</button></a>
          </div>
        </div>


        <div className="row">
          {projects.map((project) => (
            <div className="col-md-4 p-2" key={project.id} >
              <div className="card mb-4 shadow-sm" style={{ position: 'relative' }}>
                <img src={`http://localhost:7016${project.title}`} alt="" className="card-img-top" style={{ height: '200px', width: '400px' }} />
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.slug}</p>
                  <div
                    className="project-description"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />

                  {openOptionsId === project.id && (
                    <div className='card' style={{ position: 'absolute', top: '12%', right: '5%', backgroundColor: 'white', borderRadius: '16px', padding: '10px' }}>
                      <div className="action-menu" style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <button className="btn btn-primary">Edit</button>
                        <span><button className="btn btn-danger">Delete</button></span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  className='p-2'
                  onClick={() => toggleOptionsForm(project.id)}
                  style={{ position: 'absolute', top: '2%', right: '5%', fontSize: '15px', cursor: 'pointer' }}>:</button>
              </div>
            </div>
          ))}

          {/* Diğer makaleler için benzer kartlar */}
        </div>
      </div>
    </>
  )
}

export default Projects
