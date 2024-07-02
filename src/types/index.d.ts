import { IncomingHttpHeaders } from "http";
import { WebhookRequiredHeaders } from "svix";

export type SvixHeaders = IncomingHttpHeaders & WebhookRequiredHeaders;
