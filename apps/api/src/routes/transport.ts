import { Router, type IRouter, type Request, type Response } from "express";
import { TransportSearchQueryParams } from "@workspace/api-zod";
import pino from "pino";

const logger = pino({ name: "transport-route" });
const router: IRouter = Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = TransportSearchQueryParams.parse(req.query);

    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock response data
    const mockTickets = Array.from({ length: 5 }).map((_, index) => {
      const departure = new Date(query.date);
      departure.setHours(8 + index * 2);
      
      const arrival = new Date(departure);
      const isFlight = query.type === 'flight';
      arrival.setHours(departure.getHours() + (isFlight ? 2 : 5));

      return {
        id: `ticket-${query.type}-${index + 1}`,
        provider: isFlight ? ["Air Prishtina", "Wizz Air", "EasyJet"][index % 3] : ["Gjirafa", "BalkanViator", "Gashi Travel"][index % 3],
        departureTime: departure.toISOString(),
        arrivalTime: arrival.toISOString(),
        duration: isFlight ? "2h 00m" : "5h 00m",
        price: (isFlight ? 150 : 30) + index * 10,
        currency: "EUR",
        isDirect: index % 2 === 0,
      };
    });

    res.json(mockTickets);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      logger.warn({ error }, "Validation failed for transport search");
      res.status(400).json({ error: "Invalid query parameters", details: error });
    } else {
      logger.error({ error }, "Internal server error during transport search");
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

export default router;
