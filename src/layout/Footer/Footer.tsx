import React from 'react';
import styles from './Footer.styles.scss';

export const Footer = (): JSX.Element => {
	const data = new Date().getFullYear();
	return (
		<>
			<footer className={styles.footer}>
				<div className={styles.footer_item}>
					© {data} Copyright:
					<a
						className={styles.footer_link}
						href='https://github.com/AliaksanderPush?tab=repositories'
					>
						{' '}
						My Repo
					</a>
				</div>
			</footer>
		</>
	);
};
