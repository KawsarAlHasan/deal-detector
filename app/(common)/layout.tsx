import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main  className="max-w-7xl mx-4 lg:mx-auto">{children}</main>
      <Footer />
    </>
  );
}
