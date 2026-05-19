# SPEC FRONTEND NEXT.JS — WEBSITE MÚA RỐI NƯỚC RỒNG PHƯƠNG NAM

## 1. Mục tiêu

Xây dựng một website frontend bằng **Next.js** có giao diện lấy cảm hứng trực tiếp từ UI mẫu đã cung cấp: trang giới thiệu nghệ thuật múa rối nước, danh sách vở diễn và flow đặt vé nhiều bước. Website cần mang cảm giác **truyền thống Việt Nam, sân khấu múa rối nước, mặt nước, gỗ, xanh trầm, đỏ son, vàng ánh đèn**, nhưng vẫn hiện đại, mượt, responsive và có animation đẹp.

Yêu cầu quan trọng: **code frontend giống tinh thần UI trong ảnh**, không cần clone pixel-perfect 100%, nhưng phải giữ được bố cục, màu sắc, typography, card style, booking flow và không khí văn hóa dân gian.

---

## 2. Tech stack đề xuất

- Framework: **Next.js 14+ hoặc 15+ App Router**
- Language: **TypeScript**
- Styling: **Tailwind CSS**
- Animation: **Framer Motion**
- Icon: **Lucide React**
- State management: React state / Zustand nếu cần
- Date handling: date-fns
- Image: `next/image`
- Font: dùng Google Fonts hoặc local font

Font đề xuất:

- Heading: một font display đậm, hơi retro / geometric, ví dụ `Paytone One`, `Baloo 2`, `Coiny`, `Bungee`, hoặc local custom font nếu có.
- Body: monospace hoặc semi-mono nhẹ giống UI mẫu, ví dụ `Space Mono`, `JetBrains Mono`, `Roboto Mono`, hoặc `IBM Plex Mono`.

Nếu chưa có font chính xác, dùng:

```tsx
import { Paytone_One, Space_Mono } from "next/font/google";
```

---

## 3. Asset input

Tôi sẽ cung cấp một thư mục hình ảnh cho Codex tham khảo. Hãy thiết kế code để dễ thay ảnh.

Cấu trúc asset mong muốn:

```txt
/public/images/
  hero/
    hero-water-puppet.jpg
    stage-curtain.png
  about/
    puppet-intro-1.jpg
    puppet-intro-2.jpg
    artisan-workshop.jpg
  shows/
    little-mermaid.jpg
    hoa-dat-viet.jpg
  patterns/
    water-texture.jpg
    vietnamese-pattern.png
    bamboo-texture.jpg
  icons/
    flag-vn.svg
    flag-en.svg
```

Nếu ảnh chưa tồn tại, tạo fallback bằng placeholder gradient/card, nhưng code phải ưu tiên load asset thật từ `/public/images/...`.

---

## 4. Design language tổng thể

### 4.1 Màu sắc

Dùng palette chính:

```ts
const colors = {
  deepGreen: "#0D5A49",
  darkGreen: "#064437",
  mutedGreen: "#2F6B5A",
  waterGreen: "#426F61",
  paleMint: "#EAF1ED",
  lightGray: "#D9DEDC",
  cream: "#F7F5EF",
  white: "#FFFFFF",
  black: "#111111",
  redSon: "#B72124",
  gold: "#D7A83F",
  darkOverlay: "rgba(0,0,0,0.45)"
};
```

Tinh thần:

- Nền chính: trắng ngà / cream.
- Text chính: xanh lá đậm.
- Button chính: xanh đậm, chữ trắng.
- Card: xám xanh nhạt, border xanh mảnh.
- Accent: đỏ son + vàng cho chi tiết truyền thống.
- Hero: ảnh nền tối với overlay xanh/đen.

### 4.2 Typography

Heading phải rất nổi bật, uppercase, tracking rộng, đậm, gần giống UI mẫu:

```css
.heading-display {
  font-family: var(--font-heading);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 0.95;
}
```

Body giống UI mẫu: hơi monospace, nhỏ gọn, chắc chữ:

```css
.body-copy {
  font-family: var(--font-body);
  letter-spacing: 0.01em;
  line-height: 1.5;
}
```

---

## 5. Cấu trúc page

Website cần có các route chính:

```txt
/
/shows
/booking/[showId]
```

Có thể code single-page trước, nhưng component phải tách rõ để dễ mở rộng.

---

## 6. Trang Home

### 6.1 Hero section

Lấy cảm hứng từ ảnh đầu tiên.

Bố cục:

- Full viewport hoặc khoảng `min-h-screen`.
- Background là ảnh sân khấu / con rối đứng dưới nước.
- Overlay tối nhẹ để chữ nổi rõ.
- Navbar dạng pill trong suốt, đặt giữa trên cùng.
- Menu: `Trang chủ`, `Dịch vụ`, `Vở diễn`, `Tin tức`, `Đào tạo`.
- Bên phải dưới hero có switch ngôn ngữ bằng 2 nút tròn cờ Việt Nam / Anh.
- Text bên trái:
  - Eyebrow: `NGHỆ THUẬT SÂN KHẤU DÂN GIAN TRUYỀN THỐNG`
  - Title lớn: `MÚA RỐI NƯỚC` và `RỒNG PHƯƠNG NAM`
  - Metadata:
    - Địa điểm: `Bên trong Bảo tàng Lịch sử, Nguyễn Bỉnh Khiêm, Phường Sài Gòn, Thành phố Hồ Chí Minh`
    - Thời gian: `Thứ 7 & Chủ nhật hằng tuần`
    - Số điện thoại: `0813.686.565 - 0928.055.992 - 0931.477.699`
  - CTA: `Khám phá ngay →`

Animation:

- Hero image scale nhẹ từ `1.05` về `1` khi load.
- Text stagger fade-up.
- Navbar slide-down.
- CTA hover: dịch sang phải nhẹ, shadow mềm.
- Có lớp water shimmer dưới cùng bằng pseudo-element hoặc div gradient động.

Component gợi ý:

```txt
components/home/HeroSection.tsx
components/layout/Navbar.tsx
components/common/LanguageSwitch.tsx
```

### 6.2 About section — Giới thiệu

Lấy cảm hứng từ ảnh 2 và 3.

Bố cục:

- Section nền trắng/cream.
- Header section có vòng tròn nét đứt chứa chữ `A`, đường kẻ ngang và label `Giới thiệu`.
- Các block ảnh + text card sắp xếp dạng editorial layout không đều, giống poster truyền thống.
- Có đường viền nét đứt màu xanh tạo thành đường cong lớn chạy phía sau ảnh/card.

Nội dung card 1:

Title: `MÚA RỐI NƯỚC LÀ GÌ?`

Text:

`Múa rối nước là một loại hình nghệ thuật biểu diễn truyền thống và giàu tính nghệ thuật trong nền văn minh đồng bằng sông Cửu Long của Việt Nam. Hằng năm, vào những dịp đặc biệt như Tết Nguyên Đán hay Trung thu, người dân và trẻ em tập trung quanh sân khấu, nơi những con rối bắt đầu kể những câu chuyện cổ tích, hoặc những hoạt động thường nhật sau một mùa làm việc vất vả. Múa rối nước tượng trưng cho trí tuệ của người lao động mang trong mình tâm hồn nghệ sĩ.`

Card 2:

Title: `ĐẶC ĐIỂM`

Text:

`Múa rối nước gồm hai phần chính: con rối và nước. Con rối là những hình nộm bằng gỗ đơn giản với đường nét cứng cáp và màu sắc dân dã. Nhưng sự kết hợp giữa chúng với nước, chất lỏng mềm mại, tạo nên hiệu ứng ảo diệu. Vì được người nông dân tạo ra để giải trí sau một mùa màng vất vả, nên nó vẫn mang đậm nét mộc mạc của người Việt Nam.`

Card 3:

Title: `THỰC TRẠNG`

Text:

`Ngày nay, sân khấu múa rối được đầu tư và chuyển vào sân khấu trong nhà với mục đích phát triển và bảo tồn. Tuy nhiên, các nghệ nhân vẫn cố gắng giữ gìn truyền thống từ thời xa xưa. Hiện nay, với sự hỗ trợ của các cơ quan chức năng và lòng nhiệt huyết của các nghệ sĩ, múa rối đã được đưa đến các thành phố lớn và các không gian nghệ thuật truyền thống để khán giả hiện đại có thể tiếp cận nhiều hơn.`

Animation:

- Khi scroll vào section: ảnh fade-in + slide từ trái/phải.
- Dotted path có animation draw path hoặc dash offset chạy nhẹ.
- Card hover: nâng lên 4px, shadow mềm, border xanh đậm hơn.

Component:

```txt
components/home/AboutSection.tsx
components/common/SectionHeader.tsx
components/common/DottedPath.tsx
```

---

## 7. Trang /shows — Danh sách vở diễn

Lấy cảm hứng từ ảnh 4.

Layout:

- Nền cream/trắng.
- Header section có vòng tròn chữ `C`, line ngang, label `Vở diễn`.
- Mỗi show là một row gồm poster bên trái, nội dung giữa, action bên phải.
- Khoảng cách rộng, không bị chật.

Show item 1:

```ts
{
  id: "little-mermaid",
  title: "VỞ RỐI NƯỚC NÀNG TIÊN CÁ",
  duration: "60 phút",
  cast: "Tập thể diễn viên nhà hát Phương Nam",
  description: "Giữa lòng đại dương bị đe doạ bởi rác thải gây ô nhiễm, nàng tiên cá đem lòng say mê thế giới loài người và cứu chàng hoàng tử thoát nạn. Hành trình đến với giọng hát đã được sống trên cạn không chỉ là câu chuyện yêu đương rung động, mà qua vở diễn Giấc Mơ Nàng Tiên Cá còn là lời nhắc nhẹ nhàng về tình yêu và sự thấu hiểu giữa con người với thiên nhiên xanh lành cho đất trời và đại dương xanh. Một tương lai bền vững, câu chuyện cổ tích lung linh được mặt nước, những nhân vật rối đáng yêu cùng với hiệu ứng ánh sáng, âm nhạc rộn ràng sẽ đưa bạn vào một thế giới đầy màu sắc và bất ngờ.",
  image: "/images/shows/little-mermaid.jpg"
}
```

Show item 2:

```ts
{
  id: "hoa-dat-viet",
  title: "VỞ RỐI NƯỚC HOA ĐẤT VIỆT",
  duration: "45 phút",
  cast: "Tập thể diễn viên nhà hát Phương Nam",
  description: "Hoa Đất Việt là một chương trình múa rối nước được thực hiện bởi đội ngũ nghệ sĩ chuyên nghiệp tại Việt Nam, chương trình quy tụ các tiết mục trò diễn rối nước cổ truyền hấp dẫn, vui nhộn. Với sự kết hợp tinh tế giữa những màn rối nước đầy màu sắc, vũ đạo ấn tượng và âm nhạc sống động, chương trình hứa hẹn sẽ đưa khán giả vào một không gian cổ tích đầy mê hoặc và lý thú. Đừng bỏ lỡ cơ hội được tham gia chương trình Múa Rối Nước Hoa Đất Việt tại Nhà hát nghệ thuật Phương Nam.",
  image: "/images/shows/hoa-dat-viet.jpg"
}
```

Button:

- `Chỗ ngồi` với icon armchair/chair.
- `Đặt vé` với icon ticket.

Animation:

- Poster hover scale nhẹ.
- Row reveal khi scroll.
- Button hover fill/shine nhẹ.
- Có thể thêm background water ripple rất nhẹ.

Component:

```txt
components/shows/ShowList.tsx
components/shows/ShowCard.tsx
```

---

## 8. Booking flow

Route: `/booking/[showId]`

Flow gồm 4 bước giống UI mẫu:

1. Chọn suất diễn
2. Chọn ghế
3. Thông tin liên hệ
4. Chi tiết thanh toán

Dùng state để quản lý step hiện tại. Không cần backend thật, chỉ cần mock data.

### 8.1 Booking layout chung

Bố cục giống ảnh:

- Nền trắng.
- Góc trên trái: nút back dạng pill border đen có arrow left.
- Góc trên phải: arrow next hoặc nút `Hoàn tất` ở bước cuối.
- Trên cùng có stepper ngang.
- Stepper gồm label + icon tròn:
  - calendar
  - sofa/chair
  - id-card/contact
  - wallet/payment
- Active step: circle xanh đậm.
- Inactive step: circle xám nhạt.
- Line ngang xanh đậm chạy qua các step.

Component:

```txt
components/booking/BookingLayout.tsx
components/booking/BookingStepper.tsx
```

### 8.2 Step 1 — Chọn suất diễn

Lấy cảm hứng từ ảnh lịch tháng.

UI:

- Title lớn: `THÁNG 5 NĂM 2026`
- Hai nút tròn xanh đậm hai bên title để chuyển tháng.
- Calendar grid 7 cột: `T2 T3 T4 T5 T6 T7 CN`
- Các ô nền xám nhạt, border xanh mảnh.
- Ngày có suất diễn hiển thị pill xanh:
  - `10:30 – 11:15`
  - `14:30 – 15:15`
- Khi chọn suất, pill chuyển trạng thái active, có glow nhẹ.

Mock data:

```ts
const showTimes = [
  { date: "2026-05-23", times: ["10:30 – 11:15", "14:30 – 15:15"] },
  { date: "2026-05-30", times: ["10:30 – 11:15", "14:30 – 15:15"] }
];
```

Animation:

- Calendar fade-up.
- Time pill tap scale `0.96`.
- Month switch slide animation.

### 8.3 Step 2 — Chọn ghế

Lấy cảm hứng từ ảnh sơ đồ ghế.

UI:

- Khu A phía trên, khu B hai bên trái/phải.
- Trung tâm là sân khấu hình chữ nhật nền xám nhạt, text lớn `SÂN KHẤU`.
- Ghế là circle nhỏ có số.
- Legend fixed bottom center dạng black rounded pill:
  - trắng: `Chưa đặt`
  - xanh: `Đã đặt`
  - vàng nhạt: `Đang chọn`
  - giá: `150.000đ`
  - số ghế đã chọn
- Click ghế chưa đặt để chọn/bỏ chọn.
- Ghế đã đặt không click được.
- Hiển thị khu vực và hàng ghế giống mẫu: `A4 A3 A2 A1`, `B4 B3 B2 B1`, `KHU A`, `KHU B`.

Seat status:

```ts
type SeatStatus = "available" | "booked" | "selected";
```

Màu ghế:

- Available: trắng
- Booked: xanh đậm
- Selected: vàng nhạt `#FFF9C4`

Animation:

- Seat hover scale 1.1.
- Selected seat spring pop.
- Stage có shimmer/ripple nhẹ.

### 8.4 Step 3 — Thông tin liên hệ

Lấy cảm hứng từ ảnh form.

Layout 2 cột desktop:

Cột trái: `DANH SÁCH GHẾ`

- Table border xanh mảnh.
- Header xám nhạt.
- Cột: `#`, `Số ghế`, `Số tiền`, action remove.
- Ví dụ:
  - `1 | B3.10 | 150.000đ`
  - `2 | B3.12 | 150.000đ`

Cột phải: `THÔNG TIN LIÊN HỆ`

Input:

- Tên đầy đủ
- Email
- Điện thoại
- Quốc tịch select
- Yêu cầu khác của bạn textarea

Note nhỏ:

- `*Vé sẽ được gửi đến email của bạn`
- `*Nhân viên của chúng tôi sẽ hỗ trợ bạn khi cần thiết`
- `*Chúng tôi cam kết bảo mật tất cả các thông tin cá nhân của khách hàng`

Validation frontend đơn giản:

- Tên không rỗng
- Email đúng format
- SĐT không rỗng
- Quốc tịch không rỗng

### 8.5 Step 4 — Chi tiết thanh toán

Lấy cảm hứng từ ảnh cuối.

Layout 2 cột.

Cột trái: `THÔNG TIN THANH TOÁN`

Thông tin:

- Mã đơn hàng: `HDV-260521-0050`
- Vở diễn: `Hoa Đất Việt`
- Suất diễn: `21/5/2026 14:30–15:15`
- Trạng thái: pill `Chờ thanh toán`
- Table ghế: `Số ghế`, `Số lượng`, `Thành tiền`
- Tổng số tiền cần thanh toán: `300.000đ`
- Checkbox: `Tôi đồng ý với các điều khoản & điều kiện thanh toán`
- Button lớn: `THANH TOÁN NGAY` với logo VNPay giả lập hoặc text VNPay.

Cột phải: `THÔNG TIN LIÊN HỆ`

- Lặp lại thông tin form.
- Checkbox `Xuất hóa đơn`.
- Nếu chọn xuất hóa đơn, show fields:
  - Tên đơn vị
  - Mã số thuế
  - Email nhận hóa đơn
  - Địa chỉ nhận hóa đơn

Animation:

- Payment card slide-in.
- Tổng tiền count-up nhẹ.
- Button hover glow xanh.

---

## 9. Component structure đề xuất

```txt
src/
  app/
    layout.tsx
    page.tsx
    shows/
      page.tsx
    booking/
      [showId]/
        page.tsx
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    common/
      Button.tsx
      SectionHeader.tsx
      LanguageSwitch.tsx
      DottedPath.tsx
      AnimatedText.tsx
    home/
      HeroSection.tsx
      AboutSection.tsx
    shows/
      ShowList.tsx
      ShowCard.tsx
    booking/
      BookingLayout.tsx
      BookingStepper.tsx
      DateSelectionStep.tsx
      SeatSelectionStep.tsx
      ContactInfoStep.tsx
      PaymentStep.tsx
      SeatMap.tsx
      BookingSummary.tsx
  data/
    shows.ts
    seats.ts
  lib/
    format.ts
  types/
    booking.ts
  styles/
    globals.css
```

---

## 10. Data model

```ts
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
  note?: string;
};

export type BookingState = {
  showId: string;
  selectedDate?: string;
  selectedTime?: string;
  selectedSeats: string[];
  contactInfo: ContactInfo;
  needInvoice: boolean;
};
```

---

## 11. Responsive requirements

Desktop:

- Hero text left, image background full.
- About editorial layout dạng 2 cột tự do.
- Shows row ngang.
- Booking form 2 cột.
- Seat map full width.

Tablet:

- Shows có thể giữ row nhưng giảm gap.
- Booking form chuyển 1 cột nếu thiếu rộng.

Mobile:

- Navbar thành compact menu hoặc horizontal pill scroll.
- Hero title giảm size, text metadata ngắn hơn.
- About stack theo thứ tự ảnh/card.
- Shows stack poster trên, content dưới, button full width.
- Calendar grid vẫn 7 cột nhưng font nhỏ, time pill nhỏ.
- Seat map cho phép horizontal scroll.
- Stepper label có thể ẩn, chỉ giữ icon.

Breakpoints Tailwind:

```txt
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## 12. Animation detail

Dùng Framer Motion.

Variants:

```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 }
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 }
};
```

Áp dụng:

- Hero text: stagger.
- Card: whileInView fadeUp.
- Button: whileHover `{ scale: 1.03, x: 2 }`, whileTap `{ scale: 0.97 }`.
- Seat: spring pop khi chọn.
- Booking step transition: AnimatePresence mode wait, slide ngang.

Hiệu ứng nền:

- Water shimmer: radial-gradient hoặc linear-gradient animated.
- Dotted path: SVG path stroke-dasharray.
- Floating puppet decoration: một vài image nhỏ opacity thấp trôi nhẹ.

---

## 13. UI details cần giữ giống mẫu

Các điểm bắt buộc:

1. Heading uppercase xanh đậm, rất to, dày.
2. Body chữ nhỏ, hơi mono, màu xanh đậm.
3. Section header có ký tự `A`, `C` trong vòng tròn nét đứt + line ngang.
4. About section có card xám bo góc, ảnh chữ nhật shadow nhẹ, đường cong nét đứt xanh phía sau.
5. Shows page có poster bên trái, title lớn bên phải, 2 button xanh đậm bo tròn.
6. Booking stepper trên cùng có 4 bước, icon tròn active/inactive.
7. Calendar dạng grid xám nhạt, border xanh, pill giờ diễn xanh.
8. Seat map có sân khấu lớn ở giữa, ghế tròn nhỏ, legend dạng pill đen ở dưới.
9. Form/table có border xanh mảnh, header nền xám nhạt, title uppercase.
10. Payment screen có tổng tiền lớn và button thanh toán xanh đậm.

---

## 14. Accessibility

- Tất cả button có `aria-label` nếu chỉ có icon.
- Ghế có button semantic, label: `Ghế B3.10, đang trống`.
- Contrast đủ rõ.
- Focus state rõ bằng ring xanh/vàng.
- Form input có label thật, không chỉ placeholder.
- Không khóa keyboard navigation.

---

## 15. Acceptance criteria

Code hoàn thành khi:

- Chạy được bằng `npm run dev`.
- Không lỗi TypeScript nghiêm trọng.
- Có đầy đủ home, shows và booking flow 4 bước.
- Giao diện nhìn cùng tinh thần với UI mẫu.
- Có animation mượt nhưng không quá nặng.
- Responsive desktop/tablet/mobile.
- Dễ thay ảnh trong `/public/images`.
- Component tách rõ, data mock nằm riêng.
- Không cần backend thật.

---

## 16. Prompt ngắn cho Codex

Hãy build một frontend Next.js App Router + TypeScript + Tailwind + Framer Motion cho website Múa rối nước Rồng Phương Nam dựa trên spec này. Tập trung clone tinh thần UI ảnh tham khảo: hero sân khấu nước, typography uppercase xanh đậm, card xám xanh, dotted path, show list, booking flow 4 bước gồm chọn suất diễn, chọn ghế, nhập liên hệ và thanh toán. Dùng mock data, asset trong `/public/images`, responsive hoàn chỉnh, animation mượt, component clean và production-ready.

