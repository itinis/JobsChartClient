import { Injectable } from '@angular/core';
import { ChartJobs } from '../Model/ChartJobs';
import { HttpsService } from './https.service';

@Injectable({
  providedIn: 'root'
})
export class ChartJobsService {
  controllerName = "User";
    ;
  constructor(private httpsService :HttpsService) { }
  
  getAlljobsChart() {
    return this.httpsService.get(this.controllerName,"getAlljobsChart");
  }
}
