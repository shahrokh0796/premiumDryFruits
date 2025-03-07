import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
const router = express.Router();
import routes from "../../frontend/src/routes/routes";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router";
import fs from "fs";
import path  from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root route
router.get("*", async (req, res) => {
    try {
        const fullUrl = `${req.protocol}://${req.get("host")}${req.url}`;
        const handler = createStaticHandler(routes);
        const context = await handler.query(new Request(fullUrl));
        // console.log(context, " <--c-o-n-t-e-x-t");

        if (!context || context instanceof Response) {
            return res.status(context.status).send(context.statusText);
        }

        const router = createStaticRouter(handler.dataRoutes, context);

        const appHtml = renderToString(
            <StaticRouterProvider 
            context={context.staticHandlerContext || context}
            router={router} />
        );
        // console.log(appHtml, "<-s-e-r-v-e-r-HTML"); 
        const indexFile = fs.readFileSync(path.resolve(__dirname, "../../frontend/dist", "index.html"), "utf-8");
        res.send(indexFile.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`))
    } catch (err) {
        console.error("Error in SSR Said:", err);
        res.status(500).send("Internal Server Error");
    }
});

export default router;