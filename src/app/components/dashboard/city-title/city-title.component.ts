import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Injector, OnInit, Signal, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { ChartDataState } from "../../../models/chart-data.model";
import { selectCityName } from "../../../store/chart-data/chart-data.selectors";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'demography-city-title',
  templateUrl: './city-title.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityTitleComponent implements OnInit {
  store = inject(Store<ChartDataState>);

  title!: Signal<string>;

  private injector = inject(Injector);

  ngOnInit(): void {
    this.title = toSignal(this.store.select(selectCityName), {
      initialValue: '',
      injector: this.injector
    });
  }
}
