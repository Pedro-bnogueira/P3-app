import axios from 'axios';

function getAxios(url, params = {}) {
	return axios({
	  url: url,
	  method: 'GET',
	  params: params,
	})
	  .then((response) => response.data)
	  .catch((error) => {
		throw error.response.data;
	  });
  }

  function postAxios(url, data, id = null, config = {}) {
	const fullUrl = id ? `${url}/${id}` : url;
  
	return axios
	  .post(fullUrl, data, config)
	  .then((response) => response)
	  .catch((error) => {
		throw error;
	  })
	  .finally(() => {
		// código que deseja executar após a requisição,
		// independentemente de ela ter sido bem-sucedida ou ter falhado.
	  });
  }

export { getAxios, postAxios };