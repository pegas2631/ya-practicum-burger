import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface WebSocketState {
	wsConnected: boolean;
	error?: string;
}

export const initialState: WebSocketState = {
	wsConnected: false,
	error: undefined,
};

const webSocketSlice = createSlice({
	name: 'webSocket',
	initialState,
	reducers: {
		connect: (state, action: PayloadAction<{ wsConnected: boolean; error?: string }>) => {
			state.wsConnected = action.payload.wsConnected;
			state.error = action.payload.error;
		},
		disconnect: (state) => {
			state.wsConnected = false;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export const { connect, disconnect, setError } = webSocketSlice.actions;
export const selectWebSocket = (state: RootState) => state.webSocket;
export default webSocketSlice.reducer;