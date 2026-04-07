import { z } from "zod";

export const lineItemSchema = z.object({
  description: z.string().min(2),
  quantity: z.number().positive(),
  unitPrice: z.number().nonnegative(),
});

export const createInvoiceSchema = z.object({
  clientId: z.string().uuid("A valid client is required."),
  amount: z.number().nonnegative("Amount must be at least 0."),
  status: z.enum(["draft", "sent", "paid"]).default("draft"),
  dueDate: z.string().date("Due date must be a valid date."),
  lineItems: z.array(lineItemSchema).min(1, "At least one line item is required."),
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
