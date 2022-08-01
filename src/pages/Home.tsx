import React from 'react';
import { Form } from '../components';
import styles from './Home.styles.scss';

export const Home = (): JSX.Element => {
	return (
		<div className={styles.container}>
			<Form />
		</div>
	);
};
