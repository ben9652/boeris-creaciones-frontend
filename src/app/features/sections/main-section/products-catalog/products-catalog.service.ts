import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpOptions } from '../../../../core/models/httpOptions.entities';
import { environment } from '../../../../../environments/environment';
import { areProductsEqual, Product } from '../../../../core/models/product.entities';
import { areRawMaterialsEqual } from '../../../../core/models/rawMaterial.entities';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { getImageFileFromUrl } from '../../../../shared/multimedia.helpers';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { PatchObject } from '../../../../core/models/patchObj.entities';

@Injectable({
  providedIn: 'root'
})
export class ProductsCatalogService {
  urlBase: string;
  httpOptions?: HttpOptions;
  
  // Si hay un producto seleccionado, este tendrá un ID correspondiente al ID del producto
  // Si aún no se seleccionó nada, es nulo
  // Si su ID es 0, es porque se está agregando un producto nuevo
  selectedProduct: WritableSignal<Product | null> = signal<Product | null>(null);
  selectedNonModifiedProduct: Product | null = null;

  nonModified: boolean = true;

  productUpdated: boolean = false;

  patchData: PatchObject[] = [];

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.urlBase = environment.API_URL;
    this.httpOptions = new HttpOptions(authService.getToken());
  }

  updateSelectedProduct(property: keyof Product, value: any) {
    const currentProduct: Product | null = this.selectedProduct();
    if(currentProduct) {
      this.selectedProduct.set({ ...currentProduct, [property]: value });
      this.nonModified = areProductsEqual(this.selectedNonModifiedProduct, this.selectedProduct());
    }
  }

  addNewProduct(): Observable<Product> {
    let newProduct: Product | null = this.selectedProduct();
    const apiUrl: string = this.urlBase + 'CatalogoProductos';
    const apiUrlToSavePicture: string = apiUrl + '/upload-image';

    if(this.httpOptions === undefined) {
      this.httpOptions = new HttpOptions(this.authService.getToken());
    }

    if(this.selectedProduct()?.name && this.selectedProduct()?.price) {
      if(newProduct?.picture !== 'pictures/cube-solid.svg') {
        return getImageFileFromUrl(newProduct?.picture).pipe(
          switchMap((file: File | undefined) => {
            const formData = new FormData();
            if(file) {
              formData.append('file', file);
            }

            const httpOptionsToCreateImage: HttpOptions = new HttpOptions(this.authService.getToken(), true);
            return this.http.post<string>(apiUrlToSavePicture, formData, httpOptionsToCreateImage).pipe(
              switchMap((newPictureUrl: string) => {
                if(newProduct !== null) {
                  newProduct.picture = newPictureUrl;
                }
                return this.http.post<Product>(apiUrl, newProduct, this.httpOptions);
              })
            )
          })
        )
      }
      else {
        return this.http.post<Product>(apiUrl, newProduct, this.httpOptions);
      }
    }
    else {
      return throwError(() => new Error('Debe completar todos los campos obligatorios'));
    }
  }

  addPatchObject(op: string, path: string, value: any) {
    const alreadyAddedPatch: PatchObject | undefined = this.patchData.find(patch => patch.path === path);
    if(alreadyAddedPatch) {
      alreadyAddedPatch.value = value;
    }
    else {
      this.patchData.push(new PatchObject(op, path, value));
    }
  }

  editProduct(id: number): Observable<Product> {
    const apiUrl: string = this.urlBase + 'CatalogoProductos';
    const apiUrlWithId: string = this.urlBase + 'CatalogoProductos/' + id;
    if(this.patchData.find(patch => patch.path === 'name')?.value === '') {
      return throwError(() => new Error('El nombre no puede ser vacío'));
    }

    let picturePatch: PatchObject | undefined = this.patchData.find(patch => patch.path === 'picture');
    const apiUrlToSavePicture: string = apiUrl + '/upload-image';

    const tokens: string[] | undefined = this.selectedNonModifiedProduct?.picture?.split('/');
    let apiUrlToDeletePicture: string = apiUrl + '/delete-image/';
    if(tokens) {
      const pictureName: string = tokens[tokens.length - 1];
      apiUrlToDeletePicture += pictureName;
    }

    if(picturePatch?.value) {
      return getImageFileFromUrl(picturePatch.value).pipe(
        switchMap((file: File | undefined) => {
          const formData = new FormData();
          if(file) {
            formData.append('file', file);
          }
          
          const httpOptionsForImageManaging: HttpOptions = new HttpOptions(this.authService.getToken(), true);
          return this.http.delete<boolean>(apiUrlToDeletePicture, httpOptionsForImageManaging).pipe(
            switchMap((deletedImage: boolean) => {
              return this.http.post<string>(apiUrlToSavePicture, formData, httpOptionsForImageManaging).pipe(
                switchMap((imageUrl: string) => {
                  picturePatch.value = imageUrl;
                  return this.http.patch<Product>(apiUrlWithId, this.patchData, this.httpOptions);
                }),
                catchError((res) => {
                  console.log('No se pudo agregar una imagen: ', res);
                  return of();
                })
              )
            }),
            catchError((res) => {
              console.log('No se pudo eliminar la imagen anterior: ', res);
              return of();
            })
          )
        })
      )
    }
    else {
      return this.http.patch<Product>(apiUrlWithId, this.patchData, this.httpOptions);
    }
  }
}
