import { Injectable } from '@angular/core';
import { Global } from "./global";

@Injectable({ providedIn: 'root' })
export class UploadService {
    public url: string;

    constructor() { 
        this.url = Global.url;
    }
    
    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string) {
        return new Promise((resolve, reject) => {
            const formData: FormData = new FormData();
            const xhr: XMLHttpRequest = new XMLHttpRequest();
    
            for (let i = 0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name);
            }
    
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        console.error('Error:', xhr.response);
                        reject(xhr.response);
                    }
                }
            };
    
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
    
}
