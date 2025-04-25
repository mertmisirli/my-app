import React from 'react'
import slugify from '../../../utils/slugifyUtils';

function AddProject() {

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${process.env.REACT_APP_MEDIA_API_URL}/media/upload`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        const imageUrl = data.url;

        const textarea = document.getElementById('projectDescription');
        const currentValue = textarea.value;
        textarea.value = currentValue + `\n<img src="${imageUrl}" alt="image" style="max-width: 100%;"/>\n`;
    };

    // function slugify(str) {
    //     return str
    //         .toString()
    //         .normalize("NFD") // Türkçe karakter desteği için
    //         .replace(/[\u0300-\u036f]/g, "") // aksanları sil
    //         .replace(/ç/g, "c").replace(/ğ/g, "g")
    //         .replace(/ı/g, "i").replace(/ö/g, "o")
    //         .replace(/ş/g, "s").replace(/ü/g, "u")
    //         .replace(/[^a-zA-Z0-9\s-]/g, "") // özel karakterleri sil
    //         .trim()
    //         .replace(/\s+/g, "-")
    //         .toLowerCase();
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = document.getElementById('projectTitle').value;
        const description = document.getElementById('projectDescription').value;

        const response = await fetch(`${process.env.REACT_APP_BLOG_API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                title : title, 
                slug : slugify(title), // slugify the title,
                description : description,
            })
        });

        if (response.ok) {
            alert('Project added successfully!');
        } else {
            alert('Failed to add project.');
        }
    }

    return (
        <>
            <div className="container mt-3">
                <div className="row p-3 align-items-center justify-content-between mb-3 rounded" style={{ backgroundColor: 'grey' }}>
                    <div className="col-auto">
                        <h4 className="mb-0">Add Project</h4>
                    </div>

                </div>


                <form className="p-3" style={{ backgroundColor: 'white', borderRadius: '16px' }}>
                    <div className="mb-3">
                        <label htmlFor="projectTitle" className="form-label">Project Title</label>
                        <input type="text" className="form-control" id="projectTitle" placeholder='Project Title' />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="projectDescription" className="form-label">Project Description</label>

                        <div className="d-flex justify-content-between mb-2">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => document.getElementById('imageInput').click()}
                            >
                                Görsel Ekle
                            </button>
                        </div>

                        <textarea
                            className="form-control"
                            id="projectDescription"
                            rows="6"
                        ></textarea>

                        <input
                            type="file"
                            accept="image/*"
                            id="imageInput"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                    </div>

                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddProject
