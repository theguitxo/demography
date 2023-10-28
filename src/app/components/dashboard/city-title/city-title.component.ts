import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ChartDataState } from "../../../models/chart-data.model";
import { selectCityName } from "../../../store/chart-data/chart-data.selectors";

@Component({
  selector: 'demography-city-title',
  templateUrl: './city-title.component.html',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class CityTitleComponent implements OnInit {
  store = inject(Store<ChartDataState>);

  title!: Observable<string>;

  ngOnInit(): void {
    this.title = this.store.select(selectCityName);
  }
}
