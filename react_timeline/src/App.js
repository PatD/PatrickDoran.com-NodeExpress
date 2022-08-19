import React, {useState ,useEffect} from 'react';

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
const PatrickDoranTimelineEntry = (props)=>{
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

  useEffect(() => {
    function loadData(){

      setIsLoading(true)

      fetch(wordPressGraphQL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query:wordPressGraphQLquery,
        })
      })
        .then(response => response.json())
        .then(data => {
          let results = data.data.posts.edges
          setResults(results)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Error loading data via Wordpress GraphQL plugin: ', error);
        })
    }
    loadData()
  },[]);


  if (isLoading) {
    return <p>Loading Timeline ...</p>;
  }

  return (
    <div className="reactTimeline">
      <p>Timeline has loaaded! {isLoading}</p>

      {results.map(result =>
              <div className='timeline__item' key={result.node.postId}>
                  <PatrickDoranTimelineEntry 
                    entryTitle={result.node.title} 
                    entryDate={result.node.date.substr(0,4)} 
                  />
              </div>
            )}
    </div>
  );
}

export default App;
