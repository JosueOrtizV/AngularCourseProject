import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from "../models/project";
import { Global } from "./global";


@Injectable({providedIn: 'root'})
export class ProjectService {
    public url: string;
    constructor(
        private httpClient: HttpClient
    ) {
        this.url = Global.url;
    }

    testService(){
        return 'Probando el servicio de angular';
    }
    
    saveProject(project: Project): Observable<any>{
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.httpClient.post(this.url+'/save-project', params, {headers: headers});
    }

    getProjects(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.httpClient.get(this.url+'projects', {headers: headers});
    }

    getProject(id:any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.httpClient.get(this.url+'/project/'+id, {headers: headers});
    }

    deleteProject(id:any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.httpClient.delete(this.url+'/project/'+id, {headers: headers});
    }

    updateProject(project:any): Observable<any>{
        let params = JSON.stringify(project)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.httpClient.put(this.url+'/project/'+project._id, params, {headers: headers});
    }


}