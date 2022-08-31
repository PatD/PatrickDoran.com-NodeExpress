<script setup>
import { ref, onMounted } from "vue";

// reactive state
let wordPressGraphQL = ref("https://patrickdoran.com/headless/graphql")
let entries = ref([]);

const getPosts = (async () =>{
 // Queries Headless WordPress site configured for GraphQL
  const res = await fetch(wordPressGraphQL.value, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        {				
          posts(where: {categoryName: "Speaking"}) {
            edges {
            node {
              excerpt
              date
              postId
              title
              content
            }
            }
          }
        }
      `,
    }),
  });

  // Wait for the results to load
  let results = await res.json();
  // Update Vue state
  return results.data.posts.edges;
})

// When the component is mounted, update state with the 
// headless Wordpress GraphQL post data
onMounted(async () => {
  entries.value = await getPosts()
});
</script>

<template>
  <div>
    <ul v-for="entry in entries" :key="entry.node.postId">
      <li>
        <p>{{ entry.node.title }}</p>
        <p>{{entry.node.excerpt }}</p>
        <p>{{ entry.node.content }}</p>
        <p><time datetime={entry.node.date}>{{entry.node.date.substring(0, 4)}}</time></p>
        </li>
    </ul>
  </div>
</template>
