import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import request from '../../utils/request-helper';

export interface IUser {
	id: string;
	name: string;
	email: string;
	password: string;
}

export interface IUserState {
	user: IUser | null;
	isLoading: boolean;
	error: string | null;
}

export const initialState: IUserState = {
	user: null,
	isLoading: false,
	error: null,
};

export const loginUser = createAsyncThunk<{ user: IUser }, { email: string; password: string }>(
	'user/loginUser',
	async (userData) => {
		const data = await request('auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			} as HeadersInit,
			body: JSON.stringify(userData),
		});
		localStorage.setItem('refreshToken', data.refreshToken);
		localStorage.setItem('accessToken', data.accessToken);
		return { user: data.user };
	}
);

export const logoutUser = createAsyncThunk<void>(
	'user/logoutUser',
	async () => {
		const refreshToken = localStorage.getItem('refreshToken');
		await request('auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: refreshToken }),
		});
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('accessToken');
	}
);

export const refreshToken = createAsyncThunk<void>(
	'user/refreshToken',
	async () => {
		const refreshToken = localStorage.getItem('refreshToken');
		const data = await request('auth/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			} as HeadersInit,
			body: JSON.stringify({ token: refreshToken }),
		});
		console.log(data.accessToken);
		localStorage.setItem('refreshToken', data.refreshToken);
		localStorage.setItem('accessToken', data.accessToken);
	}
);

export const registerUser = createAsyncThunk<{ user: IUser }, { name: string; email: string; password: string }>(
	'user/registerUser',
	async (userData) => {
		const data = await request('auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			} as HeadersInit,
			body: JSON.stringify(userData),
		});
		localStorage.setItem('refreshToken', data.refreshToken);
		localStorage.setItem('accessToken', data.accessToken);
		return { user: data.user };
	}
);

export const fetchUserData = createAsyncThunk<{ user: IUser }>(
	'user/fetchUserData',
	async () => {
		const accessToken = localStorage.getItem('accessToken');
		const response = await request('auth/user', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': accessToken,
			} as HeadersInit,
		});
		return { user: response.user };
	}
);

export const updateUserData = createAsyncThunk<{ user: IUser }, Partial<IUser>>(
	'user/updateUserData',
	async (userData) => {
		const accessToken = localStorage.getItem('accessToken');
		const response = await request('auth/user', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': accessToken,
			} as HeadersInit,
			body: JSON.stringify(userData),
		});
		return { user: response.user };
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: IUser }>) => {
				state.isLoading = false;
				state.user = action.payload.user;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to login';
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.isLoading = false;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to logout';
			})
			.addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: IUser }>) => {
				state.isLoading = false;
				state.user = action.payload.user;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to register';
			})
			.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<{ user: IUser }>) => {
				state.isLoading = false;
				state.user = action.payload.user;
			})
			.addCase(fetchUserData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to fetch user data';
			})
			.addCase(updateUserData.fulfilled, (state, action: PayloadAction<{ user: IUser }>) => {
				state.isLoading = false;
				state.user = action.payload.user;
			})
			.addCase(updateUserData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to update user data';
			})
			.addCase(refreshToken.fulfilled, (state) => {
				state.user = null;
				state.isLoading = false;
			})
			.addCase(refreshToken.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Failed to refresh token';
			})
	},
});

export default userSlice.reducer;