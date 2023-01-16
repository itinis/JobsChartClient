export class  ChartJobs {
    chartJobId:number | undefined;
    date:Date;
    jobsPerDay:number | undefined;
    jobsViews: number | undefined;
    predictedJobsViews:number | undefined;
    isCompleted?: boolean;
    constructor( date: Date,
        jobsPerDay: number, jobsViews:number,predictedJobsViews:number) {
            this.date = date;
            this.jobsPerDay = jobsPerDay;
            this.jobsViews = jobsViews;
            this.predictedJobsViews = predictedJobsViews;
    }
}