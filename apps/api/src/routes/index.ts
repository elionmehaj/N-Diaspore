import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import transportRouter from "./transport.js";
import contactRouter from "./contact.js";
import agentRouter from "./agents.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/transport", transportRouter);
router.use("/contact", contactRouter);
router.use("/", agentRouter);

export default router;
