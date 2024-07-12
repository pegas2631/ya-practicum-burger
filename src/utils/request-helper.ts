export const BASE_URL = 'https://norma.nomoreparties.space/api';

function checkResponse(response: Response): void {
	if (!response.ok) {
		throw new Error(`Ошибка ${response.status}`);
	}
}

interface ApiResponse {
	success: boolean;
	[key: string]: any;
}

function checkData(data: ApiResponse): void {
	if (!data.success) {
		throw new Error('Ошибка при получении данных с сервера');
	}
}

async function request(endpoint: string, options?: RequestInit): Promise<ApiResponse> {
	const response = await fetch(`${BASE_URL}/${endpoint}`, options);

	checkResponse(response);

	const data: ApiResponse = await response.json();

	checkData(data);

return data;
}

export default request;