import type { Show, ShowTime } from "@/types/booking";

export const shows: Show[] = [
  {
    id: "little-mermaid",
    title: "Nàng Tiên Cá",
    duration: "60 phút",
    cast: "Tập thể diễn viên nhà hát Phương Nam",
    description:
      "Giữa lòng đại dương bị đe dọa bởi rác thải gây ô nhiễm, nàng tiên cá đem lòng say mê thế giới loài người và cứu chàng hoàng tử thoát nạn. Hành trình đánh đổi giọng hát để được sống trên cạn không chỉ là câu chuyện yêu đương rung động, mà còn là lời nhắc nhẹ nhàng về tình yêu và sự thấu hiểu giữa con người với thiên nhiên xanh lành. Những nhân vật rối đáng yêu cùng hiệu ứng ánh sáng và âm nhạc rộn ràng sẽ đưa bạn vào một thế giới đầy màu sắc.",
    image: "/images/shows/little-mermaid.jpg"
  },
  {
    id: "hoa-dat-viet",
    title: "Hoa Đất Việt",
    duration: "45 phút",
    cast: "Tập thể diễn viên nhà hát Phương Nam",
    description:
      "Hoa Đất Việt là chương trình múa rối nước quy tụ các tiết mục trò diễn cổ truyền hấp dẫn, vui nhộn. Với sự kết hợp tinh tế giữa rối nước đầy màu sắc, vũ đạo ấn tượng và âm nhạc sống động, chương trình đưa khán giả vào một không gian cổ tích mê hoặc và lý thú tại Nhà hát nghệ thuật Phương Nam.",
    image: "/images/shows/hoa-dat-viet.jpg"
  }
];

export const showTimes: ShowTime[] = [
  { date: "2026-05-23", times: ["10:30 - 11:15", "14:30 - 15:15"] },
  { date: "2026-05-30", times: ["10:30 - 11:15", "14:30 - 15:15"] }
];

export function getShowById(showId: string) {
  return shows.find((show) => show.id === showId) ?? shows[1];
}
