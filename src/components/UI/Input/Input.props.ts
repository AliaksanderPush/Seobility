import { IInputProps } from 'components/Form/Form.props';
import { ChangeEvent } from 'react';

export interface IProps {
	onChange: (e: ChangeEvent<HTMLInputElement>, input: string) => void;
	inputName: IInputProps;
}
