import { Injectable, Signal, signal } from '@angular/core';
import { RawMaterial } from '../models/rawMaterial.entities';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {
  private _selectedRawMaterial = signal<RawMaterial | null>(null);
  private _showDataComponent = signal<boolean>(false);
  private _disabledEdition = signal<boolean>(true);

  url = environment.API_URL + 'MateriasPrimas/';

  constructor() { }

  get selectedRawMaterial(): Signal<RawMaterial | null> {
    return this._selectedRawMaterial;
  }

  selectRawMaterial(rawMaterial: RawMaterial | null){
    this._selectedRawMaterial.set(rawMaterial);
  }

  get viewDataComponent(): Signal<boolean> {
    return this._showDataComponent;
  }

  ToggleDataComponent(show: boolean){
    this._showDataComponent.set(show);
  }

  get isDisabledEdition(): Signal<boolean> {
    return this._disabledEdition;
  }

  ToggleEditionButton(change: boolean){
    this._disabledEdition.set(change);
  }

  // async getAllRawMaterials(): Promise<Object[]>{
  //   const data = await fetch(this.url);
  //   return await data.json() ?? [];
  // }
}
