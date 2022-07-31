import { ChangeEvent } from 'react';
import InputMask from 'react-input-mask';

const rule = {
	validName: /^([A-Z-А-ЯЁ]){3,30}\s{1}([A-Z-А-ЯЁ|\-]){3,30}$/,
	validEmail: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
	validBirthday: /^(\d{4}\-\d{2}\-\d{2})$/,
};

export const isValid = (value: string, inputName: string): boolean => {
	if (!value) {
		return true;
	}
	try {
		switch (inputName) {
			case 'username':
				return !rule.validName.test(value);
			case 'email':
				return !rule.validEmail.test(value);
			case 'message':
				return !(value.length > 9 && value.length < 301);
			case 'telephone':
				return false;
			case 'birthday':
				return !rule.validBirthday.test(value);
		}
	} catch {
		alert('Что-то пошло не так, Пересмотрите заполнение формы, возможно, это всё из-за вас!');
		return false;
	}
};

const checkName = (val: string): boolean => {
	let result = false;
	const str = val.trim();
	const newStr = str.split(' ');
	if (newStr.length !== 2) {
		return true;
	}
	const first = newStr[0][newStr.length];
	const second = newStr[1][0];
	if (first === ' ' || second === ' ') {
		result = true;
	}
	newStr.forEach((item) => {
		if (item.length < 3 || item.length > 31) {
			result = true;
		}
	});
	return result;
};

export const currencyMask = (e: ChangeEvent<HTMLInputElement>) => {
	e.target.maxLength = 16;
	let value = e.target.value;
	value = value.replace(/\D/g, '');
	value = value.replace(/(\d)(\d{2})$/, '$1. $2');
	value = value.replace(/(?=(\d{3})+(\D))\B/g, ',');
	e.target.value = value;
	console.log('popali>>', e.target.value);
	return e;
};

export const phoneMask = () => {
	const firstLetter: any = /(?!.*[DFIOQU])[A-VXY]/i;
	const letter: any = /(?!.*[DFIOQU])[A-Z]/i;
	const digit: any = /[0-9]/;
	const mask: any = [firstLetter, digit, letter, ' ', digit, letter, digit];
	//	return 	<InputMask mask={mask} />
};
