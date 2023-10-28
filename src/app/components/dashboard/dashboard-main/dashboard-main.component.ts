import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { ZipCodesState } from "../../../models/zip-codes.models";
import { Observable } from "rxjs/internal/Observable";
import { CityTitleComponent } from "../city-title/city-title.component";
import { selectCanLoadChartData, selectLoadedChartData, selectLoading, selectZipCodeSelected } from "../../../store/chart-data/chart-data.selectors";
import { map } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { loadChartData } from "../../../store/chart-data/chart-data.actions";
import { CanLoadChartDataInfo } from "../../../models/chart-data.model";
import { FilterFormComponent } from "../../forms/filter-form/filter-form.component";
import { ChartContainerComponent } from "../../chart/chart-container/chart-container.component";
import { ChartLoadingComponent } from "../../loaders/chart-loading/chart-loading.component";

@Component({
  selector: 'demography-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CityTitleComponent,
    FilterFormComponent,
    ChartLoadingComponent,
    ChartContainerComponent
  ]
})
export class DashboardMainComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  store = inject(Store<ZipCodesState>);
  showCityInfo!: Observable<boolean>;
  isLoading!: Observable<boolean>;
  showChartContainer!: Observable<boolean>;
  
  ngOnInit(): void {
    this.initSubscriptions();
  }

  private initSubscriptions(): void {
    this.showCityInfo = this.store.select(selectZipCodeSelected).pipe(map(value => !!value));

    this.isLoading = this.store.select(selectLoading);
    this.showChartContainer = this.store.select(selectLoadedChartData);

    this.store.select(selectCanLoadChartData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((info: CanLoadChartDataInfo) => {
        if (info.value) {
          this.store.dispatch(loadChartData({ code: info.code }));
        }
      });
  }
}
