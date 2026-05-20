"use client";

import { motion } from "framer-motion";
import { MinusCircle } from "lucide-react";
import { seatPrice } from "@/data/seats";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/format";
import type { ContactInfo } from "@/types/booking";

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
      className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[0.86fr_1.14fr]"
    >
      <div className="border border-deepGreen/60">
        <PanelTitle>Danh sách ghế</PanelTitle>
        <div className="p-3 sm:p-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] border-collapse text-center text-xs">
              <thead>
                <tr className="bg-lightGray font-bold">
                  <th className="border border-deepGreen/45 px-2 py-2">#</th>
                  <th className="border border-deepGreen/45 px-2 py-2">Số ghế</th>
                  <th className="border border-deepGreen/45 px-2 py-2">Số tiền</th>
                  <th className="border border-deepGreen/45 px-2 py-2">
                    <span className="sr-only">Thao tác</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedSeats.map((seat, index) => (
                  <tr key={seat} className="bg-white">
                    <td className="border border-deepGreen/35 px-2 py-2">{index + 1}</td>
                    <td className="border border-deepGreen/35 px-2 py-2">{seat}</td>
                    <td className="border border-deepGreen/35 px-2 py-2">{formatCurrency(seatPrice)}</td>
                    <td className="border border-deepGreen/35 px-2 py-2">
                      <button
                        type="button"
                        aria-label={`Bỏ ghế ${seat}`}
                        onClick={() => onRemoveSeat(seat)}
                        className="focus-ring inline-grid h-6 w-6 place-items-center rounded-full text-deepGreen hover:bg-paleMint"
                      >
                        <MinusCircle className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {selectedSeats.length === 0 && (
                  <tr>
                    <td colSpan={4} className="border border-deepGreen/35 px-2 py-5 text-deepGreen/70">
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
        <div className="grid gap-2.5 p-3 sm:p-4">
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
            label="Yêu cầu khác"
            note="*Chúng tôi cam kết bảo mật tất cả thông tin cá nhân của khách hàng"
          >
            <textarea
              value={contactInfo.note}
              onChange={(event) => onContactChange("note", event.target.value)}
              placeholder="Chúng tôi sẽ nỗ lực đáp ứng các yêu cầu của bạn nếu có thể"
              className={cn(inputClass(), "min-h-[74px] resize-none py-2")}
            />
          </Field>
        </div>
      </div>
    </motion.section>
  );
}

function PanelTitle({ children }: { children: string }) {
  return (
    <div className="border-b border-deepGreen/45 bg-lightGray px-4 py-3 text-center">
      <h2 className="heading-display text-[clamp(1.35rem,3vw,2.6rem)] text-deepGreen">{children}</h2>
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
    <label htmlFor={id} className="grid gap-1.5 text-xs font-bold text-deepGreen sm:grid-cols-[130px_1fr] sm:items-start">
      <span className="pt-1.5">{label}:</span>
      <span>
        {children}
        {note && <span className="mt-0.5 block text-[10px] font-normal italic text-deepGreen/75">{note}</span>}
        {error && <span className="mt-0.5 block text-[10px] text-redSon">{error}</span>}
      </span>
    </label>
  );
}

function inputClass(error?: string) {
  return cn(
    "focus-ring w-full border bg-white px-3 py-2 text-xs font-normal text-deepGreen outline-none placeholder:text-deepGreen/40",
    error ? "border-redSon" : "border-deepGreen/40"
  );
}
