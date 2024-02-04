import Router from "@koa/router";
import Koa from "koa";
import { koaBody } from "koa-body";

import ActivityService from "./services/activity";
import Activity from "./utils/activity";

const app = new Koa();
const router = new Router();

router.post("/activity/:provider", koaBody(), async (ctx, next) => {
  try {
    const activity = new Activity({
      providerName: ctx.params.provider as "GARMIN" | "SUUNTO",
      providerActivity: ctx.request.body,
    });

    await new ActivityService().saveActivity(activity);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message == "CONFLICTING_ACTIVITY") {
        ctx.body = "CONFLICTING_ACTIVITY";
        ctx.status = 409;
        return next();
      }
      if (err.message == "UNKNOWN_PROVIDER") {
        ctx.body = "UNKNOWN_PROVIDER";
        ctx.status = 501;
        return next();
      }
    }
  }

  ctx.body = "ACTIVITY_SAVED";
  ctx.status = 201;
  next();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
