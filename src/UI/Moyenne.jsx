import React from 'react';

export default function Moyenne(props) {
  return(
    <section className="moyenne-content-container">
      <h1>{props.title}</h1>
      <p>{props.data} / 10</p>
    </section>
  )
}
