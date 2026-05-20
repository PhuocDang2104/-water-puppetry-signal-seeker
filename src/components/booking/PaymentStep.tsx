"use client";

import { motion } from "framer-motion";
import { CreditCard, ReceiptText } from "lucide-react";
import { seatPrice } from "@/data/seats";
import { cn } from "@/lib/cn";
import { formatCurrency, formatDisplayDate, makeOrderCode } from "@/lib/format";
import type { ContactInfo, InvoiceInfo, Show } from "@/types/booking";

type PaymentStepProps = {
  show: Show;
  selectedDate?: string;
  selectedTime?: string;
  selectedSeats: string[];
  contactInfo: ContactInfo;
  needInvoice: boolean;
  invoiceInfo: InvoiceInfo;
  acceptedTerms: boolean;
  onContactChange: (field: keyof ContactInfo, value: string) => void;
  onNeedInvoiceChange: (value: boolean) => void;
  onInvoiceChange: (field: keyof InvoiceInfo, value: string) => void;
  onAcceptedTermsChange: (value: boolean) => void;
  onPay: () => void;
};

export function PaymentStep({
  show,
  selectedDate,
  selectedTime,
  selectedSeats,
  contactInfo,
  needInvoice,
  invoiceInfo,
  acceptedTerms,
  onContactChange,
  onNeedInvoiceChange,
  onInvoiceChange,
  onAcceptedTermsChange,
  onPay
}: PaymentStepProps) {
  const total = selectedSeats.length * seatPrice;

  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.35 }}
      className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[0.9fr_1.1fr]"
    >
      <div className="border border-deepGreen/60">
        <PanelTitle>Thông tin thanh toán</PanelTitle>
        <div className="space-y-3 p-3 text-xs sm:p-4">
          <InfoRow label="Mã đơn hàng" value={makeOrderCode(new Date(2026, 4, 26))} />
          <InfoRow label="Vở diễn" value={show.title.replace("Vở Rối Nước ", "")} />
          <InfoRow label="Suất diễn" value={`${formatDisplayDate(selectedDate)} ${selectedTime ?? ""}`} />
          <InfoRow
            label="Trạng thái"
            value={<span className="rounded-sm bg-paleMint px-2 py-0.5 font-bold">Chờ thanh toán</span>}
          />
          <div>
            <p className="mb-1.5 font-bold">Số lượng:</p>
            <table className="w-full border-collapse text-center text-xs">
              <thead className="bg-lightGray font-bold">
                <tr>
                  <th className="border border-deepGreen/45 px-2 py-2">Số ghế</th>
                  <th className="border border-deepGreen/45 px-2 py-2">SL</th>
                  <th className="border border-deepGreen/45 px-2 py-2">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {selectedSeats.map((seat) => (
                  <tr key={seat}>
                    <td className="border border-deepGreen/35 px-2 py-2">{seat}</td>
                    <td className="border border-deepGreen/35 px-2 py-2">1</td>
                    <td className="border border-deepGreen/35 px-2 py-2">{formatCurrency(seatPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between gap-3 text-xs">
            <span>Tổng số tiền cần thanh toán:</span>
            <motion.span
              key={total}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-bold text-deepGreen"
            >
              {formatCurrency(total)}
            </motion.span>
          </div>
          <label className="flex items-start gap-2 text-[11px] italic text-deepGreen">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => onAcceptedTermsChange(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-deepGreen"
            />
            Tôi đồng ý với các điều khoản & điều kiện thanh toán
          </label>
          <button
            type="button"
            onClick={onPay}
            disabled={!acceptedTerms || selectedSeats.length === 0}
            className={cn(
              "focus-ring mx-auto flex min-h-14 w-full max-w-[190px] flex-col items-center justify-center rounded-lg bg-deepGreen px-4 py-2 text-sm font-bold text-white shadow-[0_14px_32px_rgba(13,90,73,0.25)] transition hover:bg-darkGreen",
              (!acceptedTerms || selectedSeats.length === 0) && "cursor-not-allowed opacity-45"
            )}
          >
            <span className="inline-flex items-center gap-1.5 text-[11px] text-gold">
              <CreditCard className="h-3.5 w-3.5" /> VNPay
            </span>
            THANH TOÁN NGAY
          </button>
        </div>
      </div>

      <div className="border border-deepGreen/60">
        <PanelTitle>Thông tin liên hệ</PanelTitle>
        <div className="grid gap-2.5 p-3 sm:p-4">
          <PaymentField label="Tên đầy đủ">
            <input
              value={contactInfo.fullName}
              onChange={(event) => onContactChange("fullName", event.target.value)}
              placeholder="Nhập tên của bạn"
              className={inputClass()}
            />
          </PaymentField>
          <PaymentField label="Email" note="*Vé sẽ được gửi đến email của bạn">
            <input
              value={contactInfo.email}
              onChange={(event) => onContactChange("email", event.target.value)}
              placeholder="Nhập email của bạn"
              className={inputClass()}
            />
          </PaymentField>
          <PaymentField label="Điện thoại" note="*Nhân viên của chúng tôi sẽ hỗ trợ bạn khi cần thiết">
            <input
              value={contactInfo.phone}
              onChange={(event) => onContactChange("phone", event.target.value)}
              placeholder="Nhập số điện thoại"
              className={inputClass()}
            />
          </PaymentField>
          <PaymentField label="Yêu cầu khác">
            <input
              value={contactInfo.note}
              onChange={(event) => onContactChange("note", event.target.value)}
              placeholder="Chúng tôi sẽ nỗ lực đáp ứng các yêu cầu của bạn nếu có thể"
              className={inputClass()}
            />
          </PaymentField>
          <label className="flex items-center gap-2 text-xs italic">
            <input
              type="checkbox"
              checked={needInvoice}
              onChange={(event) => onNeedInvoiceChange(event.target.checked)}
              className="h-4 w-4 accent-deepGreen"
            />
            <ReceiptText className="h-3.5 w-3.5 text-gold" />
            Xuất hóa đơn
          </label>
          {needInvoice && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="grid gap-2.5"
            >
              <PaymentField label="Tên đơn vị">
                <input
                  value={invoiceInfo.companyName}
                  onChange={(event) => onInvoiceChange("companyName", event.target.value)}
                  placeholder="Nhập tên đơn vị"
                  className={inputClass()}
                />
              </PaymentField>
              <PaymentField label="Mã số thuế">
                <input
                  value={invoiceInfo.taxCode}
                  onChange={(event) => onInvoiceChange("taxCode", event.target.value)}
                  placeholder="Mã số thuế"
                  className={inputClass()}
                />
              </PaymentField>
              <PaymentField label="Email hóa đơn">
                <input
                  value={invoiceInfo.invoiceEmail}
                  onChange={(event) => onInvoiceChange("invoiceEmail", event.target.value)}
                  placeholder="Email nhận hóa đơn"
                  className={inputClass()}
                />
              </PaymentField>
              <PaymentField label="Địa chỉ hóa đơn">
                <input
                  value={invoiceInfo.invoiceAddress}
                  onChange={(event) => onInvoiceChange("invoiceAddress", event.target.value)}
                  placeholder="Địa chỉ nhận hóa đơn"
                  className={inputClass()}
                />
              </PaymentField>
            </motion.div>
          )}
          <p className="text-[10px] italic text-deepGreen/75">
            *Chúng tôi cam kết bảo mật tất cả thông tin cá nhân của khách hàng
          </p>
        </div>
      </div>
    </motion.section>
  );
}

function PanelTitle({ children }: { children: string }) {
  return (
    <div className="border-b border-deepGreen/45 bg-lightGray px-4 py-3 text-center">
      <h2 className="heading-display text-[clamp(1.35rem,3vw,2.55rem)] text-deepGreen">{children}</h2>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-2 text-xs">
      <span>{label}:</span>
      <span className="text-right font-bold">{value}</span>
    </div>
  );
}

function PaymentField({
  label,
  children,
  note
}: {
  label: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <label className="grid gap-1.5 text-xs font-bold text-deepGreen sm:grid-cols-[130px_1fr] sm:items-start">
      <span className="pt-1.5">{label}:</span>
      <span>
        {children}
        {note && <span className="mt-0.5 block text-[10px] font-normal italic text-deepGreen/75">{note}</span>}
      </span>
    </label>
  );
}

function inputClass() {
  return "focus-ring w-full border border-deepGreen/40 bg-white px-3 py-2 text-xs font-normal text-deepGreen outline-none placeholder:text-deepGreen/40";
}
