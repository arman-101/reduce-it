import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Github, Twitter, Coffee } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-12">
        <div className="bg-card p-8 rounded-xl shadow-lg border border-border max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Profile Image */}
            <div className="md:col-span-1 flex justify-center">
              <Image
                src="/me.jpg"
                alt="Arman"
                width={300}
                height={300}
                className="rounded-full object-cover shadow-2xl border-4 border-primary"
              />
            </div>

            {/* Bio Content */}
            <div className="md:col-span-2">
              <h1 className="text-4xl font-serif font-bold text-primary mb-2">Arman</h1>
              <h2 className="text-lg text-muted-foreground font-semibold mb-4">curiosity, aesthetics, freedom</h2>
              <div className="space-y-4 text-foreground">
                <p>
                  Welcome to <strong>Reduce It</strong>, a modern image compression tool built to solve the frustrations with existing online optimization services.
                </p>
                <p>
                  Most online compression tools are unreliable, have inconsistent results, and lack the features developers actually need. That&apos;s why I built this tool with a focus on precision, performance, and user experience.
                </p>
                <p>
                  <strong>What Makes It Different:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Target Size Control:</strong> Set exact file sizes (10KB - 2MB)</li>
                  <li><strong>Quality Priority:</strong> Choose between file size or image quality</li>
                  <li><strong>Batch Processing:</strong> Compress up to 10 images at once</li>
                  <li><strong>100% Client-side:</strong> Your images never leave your device</li>
                  <li><strong>Real-time Progress:</strong> See compression progress with live updates</li>
                </ul>
                <p>
                  Perfect for web developers, designers, and anyone who needs reliable image optimization. Compressed images mean faster websites, better user experiences, and reduced bandwidth costs.
                </p>
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center text-foreground mb-6">
                Links
            </h3>
            <div className="flex justify-center gap-4 flex-wrap">
                <a 
                    href="https://github.com/arman-101/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-105"
                >
                    <Github className="w-5 h-5"/>
                    <span>GitHub</span>
                </a>
                <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-105"
                >
                    <Twitter className="w-5 h-5"/>
                    <span>X (Twitter)</span>
                </a>
                <a 
                    href="https://buymeacoffee.com/darknebulax1" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-amber-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-amber-700 transition-transform transform hover:scale-105"
                >
                    <Coffee className="w-5 h-5"/>
                    <span>Buy Me a Coffee</span>
                </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
