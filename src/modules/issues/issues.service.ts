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

  return result.rows[0];
};

const getIssuesFromDB = async (queryParams: {
  sort?: string;
  type?: string;
  status?: string;
}) => {
  const { sort = "newest", type, status } = queryParams;

  let mainQuery = "SELECT * FROM issues";
  const queryParamValues: string[] = [];
  let queryParamIndex = 1;

  const filteringConditions: string[] = [];

  if (type) {
    filteringConditions.push(`type = $${queryParamIndex++}`);
    queryParamValues.push(type);
  }

  if (status) {
    filteringConditions.push(`status = $${queryParamIndex++}`);
    queryParamValues.push(status);
  }

  if (filteringConditions.length) {
    mainQuery += ` WHERE ${filteringConditions.join(" AND ")}`;
  }

  mainQuery +=
    sort === "oldest"
      ? " ORDER BY created_at ASC"
      : " ORDER BY created_at DESC";

  const { rows: issues } = await pool.query(mainQuery, queryParamValues);
  // console.log(issuesResult.rows);

  const reporterIDs = issues.map((issue) => issue.reporter_id);
  const reporterIdIndex = reporterIDs.map((_, i) => `$${i + 1}`).join(", ");

  const { rows: users } = await pool.query(
    `
    SELECT id, name, role FROM users WHERE id IN(${reporterIdIndex})
    `,
    reporterIDs,
  );

  const issueWithReporter = issues.map((issue) => {
    const reporter = users.find((user) => user.id === issue.reporter_id);

    const { reporter_id, created_at, updated_at, ...rest } = issue;

    return {
      ...rest,
      reporter,
      created_at,
      updated_at,
    };
  });

  return issueWithReporter;
};

export const issuesService = {
  createIssueIntoDB,
  getIssuesFromDB,
};
