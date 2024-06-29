const useAuth = (): boolean => {
	const user = localStorage.getItem('accessToken');
	return !!user;
};

export default useAuth;