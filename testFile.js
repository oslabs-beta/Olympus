document.addEventListener('DOMContentLoaded', () => {
  const endPoint = document.createElement('input');
  const query = document.createElement('input');
  const makeFetch = document.createElement('button')
  makeFetch.innerText = "Send Request"
  document.querySelector('#root').appendChild(query);
  // document.querySelector('#root').appendChild(endPoint);
  document.querySelector('#root').appendChild(makeFetch);

  makeFetch.addEventListener('click', async () => {
    const data = await Olympus({
    method: 'POST',
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify({query: query.value})
    });
  })
})


