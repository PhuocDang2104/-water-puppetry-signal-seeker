export type ArchiveShowItem = {
  id: string;
  title: string;
  subtitle: string;
  posterSrc: string;
  year: string;
  location: string;
  shortSummary: string;
  fullDescription: string;
};

export const archiveShows: ArchiveShowItem[] = [
  {
    id: "archive-01",
    title: "Tễu Về Làng",
    subtitle: "Hài dân gian",
    posterSrc: "/images/about/puppet-intro-1.jpg",
    year: "2024",
    location: "Sân khấu Rồng Phương Nam",
    shortSummary: "Một vở diễn vui nhộn lấy cảm hứng từ sinh hoạt làng quê.",
    fullDescription:
      "Tễu Về Làng là vở rối nước mang màu sắc hài hước, kể những câu chuyện đời thường qua nhân vật chú Tễu và các trò diễn dân gian."
  },
  {
    id: "archive-02",
    title: "Hội Trăng Rằm",
    subtitle: "Trung thu",
    posterSrc: "/images/about/puppet-intro-2.jpg",
    year: "2024",
    location: "Sân khấu Rồng Phương Nam",
    shortSummary: "Không khí Trung thu với đèn lồng, tiếng trống và mặt nước.",
    fullDescription:
      "Hội Trăng Rằm tái hiện đêm hội truyền thống cho gia đình và thiếu nhi, kết hợp âm nhạc rộn ràng cùng những nhân vật rối nhiều màu sắc."
  },
  {
    id: "archive-03",
    title: "Chuyện Đồng Quê",
    subtitle: "Làng Việt",
    posterSrc: "/images/about/artisan-workshop.jpg",
    year: "2023",
    location: "Sân khấu Rồng Phương Nam",
    shortSummary: "Những lát cắt đời sống lao động được kể bằng rối nước.",
    fullDescription:
      "Chuyện Đồng Quê tôn vinh vẻ đẹp lao động và tinh thần lạc quan của người nông dân qua các cảnh sinh hoạt, mùa vụ và lễ hội."
  },
  {
    id: "archive-04",
    title: "Sắc Nước Phương Nam",
    subtitle: "Di sản",
    posterSrc: "/images/shows/hoa-dat-viet.jpg",
    year: "2023",
    location: "Sân khấu Rồng Phương Nam",
    shortSummary: "Một hành trình màu sắc qua âm nhạc và những con rối gỗ.",
    fullDescription:
      "Sắc Nước Phương Nam kết nối các trò diễn cổ truyền với cách dàn dựng hiện đại, tạo nên không gian biểu diễn thân thiện với khán giả mới."
  },
  {
    id: "archive-05",
    title: "Giấc Mơ Biển Xanh",
    subtitle: "Thiếu nhi",
    posterSrc: "/images/shows/little-mermaid.jpg",
    year: "2022",
    location: "Sân khấu Rồng Phương Nam",
    shortSummary: "Câu chuyện đại dương nhẹ nhàng dành cho khán giả gia đình.",
    fullDescription:
      "Giấc Mơ Biển Xanh đưa trẻ em vào thế giới đại dương với thông điệp bảo vệ môi trường, tình bạn và sự thấu hiểu thiên nhiên."
  }
];
