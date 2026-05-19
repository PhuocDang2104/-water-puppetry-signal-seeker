"use client";

import { motion } from "framer-motion";
import { MinusCircle } from "lucide-react";
import type { ContactInfo } from "@/types/booking";
import { seatPrice } from "@/data/seats";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/cn";

type ContactInfoStepProps = {
  selectedSeats: string[];
  contactInfo: ContactInfo;
  errors: Partial<Record<keyof ContactInfo, string>>;
  onContactChange: (field: keyof ContactInfo, value: string) => void;
  onRemoveSeat: (label: string) => void;
};

export function ContactInfoStep({
  selectedSeats,
  contactInfo,
  errors,
  onContactChange,
  onRemoveSeat
}: ContactInfoStepProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.35 }}
      className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr]"
    >
      <div className="border border-deepGreen/60">
        <PanelTitle>Danh sách ghế</PanelTitle>
        <div className="p-5 sm:p-7">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-center text-sm">
              <thead>
                <tr className="bg-lightGray font-bold">
                  <th className="border border-deepGreen/45 px-3 py-4">#</th>
                  <th className="border border-deepGreen/45 px-3 py-4">Số ghế</th>
                  <th className="border border-deepGreen/45 px-3 py-4">Số tiền</th>
                  <th className="border border-deepGreen/45 px-3 py-4">
                    <span className="sr-only">Thao tác</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedSeats.map((seat, index) => (
                  <tr key={seat} className="bg-white">
                    <td className="border border-deepGreen/35 px-3 py-4">{index + 1}</td>
                    <td className="border border-deepGreen/35 px-3 py-4">{seat}</td>
                    <td className="border border-deepGreen/35 px-3 py-4">{formatCurrency(seatPrice)}</td>
                    <td className="border border-deepGreen/35 px-3 py-4">
                      <button
                        type="button"
                        aria-label={`Bỏ ghế ${seat}`}
                        onClick={() => onRemoveSeat(seat)}
                        className="focus-ring inline-grid h-8 w-8 place-items-center rounded-full text-deepGreen hover:bg-paleMint"
                      >
                        <MinusCircle className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {selectedSeats.length === 0 && (
                  <tr>
                    <td colSpan={4} className="border border-deepGreen/35 px-3 py-8 text-deepGreen/70">
                      Chưa chọn ghế
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="border border-deepGreen/60">
        <PanelTitle>Thông tin liên hệ</PanelTitle>
        <div className="grid gap-4 p-5 sm:p-7">
          <Field label="Tên đầy đủ" error={errors.fullName}>
            <input
              value={contactInfo.fullName}
              onChange={(event) => onContactChange("fullName", event.target.value)}
              placeholder="Nhập tên của bạn"
              className={inputClass(errors.fullName)}
            />
          </Field>
          <Field label="Email" error={errors.email} note="*Vé sẽ được gửi đến email của bạn">
            <input
              type="email"
              value={contactInfo.email}
              onChange={(event) => onContactChange("email", event.target.value)}
              placeholder="Nhập email của bạn"
              className={inputClass(errors.email)}
            />
          </Field>
          <Field label="Điện thoại" error={errors.phone} note="*Nhân viên của chúng tôi sẽ hỗ trợ bạn khi cần thiết">
            <input
              value={contactInfo.phone}
              onChange={(event) => onContactChange("phone", event.target.value)}
              placeholder="Nhập số điện thoại"
              className={inputClass(errors.phone)}
            />
          </Field>
          <Field label="Quốc tịch" error={errors.nationality}>
            <select
              value={contactInfo.nationality}
              onChange={(event) => onContactChange("nationality", event.target.value)}
              className={inputClass(errors.nationality)}
            >
              <option value="">Chọn quốc tịch</option>
              <option value="Việt Nam">Việt Nam</option>
              <option value="English">English</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="Korea">Korea</option>
            </select>
          </Field>
          <Field
            label="Yêu cầu khác của bạn"
            note="*Chúng tôi cam kết bảo mật tất cả các thông tin cá nhân của khách hàng"
          >
            <textarea
              value={contactInfo.note}
              onChange={(event) => onContactChange("note", event.target.value)}
              placeholder="Chúng tôi sẽ nỗ lực đáp ứng các yêu cầu của bạn nếu có thể"
              className={cn(inputClass(), "min-h-[120px] resize-none py-3")}
            />
          </Field>
        </div>
      </div>
    </motion.section>
  );
}

function PanelTitle({ children }: { children: string }) {
  return (
    <div className="border-b border-deepGreen/45 bg-lightGray px-5 py-5 text-center">
      <h2 className="heading-display text-[clamp(2rem,4.2vw,4.2rem)] text-deepGreen">{children}</h2>
    </div>
  );
}

function Field({
  label,
  children,
  note,
  error
}: {
  label: string;
  children: React.ReactNode;
  note?: string;
  error?: string;
}) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <label htmlFor={id} className="grid gap-2 text-sm font-bold text-deepGreen sm:grid-cols-[150px_1fr] sm:items-start">
      <span className="pt-2">{label}:</span>
      <span>
        {children}
        {note && <span className="mt-1 block text-[11px] font-normal italic text-deepGreen/75">{note}</span>}
        {error && <span className="mt-1 block text-[11px] text-redSon">{error}</span>}
      </span>
    </label>
  );
}

function inputClass(error?: string) {
  return cn(
    "focus-ring w-full border bg-white px-4 py-3 text-sm font-normal text-deepGreen outline-none placeholder:text-deepGreen/40",
    error ? "border-redSon" : "border-deepGreen/40"
  );
}
