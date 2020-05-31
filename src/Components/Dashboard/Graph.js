import React from 'react';
import GetGraph from './Graph/GetGraph';

export default function Graph(props) {

  return (
      <div className="graph-content-container">
        <h1>Évolution de votre bien-être au sein votre entreprise</h1>
        <GetGraph />
      </div>
  )

}
