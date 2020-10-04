// Core
import { put, call } from "redux-saga/effects"
import { SagaIterator } from "redux-saga";
import { ActionCreator, AnyAction } from "redux"


export type FillActionType<T> = (payload: T,) => {
    type: string;
    payload: T;
};

export type ErrorActionType = (payload: any,) => {
    type: string;
    payload: any;
}

type OptionsType<T, A> = {
    fetcher: (arg: any) => Promise<T>
    fetcherParam: A
    startFetching: ActionCreator<AnyAction>
    stopFetching: ActionCreator<AnyAction>
    fill: FillActionType<T>
    error: ErrorActionType
}

export function* makeRequestWitchSpinnerSaga<T, A>(options: OptionsType<T, A>): SagaIterator {
    const { fetcher, fetcherParam, startFetching, stopFetching, fill, error,} = options

    try {
        yield put(startFetching())
        const request = yield call(fetcher, fetcherParam)
        yield put(fill(request))
    } catch (e) {
        yield put(error(e))
    } finally {
        yield put(stopFetching())
    }
}