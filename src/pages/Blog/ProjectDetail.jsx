import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProjectDetail() {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const getProject = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/Projects/${id}`);
            if (!response.ok) throw new Error("Project not found.");
            const data = await response.json();
            setProject(data);
        } catch (err) {
            console.error('Error fetching project:', err);
            setError("Unable to load project. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProject();
    }, [id]);

    return (
        <div className="container py-4">
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-3">Loading project...</p>
                </div>
            ) : error ? (
                <div className="alert alert-danger text-center">{error}</div>
            ) : (
                <>
                    <div className="bg-light p-4 rounded shadow-sm mb-4">
                        <h2 className="mb-0">{project.title}</h2>
                        <small className="text-muted">
                            {new Date(project.projectDate).toLocaleDateString()}
                        </small>
                    </div>

                    <div className="project-description p-3 bg-white rounded shadow-sm">
                        <div
                            dangerouslySetInnerHTML={{ __html: project.description }}
                        />
                    </div>

                    {project.projectImgs?.length > 0 && (
                        <div className="mt-4">
                            <h5>Project Images</h5>
                            <div className="row">
                                {project.projectImgs.map((img, i) => (
                                    <div className="col-md-3 mb-3" key={i}>
                                        <img
                                            src={img.startsWith("http") ? img : `https://localhost:7100${img}`}
                                            alt={`Project Image ${i + 1}`}
                                            className="img-fluid rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ProjectDetail;
