import { z } from 'zod';
import { MESSAGES } from '../utils/constants';

// Function to check that the dates are in the correct order
const validateRoundTripDates = (startDate: string, endDate: string | undefined, ctx: z.RefinementCtx) => {
  if (!endDate) return;

  const [startDay, startMonth, startYear] = startDate.split('-').map(Number);
  const [endDay, endMonth, endYear] = endDate.split('-').map(Number);

  const start = new Date(startYear, startMonth - 1, startDay);
  const end = new Date(endYear, endMonth - 1, endDay);

  if (end < start) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: MESSAGES.returnDateAfterStart,
      path: ['endDate'],
    });
  }
};

// Function for ‘one-way’ validation - checking if origin and destination are different
const validateOneWayTrip = (origin: string, destination: string, ctx: z.RefinementCtx) => {
  if (origin === destination) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: MESSAGES.oneWayDifferentLocations,
      path: ['destination'],
    });
  }
};

export const FlightFormSchema = z.object({
  origin: z.string().min(1, MESSAGES.originRequired),
  destination: z.string().min(1, MESSAGES.destinationRequired),
  startDate: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, MESSAGES.startDateFormat),
  endDate: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{4}$/, MESSAGES.endDateFormat)
    .optional(),
  trip: z.enum(['one-way', 'round-trip']),
})
  .superRefine((data, ctx) => {
    if (data.trip === 'one-way') validateOneWayTrip(data.origin, data.destination, ctx);
    if (data.trip === 'round-trip') validateRoundTripDates(data.startDate, data.endDate, ctx);
  });

export type FlightFormFields = z.infer<typeof FlightFormSchema>;
