import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ShowList } from "@/components/shows/ShowList";
import { ShowsPageHeader } from "@/components/shows/ShowsPageHeader";

export default function ShowsPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <Navbar variant="solid" />
        <ShowsPageHeader />
        <ShowList withHeader={false} />
      </main>
      <Footer />
    </>
  );
}
