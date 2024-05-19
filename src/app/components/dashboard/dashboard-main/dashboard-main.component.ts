import { ChangeDetectionStrategy, Component, DestroyRef, Injector, OnInit, Signal, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { ZipCodesState } from "../../../models/zip-codes.models";
import { Observable } from "rxjs/internal/Observable";
import { CityTitleComponent } from "../city-title/city-title.component";
import { selectCanLoadChartData, selectLoadedChartData, selectLoading, selectZipCodeSelected } from "../../../store/chart-data/chart-data.selectors";
import { map } from "rxjs";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { loadChartData } from "../../../store/chart-data/chart-data.actions";
import { CanLoadChartDataInfo } from "../../../models/chart-data.model";
import { FilterFormComponent } from "../../forms/filter-form/filter-form.component";
import { ChartContainerComponent } from "../../chart/chart-container/chart-container.component";
import { ChartLoadingComponent } from "../../loaders/chart-loading/chart-loading.component";

@Component({
  selector: 'demography-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CityTitleComponent,
    FilterFormComponent,
    ChartLoadingComponent,
    ChartContainerComponent
  ]
})
export class DashboardMainComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  store = inject(Store<ZipCodesState>);
  showCityInfo!: Signal<boolean>;
  isLoading!: Signal<boolean>;
  showChartContainer!: Signal<boolean>;

  private injector = inject(Injector);
  
  ngOnInit(): void {
    this.initSubscriptions();
  }

  private initSubscriptions(): void {
    this.showCityInfo = toSignal(this.store.select(selectZipCodeSelected).pipe(map(value => !!value)), {
      initialValue: false,
      injector: this.injector
    });

    this.isLoading = toSignal(this.store.select(selectLoading), {
      initialValue: false,
      injector: this.injector
    });

    this.showChartContainer = toSignal(this.store.select(selectLoadedChartData), {
      initialValue: false,
      injector: this.injector
    });

    this.store.select(selectCanLoadChartData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((info: CanLoadChartDataInfo) => {
        if (info.value) {
          this.store.dispatch(loadChartData({ code: info.code }));
        }
      });
  }
}
