import { defer, Observable, of } from "rxjs";

export function getImageFileFromUrl(imageUrl: string | null | undefined): Observable<File | undefined> {
if(!imageUrl) {
    return of(undefined);
}
return defer(() => {
    return fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
        const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        return new File([blob], fileName, { type: blob.type });
    });
});
}