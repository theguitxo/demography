export interface ChartDataState {
  loading: boolean;
  loaded: boolean;
  errorLoading: boolean;
  zipCodeSelected: string;
  chartDataItems: ChartDataResponse[];
}

export interface CanLoadChartDataInfo {
  value: boolean;
  code: string;
}

export interface ChartDataResponse {
  any: string;
  codi: string;
  literal: string;
  homes_de_0_a_14_anys: string;
  homes_de_15_a_64_anys: string;
  homes_de_65_anys_i_m_s: string;
  dones_de_0_a_14_anys: string;
  dones_de_15_a_64_anys: string;
  dones_de_65_anys_i_m_s: string;
  total_de_0_a_14_anys: string;
  total_de_15_a_64_anys: string;
  total_de_65_anys_i_m_s: string;  
}

export interface ValuesChartItem {
  value_0_to_14: number;
  value_15_to_64: number;
  value_65_to_plus: number;
}

export interface ChartDataItem {
  year: string;
  menData: ValuesChartItem;
  womenData: ValuesChartItem;
  totalData: ValuesChartItem;
}
