const searchForm = document.querySelector('.searchForm');
console.log(searchForm);

const searchFormException = document.querySelector('.searchFormException')
console.log(searchFormException);

const divContainerNews = document.querySelector('.container-news')


const API_KEY = '335b820b2d704ca4969be4cf0508c1e7';

searchForm?.addEventListener('submit', async (event) => {
	event.preventDefault();
	divContainerNews.innerHTML = ""
	const word = event.target.word.value;
	const wordException = event.target.wordException.value;

  let response;

	if (wordException === "") {

		 response = await fetch(`https://newsapi.org/v2/everything?q=${word}&from=2022-05-23&sortBy=popularity&language=ru&pageSize=10`, {
			headers: {
				'X-Api-Key': API_KEY,
			},
		});
	} else {
		 response = await fetch(`https://newsapi.org/v2/everything?q=${word} NOT ${wordException}&from=2022-05-23&sortBy=popularity&language=ru&pageSize=10`, {
			headers: {
				'X-Api-Key': API_KEY,
			},
		});
  }
		console.log(11111, response);
		const result = await response.json();
		console.log(result.articles);
		console.log(22222, result.articles[0]?.title);
		if (response.ok && result.articles.length !== 0) {
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
		} else {
			divContainerNews.innerHTML = `<h1>Всё поломалось</h1>`
		}
	
});
