import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { Locality } from '../../../../../../core/models/branch.entities';
import { TranslateService } from '@ngx-translate/core';
import { BrancesCatalogService } from '../../brances-catalog.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-locality-manager',
  standalone: true,
  imports: [DropdownModule, ButtonModule, FormsModule],
  templateUrl: './locality-manager.component.html',
  styleUrl: './locality-manager.component.scss',
  providers: [TranslateService]
})
export class LocalityManagerComponent {
  localities: Locality[] = [];

  constructor(public translateService: TranslateService, public branchCatalogService: BrancesCatalogService){

  }

  ngOnInit(){
    this.loadLocalities();
  }

  disabledEdition(): boolean {
    return this.branchCatalogService.disableDataEdition();
  }

  updateBranchLocality(value: Locality) {
    this.branchCatalogService.updateSelectedBranch('locality', value);
    this.branchCatalogService.addPatchObject('replace', '/locality', value);
  }

  newLocalityClick(){
    this.branchCatalogService.modalTitle = this.translateService.instant('SECTIONS.CATALOGS.BRANCHES.LOCALITY_MODAL.TITLE');
    this.branchCatalogService.modalVisibility = true;
  }

  loadLocalities(){
    this.branchCatalogService.getLocalities().subscribe(
      data => {
        this.localities = data;
      }
    );
  }

}
