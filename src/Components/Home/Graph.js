import React from 'react';
import GetGraph from './Graph/GetGraph';

export default function Graph(props) {

  return (
      <div className="graph-content-container">
        <h1>Évolution du bien-être dans votre entreprise</h1>
        <GetGraph />
      </div>
  )

}
