import { Router } from "express";
import { issuesController } from "./issues.controller";
import authorize from "../../middleware/authorize";
import { USER_ROLES } from "../../types";

const router = Router();

router.post(
  "/",
  authorize(USER_ROLES.contributor, USER_ROLES.maintainer),
  issuesController.createIssue,
);

router.get("/", issuesController.getIssues);
router.get("/:id", issuesController.getSingleIssue);

export const issuesRoute = router;
