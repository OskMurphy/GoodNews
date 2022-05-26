const searchForm = document.querySelector('.searchForm');
console.log(searchForm);

const divContainerNews = document.querySelector('.container-news')

const API_KEY = '969ef0c663d34114b912c8c5216803b3';

searchForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  divContainerNews.innerHTML = ""
  const word = event.target.word.value;
  console.log(word);
  const response = await fetch(`https://newsapi.org/v2/everything?q=${word}&from=2022-05-23&sortBy=popularity&language=ru&pageSize=10`, {
    headers: {
      'X-Api-Key': API_KEY,
    },
  });
  console.log(11111, response);
  const result = await response.json();
  console.log(result.articles);
  console.log(result.articles[0].title);
  if(response.ok) {
    for (let i = 0; i < result.articles.length; i++) {
      divContainerNews.innerHTML += `
       <div class="articleCard">
        <h3>${result.articles[i].title}</h3>
         <img src="${result.articles[i].urlToImage}" width="100%" />
         <p>${result.articles[i].description}</p>
         <a href="${result.articles[i].url}">Перейти к источнику</a>
       </div>
        `
    }
    event.target.reset()
  }
  // if(result.ok) {
  //   divContainerNews.innerHTML = `
  //   <div class="articleCard">
  //   <h3>${{result.title}}</h3>
  //   <img src="${{result.urlToImage}}" width="100%" />
  //   <p>${{result.description}}</p>
  //   <a href="{{this.url}}">Перейти к источнику</a>
  // </div>
  //   `
  // }
});
