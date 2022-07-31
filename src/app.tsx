import React from 'react';
import { withLayout } from './layout/Layout';
import { Home } from './pages/Home';

const App = () => {
	return (
		<>
			<Home />
		</>
	);
};

export default withLayout(App);
