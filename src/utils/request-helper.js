const BASE_URL = 'https://norma.nomoreparties.space/api';

function checkResponse(response)
{
	if (!response.ok) {
		throw new Error(`Ошибка ${response.status}`);
	}
}

function checkData(data)
{
	if (!data.success) {
		throw new Error('Ошибка при получении данных с сервера');
	}
}

async function request(endpoint, options) {
	const response = await fetch(`${BASE_URL}/${endpoint}`, options);

	checkResponse(response);

	const data = await response.json();

	checkData(data);

	return data;
}

export default request;