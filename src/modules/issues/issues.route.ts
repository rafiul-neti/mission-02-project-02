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

router.patch(
  "/:id",
  authorize(USER_ROLES.maintainer, USER_ROLES.contributor),
  issuesController.updateIssue,
);

router.delete(
  "/:id",
  authorize(USER_ROLES.maintainer),
  issuesController.deleteIssue,
);

export const issuesRoute = router;
