export class IApplicant{
    _applicantId: number;
    firstName: String;
    lastName: String;
    email: String;
    experience: number;
    skills: String[];
    recruiterUserId: String;
}
export class NewApplicant{
    firstName: String;
    lastName: String;
    email: String;
    experience: number;
    skills: String[];
    recruiterUserId: String;
}