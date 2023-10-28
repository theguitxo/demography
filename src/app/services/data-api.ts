import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ZipCodeItem } from "../models/zip-codes.models";
import { ChartDataResponse } from "../models/chart-data.model";

@Injectable()
export class DataAPIService {  
  http = inject(HttpClient);

  zipCodesApiURL = 'https://analisi.transparenciacatalunya.cat/resource/tp8v-a58g.json';
  charDataApiURL = 'https://analisi.transparenciacatalunya.cat/resource/b4rr-d25b.json';

  getZipCodes(): Observable<ZipCodeItem[]> {
    return this.http.get<ZipCodeItem[]>(`${this.zipCodesApiURL}?$limit=9999`);
  }

  getChartData(code: string): Observable<ChartDataResponse[]> {
    return this.http.get<ChartDataResponse[]>(`${this.charDataApiURL}?codi=${code}`);
  }
}
