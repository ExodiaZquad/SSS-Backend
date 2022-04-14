const generateImageUser = () => {
	const listImage = [
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/bear.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/camel.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/cat.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/chicken.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/deer-2.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/deer.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/dog-2.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/dog.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/ferret.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/giraffe.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/hen.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/lion.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/llama.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/polar-bear.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/rhino.png?raw=true',
		'https://github.com/ExodiaZquad/Avatar-icons/blob/main/sloth.png?raw=true',
	];
	let i = Math.floor(Math.random() * listImage.length);
	return listImage[i];
};
exports.generateImageUser = generateImageUser;
