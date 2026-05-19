export const seatPrice = 150000;

export const defaultSelectedSeats = ["B3.10", "B3.12"];

export const bookedSeatLabels = new Set([
  "A4.15",
  "A4.14",
  "A4.13",
  "A4.8",
  "A4.7",
  "A4.6",
  "A3.13",
  "A3.12",
  "A3.11",
  "A3.10",
  "A3.9",
  "A3.2",
  "A3.1",
  "B4.11",
  "B4.15",
  "B2.21"
]);

export const zoneARows = [
  { row: "A4", left: [15, 14, 13, 12, 11, 10, 9], right: [8, 7, 6, 5, 4, 3, 2, 1] },
  { row: "A3", left: [14, 13, 12, 11, 10, 9, 8], right: [7, 6, 5, 4, 3, 2, 1] },
  { row: "A2", left: [12, 11, 10, 9, 8], right: [7, 6, 5, 4, 3, 2, 1] },
  { row: "A1", left: [17, 16, 15, 14, 13, 12, 11, 10, 9], right: [8, 7, 6, 5, 4, 3, 2, 1] }
];

export const zoneBLeftColumns = [
  { row: "B4", seats: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27] },
  { row: "B3", seats: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23] },
  { row: "B2", seats: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21] },
  { row: "B1", seats: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19] }
];

export const zoneBRightColumns = [
  { row: "B3", seats: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
  { row: "B2", seats: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22] },
  { row: "B1", seats: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24] }
];
