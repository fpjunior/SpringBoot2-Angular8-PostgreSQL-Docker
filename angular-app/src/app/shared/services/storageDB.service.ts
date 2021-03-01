import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class StorageDBService {
    codeUser = localStorage.getItem('userCode');
    constructor(protected http: HttpClient) { }


    getStorage(key: string) {
        return this.http.get(`${environment.URL_API}v1/storagedb/user/${this.codeUser}/key/${key}`).pipe(
            timeout(20000),
            take(1));
    }

    deleteStorage(key: string) {
        return this.http.delete(`${environment.URL_API}v1/storagedb/user/${this.codeUser}/key/${key}`).pipe(
            timeout(20000),
            take(1));
    }

    saveStorage(key: string, obj: any) {
        return this.http.post(`${environment.URL_API}v1/storagedb/user/${this.codeUser}/key/${key}`, obj).pipe(
            timeout(20000),
            take(1));
    }
}