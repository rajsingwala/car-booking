import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import sourceReducer from "./sourceSlice";
import destinationReducer from "./destSlice";
import typeReducer from "./typeSlice";
import driverReducer from "./driverSlice";

export default configureStore({
  reducer: {
    source: sourceReducer,
    destination: destinationReducer,
    type: typeReducer,
    driver: driverReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
