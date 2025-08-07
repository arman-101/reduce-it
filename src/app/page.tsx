import { Header } from "@/components/header";
import { ImageUploader } from "@/components/image-uploader";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center justify-start">
        <ImageUploader />
      </main>
      <Footer />
    </div>
  );
}
