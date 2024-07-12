import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { PayloadAction } from '@reduxjs/toolkit';

import webSocketReducer, { connect, disconnect, setError, WebSocketState, initialState } from './ws-slice';

const middlewares = [thunk];
// @ts-ignore
const mockStore = configureMockStore(middlewares);

describe('webSocketSlice', () => {
	let store: ReturnType<typeof mockStore>;

	beforeEach(() => {
		store = mockStore({ webSocket: { wsConnected: false, error: undefined } });
	});

	it('should handle initial state', () => {
		expect(webSocketReducer(undefined, {} as PayloadAction)).toEqual({
			wsConnected: false,
			error: undefined,
		});
	});

	it('should handle connect', () => {
		const action = connect({ wsConnected: true });
		const state = webSocketReducer(initialState, action);
		expect(state).toEqual({ wsConnected: true, error: undefined });
	});

	it('should handle disconnect', () => {
		const action = disconnect();
		const state = webSocketReducer(initialState, action);
		expect(state).toEqual({ wsConnected: false, error: undefined });
	});

	it('should handle setError', () => {
		const action = setError('Some error');
		const state = webSocketReducer(initialState, action);
		expect(state).toEqual({ wsConnected: false, error: 'Some error' });
	});
});