const useAuth = () => {
	const user = localStorage.getItem('accessToken');
	return !!user;
};

export default useAuth;