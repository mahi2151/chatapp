import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({message: "Too Many Requests.Try again later."});
            }
        else if(decision.reason.isBot()){
           return res.status(403).json({message: "Access denied."}); 
        } else{
            return res.status(403).json({message: "Access denied by policy."});
        }
    }

    if(decision.results.some(isSpoofedBot)){
        return res.status(403).json({
            error: "spoofed bot detected",
            message: "Malicious activity detected. Access denied."
        })
    }
    next();

    } catch (error) {
        console.log("Arcjet middleware error:", error);
        next();
    }
}