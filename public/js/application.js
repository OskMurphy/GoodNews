const searchForm = document.querySelector('.searchForm');
console.log(searchForm);

const input = document.getElementById('text');
console.log(input);

const API_KEY = '969ef0c663d34114b912c8c5216803b3';

searchForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const word = input.value;
  console.log(word);
  const response = await fetch(`https://newsapi.org/v2/everything?q=${word}&from=2022-05-23&sortBy=popularity&language=ru&pageSize=10`, {
    headers: {
      'X-Api-Key': API_KEY,
    },
    // body: JSON.stringify({}),
  });
  const result = await response.json();
  console.log(result);
});
