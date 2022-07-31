import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '..';
import { IFormState, IInputProps } from './Form.props';
import { isValid } from './validateInfo';
import styles from './Form.styles.scss';
import { registration } from '../../service/service';

export const Form = (): JSX.Element => {
	const [checkFormValid, setCheckFormValid] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [values, setValues] = useState<IFormState>({
		username: {
			name: 'username',
			value: '',
			type: 'text',
			placeholder: 'Имя и Фамилия',
			errorMessage: 'Введите имя и фамилию корректно!',
			label: 'Имя и Фамилия',
			valide: false,
			touched: false,
		},
		email: {
			name: 'email',
			value: '',
			type: 'email',
			placeholder: 'Email',
			errorMessage: 'Введите корректный email!',
			label: 'Email',
			valide: false,
			touched: false,
		},
		birthday: {
			name: 'birthday',
			value: '',
			type: 'date',
			placeholder: 'День рождения',
			errorMessage: 'Введите дату рождения!',
			label: 'День рождения',
			valide: false,
			touched: false,
		},
		telephone: {
			name: 'telephone',
			value: 0,
			type: 'number',
			placeholder: '+7(495)000-00-00',
			errorMessage: 'Нужно ввести именно российский номер телефона!',
			label: 'Номер телефона',
			valide: false,
			touched: false,
		},
		message: {
			name: 'message',
			value: '',
			type: 'text',
			placeholder: 'Сообщение',
			errorMessage: 'Сообщение не соответствует нужной длине!',
			label: 'Сообщение',
			valide: false,
			touched: false,
		},
	});

	const checkForm = () => {
		Object.keys(values).forEach((name) => {
			if (!values[name].valide && values[name].touched) {
				setCheckFormValid(true);
			} else {
				values[name].valide = true;
				values[name].touched = true;
				alert('Заполните форму');
				setCheckFormValid(false);
				return;
			}
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		checkForm();
		if (checkFormValid) {
			const { username, email, birthday, message, telephone } = values;
			const data = {
				username: username.value,
				email: email.value,
				birthday: birthday.value,
				telephone: +telephone.value,
				message: message.value,
			};

			try {
				setLoading(true);
				const res = await registration(data);
				console.log('result>>>', res);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setLoading(false);
			}
		} else {
			return;
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>, input: IInputProps['name']) => {
		const copyValues = { ...values };
		const control = copyValues[input];
		if (input === 'username') {
			control.value = e.target.value.toUpperCase();
		} else {
			control.value = e.target.value;
		}
		control.touched = true;
		control.valide = isValid(control.value, input);
		console.log('reg>>>', isValid(control.value, input));
		/*
		let isFormValid = true;
		Object.keys(copyValues).forEach((name) => {
			isFormValid = !copyValues[name].valide && isFormValid;
		});
		*/
		setValues(copyValues);
		//setCheckFormValid(isFormValid);
	};

	const renderInputs = () => {
		return Object.keys(values).map((input, index) => {
			const inputName: IInputProps = values[input];
			return <Input key={inputName.name + index} inputName={inputName} onChange={onChange} />;
		});
	};

	return (
		<div className={styles.form_contaner}>
			<form onSubmit={handleSubmit}>
				{renderInputs()}
				<div>
					<button disabled={loading ? true : false} className={styles.btn}>
						Submit
					</button>
				</div>
			</form>
			<div className={styles.message}>Форма отправлена успешно!</div>
		</div>
	);
};
