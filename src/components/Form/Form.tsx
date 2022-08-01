import React, { FormEvent, useState } from 'react';
import { Input } from '..';
import { IFormState, IInputProps, IMessage } from './Form.props';
import { isValid } from './validateInfo';
import { registration } from '../../service/service';
import styles from './Form.styles.scss';

export const Form = (): JSX.Element => {
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<IMessage>({ status: false, text: '' });
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
			value: '',
			type: 'text',
			placeholder: '+(7,8,9)(000)000-00-00',
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
		let result = false;
		Object.keys(values).forEach((name) => {
			if (!values[name].valide && values[name].touched) {
				result = true;
			} else {
				values[name].valide = true;
				values[name].touched = true;
				renderMessages('Заполните форму', false);
				return false;
			}
		});
		return result;
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isFormvalid = checkForm();
		if (isFormvalid) {
			const { username, email, birthday, message, telephone } = values;
			const data = {
				username: username.value,
				email: email.value,
				birthday: birthday.value,
				telephone: telephone.value,
				message: message.value,
			};

			try {
				setLoading(true);
				const res = await registration(data);
				setLoading(false);
				if (res === 'success') {
					renderMessages('Данные отправлены успешно 😊', true);
					clearInputs();
				} else {
					const err: string[] = Object.values(res[0].constraints);
					setLoading(false);
					return renderMessages(err[0], false);
				}
			} catch (e) {
				console.log(e);
				setLoading(false);
			}
		} else {
			return renderMessages('Форма заполнена некорректно!', false);
		}
	};

	const onChange = (value: string, input: IInputProps['name']) => {
		const copyValues = { ...values };
		const control = copyValues[input];
		if (input === 'username') {
			control.value = value.toUpperCase();
		} else {
			control.value = value;
		}
		control.touched = true;
		control.valide = isValid(control.value, input);
		setValues(copyValues);
	};

	const renderInputs = () => {
		return Object.keys(values).map((input, index) => {
			const inputName: IInputProps = values[input];
			return <Input key={inputName.name + index} inputName={inputName} onChange={onChange} />;
		});
	};

	const renderMessages = (mess: string, status: boolean) => {
		setMessage({ text: mess, status });
		setTimeout(() => {
			setMessage({ text: '', status: false });
		}, 4000);
	};

	const clearInputs = () => {
		const copyState = { ...values };
		Object.keys(copyState).forEach((name) => {
			copyState[name].value = '';
		});
		setValues(copyState);
	};

	return (
		<div className={styles.form_contaner}>
			<form onSubmit={handleSubmit} noValidate>
				{renderInputs()}
				<div>
					<button disabled={loading ? true : false} className={styles.btn}>
						{!loading ? 'Submit' : 'Loading...'}
					</button>
				</div>
			</form>
			<div
				className={styles.message}
				style={{
					display: message ? 'block' : 'none',
					color: !message['status'] ? 'red' : 'green',
				}}
			>
				{message['text']}
			</div>
		</div>
	);
};
