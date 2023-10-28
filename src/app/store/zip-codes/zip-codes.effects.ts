import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DataAPIService } from "../../services/data-api";
import { loadZipCodes, loadZipCodesKO, loadZipCodesOK } from "./zip-codes.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { ZipCodeItem } from "../../models/zip-codes.models";

export const loadZipCodesEffect = createEffect(
  (action$ = inject(Actions), dataAPI = inject(DataAPIService)) => {
    return action$.pipe(
      ofType(loadZipCodes),
      switchMap(() => 
        dataAPI.getZipCodes().pipe(
          map((data: ZipCodeItem[]) => loadZipCodesOK({ data })),
          catchError((error) => of(loadZipCodesKO()))
        )
      )
    );
  },
  { functional: true }
);
