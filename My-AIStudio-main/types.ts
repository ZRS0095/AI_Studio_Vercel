
// FILE: types.ts

export type RiskType = 'none' | 'privacy' | 'hallucination' | 'safety';

export type BusinessRole = 
  | 'Sales' 
  | 'Support' 
  | 'Operations' 
  | 'Legal/Compliance' 
  | 'Development' 
  | 'Recruiting'
  | 'Marketing'
  | 'Management'
  | 'Education/Research';

export interface Task {
  id: string;
  title: string;
  business_role: BusinessRole;
  scenario: string;
  risk_type: RiskType;
  constraints: string[];
  success_criteria: string;
}

export interface EvaluationResult {
  score: number;
  feedback: string;
  isSuccess: boolean;
  securityViolation?: boolean;
}

export interface ReportItem {
  task_id: string;
  score: number;
  feedback: string;
}

export interface FinalReport {
  session_id: string;
  user_name: string;
  department: string;
  total_score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  items: ReportItem[];
}

export interface LevelInfo {
  id: string;
  name: string;
  desc: string;
  qualification: string;
  courseName: string;
}
