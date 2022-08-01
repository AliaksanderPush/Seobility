import { IUserDto } from 'components/Form/Form.props';

export const API_URL = 'http://localhost:8000';

export const registration = async (data: IUserDto): Promise<any> => {
	const response = await fetch(`${API_URL}/user/register/`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},

		body: JSON.stringify(data),
	});

	return await response.json();
};
