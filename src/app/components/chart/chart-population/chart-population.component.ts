import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { ValuesChartItem } from "../../../models/chart-data.model";
import { ChartData, ChartOptions } from "chart.js";
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'demography-chart-population',
  templateUrl: './chart-population.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ChartModule,
    CardModule
  ]
})
export class ChartPopulationComponent implements OnInit {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) info!: ValuesChartItem;
  
  chartData!: ChartData;
  total!: string;

  options: ChartOptions = {
    maintainAspectRatio: false
  };

  ngOnInit(): void {
    this.setChartData();
    this.setTotalPopulation();
  }

  private setChartData(): void {
    this.chartData = {
      labels: ['0 to 14 years', '15 to 64 years', '65 years or more'],
      datasets: [
        {
          data: [this.info.value_0_to_14, this.info.value_15_to_64, this.info.value_65_to_plus]
        }
      ]
    };
  }

  private setTotalPopulation(): void {
    this.total = `${this.info.value_0_to_14 + this.info.value_15_to_64 + this.info.value_65_to_plus} hab.`;
  }
}