import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { ChartDataItem, ValuesChartItem } from "../../../models/chart-data.model";
import { PanelModule } from 'primeng/panel';
import { ChartPopulationComponent } from "../chart-population/chart-population.component";

@Component({
  selector: 'demography-chart-group',
  templateUrl: './chart-group.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PanelModule,
    ChartPopulationComponent
  ]
})
export class ChartGroupComponent implements OnInit {
  @Input({ required: true }) info!: ChartDataItem;

  menChart!: ValuesChartItem;
  womenChart!: ValuesChartItem;
  totalChart!: ValuesChartItem;

  ngOnInit(): void {
    this.setChartsData();
  }

  private setChartsData(): void {
    this.menChart = {
      value_0_to_14: this.info.menData.value_0_to_14,
      value_15_to_64: this.info.menData.value_15_to_64,
      value_65_to_plus: this.info.menData.value_65_to_plus
    };
    this.womenChart = {
      value_0_to_14: this.info.womenData.value_0_to_14,
      value_15_to_64: this.info.womenData.value_15_to_64,
      value_65_to_plus: this.info.womenData.value_65_to_plus
    };
    this.totalChart = {
      value_0_to_14: this.info.totalData.value_0_to_14,
      value_15_to_64: this.info.totalData.value_15_to_64,
      value_65_to_plus: this.info.totalData.value_65_to_plus
    };
  }
}
