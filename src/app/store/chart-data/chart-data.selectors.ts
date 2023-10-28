import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CanLoadChartDataInfo, ChartDataItem, ChartDataResponse, ChartDataState } from "../../models/chart-data.model";
import { CHART_DATA_FEATURE_KEY } from "../../constants/chart-data.constants";
import { getZipCodesList } from "../zip-codes/zip-codes.selectors";
import { ZipCodeItem, ZipCodeListItem } from "../../models/zip-codes.models";

export const selectChartData = createFeatureSelector<ChartDataState>(CHART_DATA_FEATURE_KEY);

export const selectLoading = createSelector(
  selectChartData,
  (state: ChartDataState): boolean => state.loading);

export const selectLoaded = createSelector(
  selectChartData,
  (state: ChartDataState): boolean => state.loaded);

export const selectErrorLoading = createSelector(
  selectChartData,
  (state: ChartDataState): boolean => state.errorLoading);

export const selectZipCodeSelected = createSelector(
  selectChartData,
  (state: ChartDataState): string => state.zipCodeSelected);

export const selectCityName = createSelector(
  getZipCodesList,
  selectZipCodeSelected,
  (zipCodes: ZipCodeListItem[], codeSelected: string): string => {
    const selected = zipCodes?.find(item => item.codi_municipi === codeSelected);
    let townName = '';
    let zipCodesStr = '';
    if (selected) {
      townName = `${selected.nom_municipi} `;
      zipCodesStr = selected.codi_postal.join(', ');
      zipCodesStr = zipCodesStr.length > 50 ? `(${zipCodesStr.slice(0, 50)}...)` : `(${zipCodesStr})`;
    }
    return `${townName}${zipCodesStr}`;
  });

export const selectCanLoadChartData = createSelector(
  selectLoading,
  selectLoaded,
  selectErrorLoading,
  selectZipCodeSelected,
  (loading: boolean, loaded: boolean, error: boolean, selected: string): CanLoadChartDataInfo => ({
    value: !loading && !loaded && !error && !!selected,
    code: selected
  }));

export const selectLoadedChartData = createSelector(
  selectLoading,
  selectLoaded,
  selectErrorLoading,
  (loading: boolean, loaded: boolean, error: boolean): boolean => (!loading && loaded && !error));

export const selectChartInfo = createSelector(
  selectChartData,
  (state: ChartDataState): ChartDataItem[] => {
    return state?.chartDataItems?.map((item: ChartDataResponse) => ({
      year: item.any,
      menData: {
        value_0_to_14: +item.homes_de_0_a_14_anys,
        value_15_to_64: +item.homes_de_15_a_64_anys,
        value_65_to_plus: +item.homes_de_65_anys_i_m_s
      },
      womenData: {
        value_0_to_14: +item.dones_de_0_a_14_anys,
        value_15_to_64: +item.dones_de_15_a_64_anys,
        value_65_to_plus: +item.dones_de_65_anys_i_m_s
      },
      totalData: {
        value_0_to_14: +item.total_de_0_a_14_anys,
        value_15_to_64: +item.total_de_15_a_64_anys,
        value_65_to_plus: +item.total_de_65_anys_i_m_s
      }
    })) || [];
  });

export const selectHaveChartInfo = createSelector(
  selectChartInfo,
  (info: ChartDataItem[]): boolean => info?.length > 0);
