import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request-helper';

const initialState = {
	user: null,
	isLoading: false,
	error: null,
};

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (userData) => {
		const data = await request('auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		localStorage.setItem('refreshToken', data.refreshToken);
		localStorage.setItem('accessToken', data.accessToken);
		return { user: data.user };
	}
);

export const logoutUser = createAsyncThunk(
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

export const refreshToken = createAsyncThunk(
	'user/refreshToken',
	async () => {
		const refreshToken = localStorage.getItem('refreshToken');
		const data = await request('auth/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: refreshToken }),
		});
		localStorage.setItem('refreshToken', data.refreshToken);
		localStorage.setItem('accessToken', data.accessToken);
		return {};
	}
);

export const registerUser = createAsyncThunk(
	'user/registerUser',
async (userData) => {
		const data = await request('auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		localStorage.setItem('refreshToken', data.refreshToken);
		localStorage.setItem('accessToken', data.accessToken);
		return { user: data.user };
	}
);

export const fetchUserData = createAsyncThunk(
	'user/fetchUserData',
	async () => {
		const accessToken = localStorage.getItem('accessToken');
		const response = await request('auth/user', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': accessToken,
			},
		});
		return { user: response.user };
	}
);

export const updateUserData = createAsyncThunk(
	'user/updateUserData',
	async (userData) => {

		const accessToken = localStorage.getItem('accessToken');
		const response = await request('auth/user', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': accessToken,
			},
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
		.addCase(loginUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload.user;
		})
		.addCase(loginUser.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		})
		.addCase(logoutUser.fulfilled, (state) => {
			state.user = null;
			state.isLoading = false;
		})
		.addCase(logoutUser.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		})
		.addCase(registerUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload.user;
		})
		.addCase(registerUser.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		})
		.addCase(fetchUserData.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload.user;
		})
		.addCase(fetchUserData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		})
		.addCase(updateUserData.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload.user;
		})
		.addCase(updateUserData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
	},
});

export default userSlice.reducer;