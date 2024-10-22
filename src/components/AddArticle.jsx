import React, { useState } from 'react'
import '../styles/Add.css'
import { useNavigate } from 'react-router-dom';

function AddArticle () {
        // Déclaration des états pour le titre et le contenu
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');
        const navigate = useNavigate(); // Initialiser useNavigate
      
        // Fonction pour gérer la soumission du formulaire
        const handleSubmit = async (e) => {
          e.preventDefault(); // Empêche le rechargement de la page
      
          // Logique pour soumettre les données, par exemple envoyer une requête POST à un serveur
          const newArticle = { title, content };
          console.log('Nouvel article : ', newArticle);

            // Création d'un objet d'article
            const article = {
            title,
            content
        };
      
          // Réinitialisation des champs après la soumission
          setTitle('');
          setContent('');

              // Envoi de la requête POST au backend
        try {
            const response = await fetch('http://localhost:4000/api/article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Spécifie le type de contenu
                },
                body: JSON.stringify(article), // Convertir l'objet article en JSON
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi de l\'article');
            }

            const result = await response.json(); // Si le backend renvoie des données
            console.log('Article envoyé avec succès:', result);
            // Rediriger vers la page principale
            navigate('/');
        } catch (error) {
            console.error('Erreur:', error);
        }
        };
      
        return (
          <form className='articleForm' onSubmit={handleSubmit}>
            <div className='articleTitre'>
              <input className='inputField'
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Met à jour l'état du titre
                placeholder="Entrez le titre de l'article"
              />
            </div>
      
            <div className='articleContenu'>
              <textarea className='textArea' rows="20" cols="33"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)} // Met à jour l'état du contenu
                placeholder="Entrez le contenu de l'article"
              />
            </div>
      
            <button className='submitButton' type="submit">Valider</button>
          </form>
        );
      }

      export default AddArticle