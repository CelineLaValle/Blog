import React, { useEffect, useState } from 'react'
import '../styles/Accueil.css'
import { Link } from 'react-router-dom'
import Pagination from './Pagination';

function AccueilPage() {

  const [articles, setArticles] = useState([])  
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;



  // Fonction qui retourne les articles
  async function getWorks() {

    const response = await fetch('http://localhost:4000/api/article');
    const data = await response.json();
    setArticles(data);
    if (!response.ok) {
      throw new Error('Erreur de serveur: ${response.status}');
    }
  }

  useEffect(() => {
    getWorks();
  }, []);

    // Calcul des articles actuels
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(articles.length / articlesPerPage);
  
    // Gestion de la page suivante
    const nextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    // Gestion de la page précédente
    const prevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    async function deleteArticle(articleId) {
      try {
        const response = await fetch(`http://localhost:4000/api/article/${articleId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de l\'article');
        }
        // Rafraîchir la liste des articles après la suppression
        getWorks(); 
      } catch (error) {
        console.error('Erreur:', error);
      }
    }


  return (
    <div className='containerAccueil'>
      <h2 className='titleArticle'>Articles</h2>
      <Pagination
              currentPage={currentPage} 
              totalPages={totalPages} 
              nextPage={nextPage} 
              prevPage={prevPage} 
              />
      <div className='articlesContainer'>
        <article className='articles'> {currentArticles.map(item => <div className='articleDiv' key={item.id}> <span className='articleTitle'> {item.title} </span> 
        <span className='cardArticle'> {item.content} </span> 
        <button onClick={() => deleteArticle(item.id)}>Supprimer</button> </div>)} </article> 
      </div>
      <div className='containerButton'>
        <Link to="/AddArticle" className='addButton'>Ajouter un article</Link>
      </div>
    </div>
  )
}

export default AccueilPage
