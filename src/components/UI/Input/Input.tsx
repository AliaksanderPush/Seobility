import React from 'react';
import { currencyMask } from '../../Form/validateInfo';
import { IProps } from './Input.props';
import InputMask from "react-input-mask";
import styles from './Input.styles.scss';

export const Input = (props: IProps) => {
	const { inputName, onChange } = props;
	const { label, errorMessage, placeholder, name, value, touched, valide, type } = inputName;

	let offEmail = name === 'email';
	console.log(name === 'telephone');
	return (
		<div className={styles.form_input}>
			<label>{label}</label>
			<input
				type={type}
				className={styles.form_input_item}
				style={{ border: touched && valide ? '1px solid red' : 'none' }}
				placeholder={placeholder}
				name={name}
				onChange={
					name === 'telephone'
						? (e) => onChange(e, inputName.name)
						: (e) => onChange(currencyMask(e), inputName.name)
				}
				value={value}
			/>
			{touched && valide ? <span>{errorMessage}</span> : null}
		</div>
	);
};
