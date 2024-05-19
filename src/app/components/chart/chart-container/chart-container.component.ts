import { ChangeDetectionStrategy, Component, Injector, OnInit, Signal, inject } from "@angular/core";
import { selectChartInfo, selectHaveChartInfo } from "../../../store/chart-data/chart-data.selectors";
import { ZipCodesState } from "../../../models/zip-codes.models";
import { Store } from "@ngrx/store";
import { ChartDataItem } from "../../../models/chart-data.model";
import { MessagesModule } from 'primeng/messages';
import { Message } from "primeng/api/message";
import { DividerModule } from 'primeng/divider';
import { ChartGroupComponent } from "../chart-group/chart-group.component";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'demography-chart-container',
  templateUrl: './chart-container.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MessagesModule,
    DividerModule,
    ChartGroupComponent
  ]
})
export class ChartContainerComponent implements OnInit {
  store = inject(Store<ZipCodesState>);
  
  haveChartInfo!: Signal<boolean>;
  chartInfo!: Signal<ChartDataItem[]>;

  noDataMessage: Message[] = [
    {
      severity: 'warn',
      summary: 'Warning',
      detail: 'No data found'
    }
  ];

  private injector = inject(Injector);
  
  ngOnInit(): void {
    this.haveChartInfo = toSignal(this.store.select(selectHaveChartInfo), {
      initialValue: false,
      injector: this.injector
    });

    this.chartInfo = toSignal(this.store.select(selectChartInfo), {
      initialValue: [],
      injector: this.injector
    });
  }
}
