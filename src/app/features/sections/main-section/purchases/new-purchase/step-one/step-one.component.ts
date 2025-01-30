import { Component, output, OutputEmitterRef } from '@angular/core';
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
  description: string = '';
  provider: Provider | null = null;

  dividerLayout: "vertical" | "horizontal" = "vertical";

  onChanges: OutputEmitterRef<NewPurchaseStepOne> = output<NewPurchaseStepOne>();

  constructor(
    public translateService: TranslateService,
    private deviceTypeService: DeviceTypeService
  ) {
    this.dividerLayout = this.deviceTypeService.isMobile() ? "horizontal" : "vertical";
  }
  
  updateDescription(event: string) {
    this.description = event;
    if(this.provider) {
      this.onChanges.emit(new NewPurchaseStepOne(this.description, this.provider));
    }
  }

  updateProvider(provider: Provider) {
    this.provider = provider;
    if(this.provider) {
      this.onChanges.emit(new NewPurchaseStepOne(this.description, this.provider));
    }
  }
}
