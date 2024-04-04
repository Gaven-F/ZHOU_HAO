import { DataType } from "../dataType";

export function DataReducer(
	state: DataState = DataReducerInitData,
	action: DataAction,
) {
	switch (action.type) {
		case ACTION_TYPE.SET_DATA:
			state = action.payload;
			break;

		case ACTION_TYPE.ADD_LOG:
			state.log.push(...action.payload);
			console.log("Log added", action.payload[0].time);

			break;

		default:
			throw new Error("Unknown action type");
	}
}

export type DataAction =
	| {
			type: ACTION_TYPE.SET_DATA;
			payload: DataState;
	  }
	| {
			type: ACTION_TYPE.ADD_LOG;
			payload: DataType.Log[];
	  };

export type DataState = DataType.FoodStatus & DataType.ServerConnectStatus;

export enum ACTION_TYPE {
	SET_DATA = "SET_DATA",
	ADD_LOG = "ADD_LOG",
}

export const DataReducerInitData: DataState = {
	foodOpen: false,
	foodWeight: 0,
	currentFoodWeight: 0,
	foodOpenTime: [],
	waterOpen: false,
	waterHeight: 0,
	currentWaterHeight: 0,
	waterOpenTime: [],
	connected: false,
	msg: "",
	log: [],
};
