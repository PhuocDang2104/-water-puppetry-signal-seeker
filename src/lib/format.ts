export function formatCurrency(amount: number) {
  return `${new Intl.NumberFormat("vi-VN").format(amount)}đ`;
}

export function formatDisplayDate(date?: string) {
  if (!date) return "Chưa chọn";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export function makeOrderCode(date = new Date()) {
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `HDV-${year}${month}${day}-0050`;
}
