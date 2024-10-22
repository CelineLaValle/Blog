import React from 'react';

const Pagination = ({ currentPage, totalPages, nextPage, prevPage }) => {
  return (
    <div className='pagination'>
      <button onClick={prevPage} disabled={currentPage === 1}>
        &#60; Précédent
      </button>
      <span>{currentPage} / {totalPages}</span>
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Suivant &#62;
      </button>
    </div>
  );
};

export default Pagination;