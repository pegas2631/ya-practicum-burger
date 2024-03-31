import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../utils/request-helper';

const initialState = {
	user: null,
	isLoading: false,
	error: null,
};

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (userData, { rejectWithValue }) => {
		try {
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
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const logoutUser = createAsyncThunk(
	'user/logoutUser',
	async (_, { rejectWithValue }) => {
		try {
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
			return {};
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const refreshToken = createAsyncThunk(
	'user/refreshToken',
	async (_, { rejectWithValue }) => {
		try {
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
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (userData, { rejectWithValue }) => {
		try {
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
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchUserData = createAsyncThunk(
	'user/fetchUserData',
	async (_, { rejectWithValue }) => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			const response = await request('auth/user', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': accessToken,
				},
			});
			return { user: response.user };
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateUserData = createAsyncThunk(
	'user/updateUserData',
	async (userData, { rejectWithValue }) => {
		try {
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
		} catch (error) {
			return rejectWithValue(error.message);
		}
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
		.addCase(logoutUser.fulfilled, (state) => {
			state.user = null;
			state.isLoading = false;
		})
		.addCase(registerUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload.user;
		})
		.addCase(fetchUserData.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload.user;
		})
		.addCase(updateUserData.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload.user;
		});
	},
});

export default userSlice.reducer;