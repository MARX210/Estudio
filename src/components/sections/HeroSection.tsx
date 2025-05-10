
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FadeInView } from '@/components/animations/FadeInView';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 py-12 sm:py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <FadeInView className="space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="block text-primary">Adequação à Nova NR-1:</span>
              <span className="block text-foreground">Gestão Estratégica de Riscos Psicossociais</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Consultoria especializada para promover a excelência em saúde ocupacional e garantir a conformidade legal da sua empresa.
            </p>
            <div className="bg-card p-3 sm:p-4 rounded-lg shadow-sm border">
              <p className="font-semibold text-primary">Marlon Amorim</p>
              <p className="text-sm text-muted-foreground">CRP: 08/44838</p>
              <p className="text-sm text-muted-foreground">Psicólogo Organizacional | Consultor em Saúde Mental Corporativa</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow w-full sm:w-auto">
                <Link href="/#contato">Fale Conosco <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="shadow-sm hover:shadow-md transition-shadow w-full sm:w-auto">
                <Link href="/#servicos">Nossos Serviços</Link>
              </Button>
            </div>
          </FadeInView>
          <FadeInView delay="delay-200" className="relative mt-8 md:mt-0">
            <div className="aspect-square rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105">
              <Image
                src="https://picsum.photos/seed/psychologist/600/600"
                alt="Psicólogo especialista em saúde ocupacional"
                width={600}
                height={600}
                priority
                className="object-cover w-full h-full"
                data-ai-hint="professional psychologist office"
              />
            </div>
             <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 w-24 h-24 sm:w-32 sm:h-32 bg-accent/30 rounded-full -z-10 animate-pulse"></div>
             <div className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 w-16 h-16 sm:w-24 sm:h-24 bg-primary/20 rounded-full -z-10 animate-ping delay-1000"></div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}

