import { Router, type IRouter } from "express";
import healthRouter from "./health";
import transportRouter from "./transport";
import agentRouter from "./agents";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/transport", transportRouter);
router.use("/", agentRouter);

export default router;
