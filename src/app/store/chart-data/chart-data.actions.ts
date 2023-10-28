import { createAction, props } from "@ngrx/store";
import { ChartDataResponse } from "../../models/chart-data.model";

export const loadChartData = createAction(
  '[Chart Data] Load',
  props<{ code: string }>()
);

export const loadChartDataOK = createAction(
  '[Chart Data] Load OK',
  props<{ data: ChartDataResponse[] }>()
);

export const loadChartDataKO = createAction(
  '[Chart Data] Load KO'
);

export const setZipCodeSelected = createAction(
  '[Chart Data] Set Zip Code Selected',
  props<{ code: string }>()
);

export const resetChartData = createAction(
  '[Chart Data] Reset'
);
