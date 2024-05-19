import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, DestroyRef, Injector, OnInit, Signal, inject } from "@angular/core";
import { DropdownChangeEvent, DropdownModule } from "primeng/dropdown";
import { ZipCodesState } from "../../../models/zip-codes.models";
import { Store } from "@ngrx/store";
import { DropdownOption } from "../../../models/search-form.models";
import { FILTER_PROVINCE_OPTIONS, ZIP_CODES } from "../../../constants/zip-codes.constants";
import { Observable } from "rxjs";
import { setZipCodesFilters } from "../../../store/zip-codes/zip-codes.actions";
import { resetChartData, setZipCodeSelected } from "../../../store/chart-data/chart-data.actions";
import { getDisableByProvincesFilter, getZipCodesFiltered } from "../../../store/zip-codes/zip-codes.selectors";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'demography-filter-form',
  templateUrl: './filter-form.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DropdownModule,
  ]
})
export class FilterFormComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  store = inject(Store<ZipCodesState>);

  optionsZipCodes: DropdownOption[] = [];
  optionsProvinces: DropdownOption[] = FILTER_PROVINCE_OPTIONS;

  disableByProvincesFilter!: Signal<boolean>;

  private injector = inject(Injector);

  ngOnInit(): void {
    this.initSubscriptions();
  }

  handleChangeProvince(event: DropdownChangeEvent): void {
    const filters: ZIP_CODES[] = [];
    filters.push(event.value);
    if (event.value === ZIP_CODES.LLEIDA) {
      filters.push(ZIP_CODES.TREMP);
    }
    this.store.dispatch(setZipCodesFilters({ filters }));
    this.store.dispatch(resetChartData());
  }

  handleChangeCity(event: DropdownChangeEvent): void {
    this.store.dispatch(resetChartData());
    this.store.dispatch(setZipCodeSelected({ code: event.value }));
  }

  handleClearCity(): void {
    this.store.dispatch(resetChartData());
  }

  private initSubscriptions(): void {
    this.store.select(getZipCodesFiltered)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((values: DropdownOption[]) => {
        this.optionsZipCodes = values;
      });

    this.disableByProvincesFilter = toSignal(this.store.select(getDisableByProvincesFilter), {
      initialValue: false,
      injector: this.injector
    });
  }
}