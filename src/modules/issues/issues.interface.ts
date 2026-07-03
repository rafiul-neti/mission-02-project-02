export interface IIssues {
  title: string;
  description: string;
  type: string;
  status?: string;
}

export interface IIssueRow extends IIssues {
  id: number,
  reporter_id:number,
  created_at: Date,
  updated_at: Date
}
