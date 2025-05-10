import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FadeInView } from '@/components/animations/FadeInView';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <FadeInView className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="block text-primary">Adequação à Nova NR-1:</span>
              <span className="block text-foreground">Gestão Estratégica de Riscos Psicossociais</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Consultoria especializada para promover a excelência em saúde ocupacional e garantir a conformidade legal da sua empresa.
            </p>
            <div className="bg-card p-4 rounded-lg shadow-sm border">
              <p className="font-semibold text-primary">Dr(a). Nome Completo Sobrenome</p>
              <p className="text-sm text-muted-foreground">CRP 00/00000</p>
              <p className="text-sm text-muted-foreground">Psicólogo(a) Organizacional | Consultor(a) em Saúde Mental Corporativa</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <Link href="/#contato">Fale Conosco <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="shadow-sm hover:shadow-md transition-shadow">
                <Link href="/#servicos">Nossos Serviços</Link>
              </Button>
            </div>
          </FadeInView>
          <FadeInView delay="delay-200" className="relative">
            <div className="aspect-square rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105">
              <Image
                src="https://picsum.photos/seed/psychologist/600/600"
                alt="Psicóloga especialista em saúde ocupacional"
                width={600}
                height={600}
                priority
                className="object-cover w-full h-full"
                data-ai-hint="professional psychologist office"
              />
            </div>
             <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/30 rounded-full -z-10 animate-pulse"></div>
             <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/20 rounded-full -z-10 animate-ping delay-1000"></div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
