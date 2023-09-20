import { useEffect, useState } from 'react';
import { UserControllerService } from '../auto-api';
import useAuth from '../hooks/useAuth';

const Home = () => {
	const authController = useAuth();
	const [username, setUserName] = useState('');

	useEffect(() => {
		UserControllerService.getUserName(authController.userCode).then(x =>
			setUserName(x)
		);
	}, [authController]);

	return (
		<div className='container'>
			<h6 className='p-3'>Welcome {username}</h6>
		</div>
	);
};

export default Home;
