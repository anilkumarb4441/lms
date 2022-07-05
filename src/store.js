import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './rootReducer' 

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => [...getDefaultMiddleware({serializableCheck: false})],
    preloadedState,
  })

  return store
}