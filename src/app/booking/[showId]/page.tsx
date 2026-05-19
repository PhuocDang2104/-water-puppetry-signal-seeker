import { BookingFlow } from "@/components/booking/BookingFlow";

type BookingRouteProps = {
  params: Promise<{ showId: string }>;
};

export default async function BookingRoute({ params }: BookingRouteProps) {
  const { showId } = await params;
  return <BookingFlow showId={showId} />;
}
