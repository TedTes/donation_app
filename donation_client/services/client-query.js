export default async function clientQuery(query, variables = {}) {
  let options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  };

  try {
    let response = await fetch("http://localhost:4000/graphql", options);
    response = await response.json();
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
