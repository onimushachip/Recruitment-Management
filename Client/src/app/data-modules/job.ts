export interface IJobInfo{
    _id: String;
    _jobCode: String;
    jobTitle: String;
    recruiterUserId: String;
    approval: String;
    experience: Number;
    skills: String[];
}

export class JobPosting implements IJobInfo {
    _id: String;
    _jobCode: String;
    jobTitle: String;
    recruiterUserId: String;
    approval: String;
    experience: Number;
    skills: String[];
}