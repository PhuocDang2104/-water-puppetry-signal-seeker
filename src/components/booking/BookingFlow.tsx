"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { BookingLayout } from "@/components/booking/BookingLayout";
import { ContactInfoStep } from "@/components/booking/ContactInfoStep";
import { DateSelectionStep } from "@/components/booking/DateSelectionStep";
import { PaymentStep } from "@/components/booking/PaymentStep";
import { SeatSelectionStep } from "@/components/booking/SeatSelectionStep";
import { defaultSelectedSeats } from "@/data/seats";
import { getShowById } from "@/data/shows";
import type { BookingState, ContactInfo, InvoiceInfo } from "@/types/booking";

const defaultContact: ContactInfo = {
  fullName: "Nguyễn Văn A",
  email: "khachhang@example.com",
  phone: "0901234567",
  nationality: "Việt Nam",
  note: "Tôi muốn nhận vé qua email."
};

const emptyInvoice: InvoiceInfo = {
  companyName: "",
  taxCode: "",
  invoiceEmail: "",
  invoiceAddress: ""
};

type BookingFlowProps = {
  showId: string;
};

export function BookingFlow({ showId }: BookingFlowProps) {
  const router = useRouter();
  const show = useMemo(() => getShowById(showId), [showId]);
  const [currentStep, setCurrentStep] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInfo, string>>>({});
  const [booking, setBooking] = useState<BookingState>({
    showId,
    selectedDate: "2026-05-23",
    selectedTime: "10:30 - 11:15",
    selectedSeats: defaultSelectedSeats,
    contactInfo: defaultContact,
    needInvoice: false,
    invoiceInfo: emptyInvoice
  });

  function updateContactInfo(field: keyof ContactInfo, value: string) {
    setBooking((current) => ({
      ...current,
      contactInfo: { ...current.contactInfo, [field]: value }
    }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function updateInvoiceInfo(field: keyof InvoiceInfo, value: string) {
    setBooking((current) => ({
      ...current,
      invoiceInfo: { ...current.invoiceInfo, [field]: value }
    }));
  }

  function toggleSeat(label: string) {
    setBooking((current) => {
      const selected = current.selectedSeats.includes(label);
      return {
        ...current,
        selectedSeats: selected
          ? current.selectedSeats.filter((seat) => seat !== label)
          : [...current.selectedSeats, label].sort()
      };
    });
  }

  function removeSeat(label: string) {
    setBooking((current) => ({
      ...current,
      selectedSeats: current.selectedSeats.filter((seat) => seat !== label)
    }));
  }

  function validateContact() {
    const nextErrors: Partial<Record<keyof ContactInfo, string>> = {};
    if (!booking.contactInfo.fullName.trim()) nextErrors.fullName = "Vui lòng nhập tên đầy đủ";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.contactInfo.email)) {
      nextErrors.email = "Email chưa đúng định dạng";
    }
    if (!booking.contactInfo.phone.trim()) nextErrors.phone = "Vui lòng nhập số điện thoại";
    if (!booking.contactInfo.nationality.trim()) nextErrors.nationality = "Vui lòng chọn quốc tịch";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goBack() {
    if (currentStep === 0) {
      router.push("/#shows");
      return;
    }
    setCompleted(false);
    setCurrentStep((step) => step - 1);
  }

  function goNext() {
    if (currentStep === 2 && !validateContact()) return;
    if (currentStep === 3) {
      if (!acceptedTerms) return;
      setCompleted(true);
      return;
    }
    setCompleted(false);
    setCurrentStep((step) => Math.min(step + 1, 3));
  }

  const nextDisabled =
    (currentStep === 0 && (!booking.selectedDate || !booking.selectedTime)) ||
    (currentStep === 1 && booking.selectedSeats.length === 0) ||
    (currentStep === 3 && (!acceptedTerms || booking.selectedSeats.length === 0));

  return (
    <BookingLayout
      currentStep={currentStep}
      isLastStep={currentStep === 3}
      showTitle={show.title}
      nextDisabled={nextDisabled}
      onBack={goBack}
      onNext={goNext}
    >
      {completed && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-5 flex max-w-3xl items-center justify-center gap-3 rounded-full bg-paleMint px-5 py-3 text-center text-sm font-bold text-deepGreen"
        >
          <CheckCircle2 className="h-5 w-5 text-gold" />
          Đã ghi nhận thông tin thanh toán mẫu. Vé sẽ được gửi đến email sau khi thanh toán thành công.
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -28 }}
          transition={{ duration: 0.28 }}
        >
          {currentStep === 0 && (
            <DateSelectionStep
              selectedDate={booking.selectedDate}
              selectedTime={booking.selectedTime}
              onSelect={(date, time) =>
                setBooking((current) => ({ ...current, selectedDate: date, selectedTime: time }))
              }
            />
          )}
          {currentStep === 1 && (
            <SeatSelectionStep selectedSeats={booking.selectedSeats} onToggleSeat={toggleSeat} />
          )}
          {currentStep === 2 && (
            <ContactInfoStep
              selectedSeats={booking.selectedSeats}
              contactInfo={booking.contactInfo}
              errors={errors}
              onContactChange={updateContactInfo}
              onRemoveSeat={removeSeat}
            />
          )}
          {currentStep === 3 && (
            <PaymentStep
              show={show}
              selectedDate={booking.selectedDate}
              selectedTime={booking.selectedTime}
              selectedSeats={booking.selectedSeats}
              contactInfo={booking.contactInfo}
              needInvoice={booking.needInvoice}
              invoiceInfo={booking.invoiceInfo}
              acceptedTerms={acceptedTerms}
              onContactChange={updateContactInfo}
              onNeedInvoiceChange={(value) => setBooking((current) => ({ ...current, needInvoice: value }))}
              onInvoiceChange={updateInvoiceInfo}
              onAcceptedTermsChange={setAcceptedTerms}
              onPay={goNext}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </BookingLayout>
  );
}
