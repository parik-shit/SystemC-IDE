import React, {useState, useEffect} from 'react';
import {X, Skull, Robot, HeartStraight} from "@phosphor-icons/react";
import {useNavigate} from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import IconButton from './IconButton'
function BadBot() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [icon, setIcon] = useState(null);

	useEffect(() => {
		if (loading) {
			const timer = setTimeout(() => {
				setLoading(false);
				// Assuming a navigation will happen here, but this code will ensure the loading screen hides after the timeout.
			}, 10000); // Simulate a network request delay
			return () => clearTimeout(timer);
		}
	}, [loading]);

	const handleClick = (path, IconComponent) => {
		setIcon(() => IconComponent);
		setLoading(true);
		setTimeout(() => {
			navigate(path);
		}, 2000); // Simulate a network request delay
	};
	const IconData = [{path: "/smiley", IconComponent: X},
	{path: "/skull", IconComponent: Skull},
	{path: "/robot", IconComponent: Robot},
	{path: "/heart", IconComponent: HeartStraight}
	];
	return (
		<>
			{loading ? (
				<LoadingScreen icon={icon} />
			) : (
				<div className="flex items-center justify-center h-screen w-screen bg-black">
					<div className="w-64 h-64 grid grid-cols-2 gap-1 p-2">
						{IconData.map(({path, IconComponent}) => (
							<IconButton
								key={path} // Use the path as the key for each button
								IconComponent={IconComponent}
								onClick={() => handleClick(path, IconComponent)}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
}
export default BadBot;

