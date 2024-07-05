import {
	useDispatch as reactUseDispatch,
	useSelector as reactUseSelector,
	useStore as reactUseStore
} from 'react-redux'
import { AppDispatch, RootState, AppStore } from './store';

export const useDispatch = reactUseDispatch.withTypes<AppDispatch>()
export const useSelector = reactUseSelector.withTypes<RootState>()
export const useStore = reactUseStore.withTypes<AppStore>()