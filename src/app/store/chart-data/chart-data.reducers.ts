import { createReducer, on } from "@ngrx/store";
import { ChartDataResponse, ChartDataState } from "../../models/chart-data.model";
import { loadChartData, loadChartDataKO, loadChartDataOK, resetChartData, setZipCodeSelected } from "./chart-data.actions";

export const chartDataInitialState: ChartDataState = {
  loading: false,
  loaded: false,
  errorLoading: false,
  zipCodeSelected: '',
  chartDataItems: []
};

export const chartDataReducer = createReducer(
  chartDataInitialState,
  on(resetChartData, () => ({..._resetChartData()})),
  on(setZipCodeSelected, (state, { code }) => ({ ..._setZipCodeSelected(state, code) })),
  on(loadChartData, (state) => ({ ..._loadChartData(state)})),
  on(loadChartDataOK, (state, { data }) => ({ ..._loadChartDataOK(state, data)})),
  on(loadChartDataKO, (state) => ({ ..._loadChartDataKO(state)}))
);

function _resetChartData(): ChartDataState {
  return {
    ...chartDataInitialState
  }
}

function _setZipCodeSelected(state: ChartDataState, code: string): ChartDataState {
  return {
    ...state,
    zipCodeSelected: code
  }
}

function _loadChartData(state: ChartDataState): ChartDataState {
  return {
    ...state,
    chartDataItems: [],
    loading: true,
    loaded: false,
    errorLoading: false
  }
}

function _loadChartDataOK(state: ChartDataState, data: ChartDataResponse[]): ChartDataState {
  return {
    ...state,
    chartDataItems: [
      ...data
    ],
    loading: false,
    loaded: true,
    errorLoading: false
  }
}

function _loadChartDataKO(state: ChartDataState): ChartDataState {
  return {
    ...state,
    loading: false,
    loaded: true,
    errorLoading: true
  }
}
