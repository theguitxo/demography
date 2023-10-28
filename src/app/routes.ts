import { CanActivateFn, Route } from "@angular/router";
import { Store, provideState } from "@ngrx/store";
import { chartDataReducer } from "./store/chart-data/chart-data.reducers";
import { ZipCodesState } from "./models/zip-codes.models";
import { inject } from "@angular/core";
import { selectLoaded } from "./store/zip-codes/zip-codes.selectors";
import * as chartDataEffects from './store/chart-data/chart-data.effects';
import { provideEffects } from "@ngrx/effects";

const canActivateDashboard: CanActivateFn = () => {
  const store = inject(Store<ZipCodesState>);
  return store.select(selectLoaded);
};
  
export const ROUTES: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () => import ('./components/dashboard/dashboard-main/dashboard-main.component').then(m => m.DashboardMainComponent),
    providers: [
      provideState({ name: 'chartData', reducer: chartDataReducer}),
      provideEffects(chartDataEffects),
    ],
    canActivate: [canActivateDashboard]
  }
];
