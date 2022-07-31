import { IUserDto } from 'components/Form/Form.props';

const url = 'http://localhost:8000';

export const registration = async (data: IUserDto): Promise<any> => {
	const response = await fetch(`${url}/user/register/`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},

		body: JSON.stringify(data),
	});
	if (!response.ok) {
		throw new Error(`Could't fetch: ${url}, status: ${response.status}`);
	}
	return await response.json();
};
