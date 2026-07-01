import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(fr|es|en)/:path*",
    // FR sans préfixe locale (localePrefix: "as-needed")
    "/blog",
    "/blog/:path*",
    "/biens",
    "/biens/:path*",
  ],
};
