import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DataAPIService } from "../../services/data-api";
import { loadChartData, loadChartDataKO, loadChartDataOK } from "./chart-data.actions";
import { catchError, switchMap, map, of } from "rxjs";
import { ChartDataResponse } from "../../models/chart-data.model";

export const loadChartDataEffect = createEffect(
  (actions$ = inject(Actions), dataAPI = inject(DataAPIService)) => {
    return actions$.pipe(
      ofType(loadChartData),
      switchMap((action) =>
        dataAPI.getChartData(action.code).pipe(
          map((data: ChartDataResponse[]) => loadChartDataOK({ data })),
          catchError((error) => of(loadChartDataKO()))
        )
      )
    );
  },
  { functional: true }
);
