import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { selectChartInfo, selectHaveChartInfo } from "../../../store/chart-data/chart-data.selectors";
import { ZipCodesState } from "../../../models/zip-codes.models";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ChartDataItem } from "../../../models/chart-data.model";
import { CommonModule } from "@angular/common";
import { MessagesModule } from 'primeng/messages';
import { Message } from "primeng/api/message";
import { DividerModule } from 'primeng/divider';
import { ChartGroupComponent } from "../chart-group/chart-group.component";

@Component({
  selector: 'demography-chart-container',
  templateUrl: './chart-container.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MessagesModule,
    DividerModule,
    ChartGroupComponent
  ]
})
export class ChartContainerComponent implements OnInit {
  store = inject(Store<ZipCodesState>);
  
  haveChartInfo!: Observable<boolean>;
  chartInfo!: Observable<ChartDataItem[]>;

  noDataMessage: Message[] = [
    {
      severity: 'warn',
      summary: 'Warning',
      detail: 'No data found'
    }
  ]
  
  ngOnInit(): void {
    this.haveChartInfo = this.store.select(selectHaveChartInfo);
    this.chartInfo = this.store.select(selectChartInfo)
  }
}
