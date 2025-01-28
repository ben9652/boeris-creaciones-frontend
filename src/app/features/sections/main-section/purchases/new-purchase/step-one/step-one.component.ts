import { Component, model, ModelSignal, OnInit, output, OutputEmitterRef } from '@angular/core';
import { ProvidersDropdownComponent } from '../../../../../../shared/catalog-dropdowns/providers-dropdown/providers-dropdown.component';
import { Provider } from '../../../../../../core/models/provider.entities';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DeviceTypeService } from '../../../../../../core/services/device-type/device-type.service';
import { NewPurchaseStepOne } from '../../../../../../core/models/stepsObjects.entities';

@Component({
  selector: 'app-step-one',
  imports: [
    TextareaModule,
    FloatLabelModule,
    DividerModule,
    ProvidersDropdownComponent,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss',
  providers: [TranslateService]
})
export class StepOneComponent {
  description: ModelSignal<string> = model.required<string>();
  provider: ModelSignal<Provider | null> = model.required<Provider | null>();

  dividerLayout: "vertical" | "horizontal" = "vertical";

  onFirstStepSubmit: OutputEmitterRef<NewPurchaseStepOne> = output<NewPurchaseStepOne>();

  constructor(
    public translateService: TranslateService,
    private deviceTypeService: DeviceTypeService
  ) {
    this.dividerLayout = this.deviceTypeService.isMobile() ? "horizontal" : "vertical";
  }

  onSelectedProvider(provider: Provider) {
    this.provider.set(provider);
  }
}
