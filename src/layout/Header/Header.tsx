import React from 'react';
import styles from './Header.styles.scss';

export const Header = (): JSX.Element => {
	return (
		<>
			<div className={styles.header_container}>
				<div className={styles.header_text}>Form</div>
			</div>
		</>
	);
};
