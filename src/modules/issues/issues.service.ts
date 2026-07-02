import { pool } from "../../db";
import type { IIssues } from "./issues.interface";

const createIssueIntoDB = async (payload: IIssues, reporter_id: string) => {
  const { title, description, type } = payload;
//   console.log("creating issue in service: ", { ...payload, id: reporter_id });

  const result = await pool.query(
    `
    INSERT INTO issues (title, description, type, reporter_id) 
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [title, description, type, reporter_id],
  );

  return result.rows[0]
};

export const issuesService = {
  createIssueIntoDB,
};
