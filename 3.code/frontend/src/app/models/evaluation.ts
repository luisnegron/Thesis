export interface Student {
    _id: string;
    name: string;
  }
  
  export interface Result {
    studentId: Student;
    score: number;
  }
  
  export interface Survey {
    _id: string;
    title: string;
  }
  
  export interface Evaluation {
    surveyId: Survey;
    period: string;
    results: Result[];
  }