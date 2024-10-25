import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Add.css'

function EditArticle() {
    const { id } = useParams();  // Récupère l'id de l'article depuis l'URL
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    // Récupère les données de l'article actuel
    useEffect(() => {
        async function fetchArticle() {
            const response = await fetch(`http://localhost:4000/api/article/${id}`);
            const data = await response.json();
            setTitle(data.title);
            setContent(data.content);
        }
        fetchArticle();
    }, [id]);

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/api/article/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });
            if (response.ok) {
                navigate('/'); // Redirige vers la page d'accueil après modification
            } else {
                console.error('Erreur lors de la modification de l\'article');
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div>
            <h2 className='articleH2'>Modifier</h2>
            <form className='articleForm' onSubmit={handleSubmit}>
                <div className="articleTitre">
                    <input 
                        className="inputField"
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="articleContenu">
                    <textarea 
                        className="textArea"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button className='submitButton' type="submit">Modifier</button>
            </form>
        </div>
    );
}    

export default EditArticle;
