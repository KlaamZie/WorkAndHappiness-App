/*
    Ce composant permet de structurer la section qui contient le graphique et appelle simplement une fonction qui créée et
    retourne le graphique en fonction des données du context.
*/

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
