import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import fetchMock from 'fetch-mock';
import reducer, { loginUser, logoutUser, refreshToken, registerUser, fetchUserData, updateUserData, IUserState, IUser } from './user-slice';

const BASE_URL = 'https://norma.nomoreparties.space/api';

const middlewares = [thunk];
// @ts-ignore
const mockStore = configureMockStore(middlewares);

describe('userSlice', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	const initialState: IUserState = {
		user: null,
		isLoading: false,
		error: null,
	};

	it('should return the initial state', () => {
		expect(reducer(undefined, {} as any)).toEqual(initialState);
	});

	it('should handle loginUser pending', () => {
		const action = { type: loginUser.pending.type };
		const expectedState = {
			...initialState,
			isLoading: true,
			error: null,
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle loginUser fulfilled', () => {
		const user: IUser = {
			id: '1',
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		};

		const action = { type: loginUser.fulfilled.type, payload: { user } };
		const expectedState = {
			...initialState,
			isLoading: false,
			user: user,
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle loginUser rejected', () => {
		const action = { type: loginUser.rejected.type, error: { message: 'Failed to login' } };
		const expectedState = {
			...initialState,
			isLoading: false,
			error: 'Failed to login',
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should dispatch loginUser and handle success', async () => {
		const user: IUser = {
			id: '1',
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		};

		fetchMock.postOnce(`${BASE_URL}/auth/login`, {
			body: { user, refreshToken: 'refreshToken', accessToken: 'accessToken', success: true },
			headers: { 'content-type': 'application/json' },
		});

		const expectedActions = [
			{ type: loginUser.pending.type, meta: expect.any(Object) },
			{ type: loginUser.fulfilled.type, payload: { user }, meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(loginUser({ email: user.email, password: user.password }) as any);
		expect(store.getActions()).toEqual(expectedActions);
	});



	it('should dispatch loginUser and handle failure', async () => {
		fetchMock.postOnce(`${BASE_URL}/auth/login`, {
			throws: new Error('Failed to login'),
		});

		const expectedActions = [
			{ type: loginUser.pending.type, meta: expect.any(Object) },
			{ type: loginUser.rejected.type, error: expect.any(Object), meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(loginUser({ email: 'john.doe@example.com', password: 'password123' }) as any);
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('should handle logoutUser fulfilled', () => {
		const action = { type: logoutUser.fulfilled.type };
		const expectedState = {
			...initialState,
			user: null,
			isLoading: false,
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle logoutUser rejected', () => {
		const action = { type: logoutUser.rejected.type, error: { message: 'Failed to logout' } };
		const expectedState = {
			...initialState,
			isLoading: false,
			error: 'Failed to logout',
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should dispatch logoutUser and handle success', async () => {
		fetchMock.postOnce(`${BASE_URL}/auth/logout`, {
			body: { success: true },
			headers: { 'content-type': 'application/json' },
		});

		const expectedActions = [
			{ type: logoutUser.pending.type, meta: expect.any(Object) },
			{ type: logoutUser.fulfilled.type, meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(logoutUser() as any);
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('should dispatch logoutUser and handle failure', async () => {
		fetchMock.postOnce(`${BASE_URL}/auth/logout`, {
			throws: new Error('Failed to logout'),
		});

		const expectedActions = [
			{ type: logoutUser.pending.type, meta: expect.any(Object) },
			{ type: logoutUser.rejected.type, error: expect.any(Object), meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(logoutUser() as any);
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('should handle refreshToken fulfilled', () => {
		const action = { type: refreshToken.fulfilled.type };
		const expectedState = {
			...initialState,
			isLoading: false,
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle refreshToken rejected', () => {
		const action = { type: refreshToken.rejected.type, error: { message: 'Failed to refresh token' } };
		const expectedState = {
			...initialState,
			isLoading: false,
			error: 'Failed to refresh token',
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should dispatch refreshToken and handle success', async () => {
		fetchMock.postOnce(`${BASE_URL}/auth/token`, {
			body: { refreshToken: 'newRefreshToken', accessToken: 'newAccessToken', success: true },
			headers: { 'content-type': 'application/json' },
		});

		const expectedActions = [
			{ type: refreshToken.pending.type, meta: expect.any(Object) },
			{ type: refreshToken.fulfilled.type, meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(refreshToken() as any);
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('should dispatch refreshToken and handle failure', async () => {
		fetchMock.postOnce(`${BASE_URL}/auth/token`, {
			throws: new Error('Failed to refresh token'),
		});

		const expectedActions = [
			{ type: refreshToken.pending.type, meta: expect.any(Object) },
			{ type: refreshToken.rejected.type, error: expect.any(Object), meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(refreshToken() as any);
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('should handle registerUser fulfilled', () => {
		const user: IUser = {
			id: '1',
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		};

		const action = { type: registerUser.fulfilled.type, payload: { user } };
		const expectedState = {
			...initialState,
			isLoading: false,
			user: user,
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle registerUser rejected', () => {
		const action = { type: registerUser.rejected.type, error: { message: 'Failed to register' } };
		const expectedState = {
			...initialState,
			isLoading: false,
			error: 'Failed to register',
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should dispatch registerUser and handle success', async () => {
		const user: IUser = {
			id: '1',
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		};

		fetchMock.postOnce(`${BASE_URL}/auth/register`, {
			body: { user, refreshToken: 'refreshToken', accessToken: 'accessToken', success: true },
			headers: { 'content-type': 'application/json' },
		});

		const expectedActions = [
			{ type: registerUser.pending.type, meta: expect.any(Object) },
			{ type: registerUser.fulfilled.type, payload: { user }, meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(registerUser({ name: user.name, email: user.email, password: user.password }) as any);
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('should dispatch registerUser and handle failure', async () => {
		fetchMock.postOnce(`${BASE_URL}/auth/register`, {
			throws: new Error('Failed to register'),
		});

		const expectedActions = [
			{ type: registerUser.pending.type, meta: expect.any(Object) },
			{ type: registerUser.rejected.type, error: expect.any(Object), meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(registerUser({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' }) as any);
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('should handle fetchUserData fulfilled', () => {
		const user: IUser = {
			id: '1',
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		};

		const action = { type: fetchUserData.fulfilled.type, payload: { user } };
		const expectedState = {
			...initialState,
			isLoading: false,
			user: user,
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle fetchUserData rejected', () => {
		const action = { type: fetchUserData.rejected.type, error: { message: 'Failed to fetch user data' } };
		const expectedState = {
			...initialState,
			isLoading: false,
			error: 'Failed to fetch user data',
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should dispatch fetchUserData and handle success', async () => {
		const user: IUser = {
			id: '1',
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		};

		fetchMock.getOnce(`${BASE_URL}/auth/user`, {
			body: { user, success: true },
			headers: { 'content-type': 'application/json' },
		});

		const expectedActions = [
			{ type: fetchUserData.pending.type, meta: expect.any(Object) },
			{ type: fetchUserData.fulfilled.type, payload: { user }, meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(fetchUserData() as any);
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('should dispatch fetchUserData and handle failure', async () => {
		fetchMock.getOnce(`${BASE_URL}/auth/user`, {
			throws: new Error('Failed to fetch user data'),
		});

		const expectedActions = [
			{ type: fetchUserData.pending.type, meta: expect.any(Object) },
			{ type: fetchUserData.rejected.type, error: expect.any(Object), meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(fetchUserData() as any);
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('should handle updateUserData fulfilled', () => {
		const user: IUser = {
			id: '1',
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		};

		const action = { type: updateUserData.fulfilled.type, payload: { user } };
		const expectedState = {
			...initialState,
			isLoading: false,
			user: user,
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should handle updateUserData rejected', () => {
		const action = { type: updateUserData.rejected.type, error: { message: 'Failed to update user data' } };
		const expectedState = {
			...initialState,
			isLoading: false,
			error: 'Failed to update user data',
		};

		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should dispatch updateUserData and handle success', async () => {
		const user: IUser = {
			id: '1',
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123',
		};

		fetchMock.patchOnce(`${BASE_URL}/auth/user`, {
			body: { user, success: true },
			headers: { 'content-type': 'application/json' },
		});

		const expectedActions = [
			{ type: updateUserData.pending.type, meta: expect.any(Object) },
			{ type: updateUserData.fulfilled.type, payload: { user }, meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(updateUserData(user) as any);
		expect(store.getActions()).toEqual(expectedActions);
	});

	it('should dispatch updateUserData and handle failure', async () => {
		fetchMock.patchOnce(`${BASE_URL}/auth/user`, {
			throws: new Error('Failed to update user data'),
		});

		const expectedActions = [
			{ type: updateUserData.pending.type, meta: expect.any(Object) },
			{ type: updateUserData.rejected.type, error: expect.any(Object), meta: expect.any(Object) },
		];

		const store = mockStore(initialState);

		await store.dispatch(updateUserData({ id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'password123' }) as any);
		expect(store.getActions()).toEqual(expectedActions);
	});

});