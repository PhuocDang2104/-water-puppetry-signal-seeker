export type Show = {
  id: string;
  title: string;
  duration: string;
  cast: string;
  description: string;
  image: string;
};

export type ShowTime = {
  date: string;
  times: string[];
};

export type SeatStatus = "available" | "booked" | "selected";

export type Seat = {
  id: string;
  label: string;
  zone: "A" | "B";
  row: string;
  number: number;
  status: "available" | "booked";
};

export type ContactInfo = {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  note: string;
};

export type InvoiceInfo = {
  companyName: string;
  taxCode: string;
  invoiceEmail: string;
  invoiceAddress: string;
};

export type BookingState = {
  showId: string;
  selectedDate?: string;
  selectedTime?: string;
  selectedSeats: string[];
  contactInfo: ContactInfo;
  needInvoice: boolean;
  invoiceInfo: InvoiceInfo;
};
