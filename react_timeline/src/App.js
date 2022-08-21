import React, { useState, useEffect } from 'react';
import { timeline } from './timeline.js';

// GraphQL endpoint and query:
const wordPressGraphQL = 'https://patrickdoran.com/headless/graphql'
const wordPressGraphQLquery = `{
  posts(first:50, where: {categoryName: "Timeline", orderby: {field: DATE, order: ASC}}) {
    edges {
      node {
        date
        postId
        title
      }
    }
  }
}`;

// Component for an individual timeline entry
const PatrickDoranTimelineEntry = (props) => {
  return (
    <div className='timeline__content'>
      <strong><time dateTime={props.entryDate}>{props.entryDate}</time></strong>
      <p><em>{props.entryTitle}</em></p>
    </div>
  )
}

function App() {

  const [isLoading, setIsLoading] = useState();
  const [results, setResults] = useState([]);
  

  function loadData() {

    setIsLoading(true)

    fetch(wordPressGraphQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: wordPressGraphQLquery,
      })
    })
      .then(response => response.json())
      .then(data => {
        let results = data.data.posts.edges
        return [setIsLoading(false),setResults(results)]
      })
      .catch((error) => {
        setIsLoading(false)
        console.error('Error loading data via Wordpress GraphQL plugin: ', error);
      })
  }

  // Run once, load our timeline data from headless Wordpress GraphQL!
  useEffect(() => {
    if (results.length === 0 && isLoading !== false) {
      return loadData()
    }
  }, [results,isLoading]);

  // Run once, run the timeline plugin
  useEffect(() => {
    if (isLoading === false && results.length > 0) {
       return timeline(document.querySelectorAll('.timeline'));
    }
  }, [isLoading,results])


  if (isLoading === true) {
    return <p>Loading Timeline ...</p>;
  }

  if (isLoading === false && results.length > 0) {
    return (
      <div className='timeline' data-mode='horizontal' data-rtl-mode='true' data-visible-items="5">
        <div className='timeline__wrap'>
          <div className='timeline__items'>
            {results.map(result =>
              <div className='timeline__item' key={result.node.postId}>
                <PatrickDoranTimelineEntry
                  entryTitle={result.node.title}
                  entryDate={result.node.date.substr(0, 4)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
