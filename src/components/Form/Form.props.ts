export interface IFormState {
	username: IInputProps;
	email: IInputProps;
	birthday: IInputProps;
	telephone: IInputProps;
	message: IInputProps;
}

export interface IInputProps {
	name: string;
	value: string | number;
	type: string;
	placeholder: string;
	errorMessage?: string;
	label: string;
	valide: boolean;
	touched: boolean;
}

export interface IUserDto {
	username: string | number;
	email: string | number;
	birthday: string | number;
	telephone: string | number;
	message: string | number;
}
