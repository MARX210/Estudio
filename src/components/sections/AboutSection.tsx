import Image from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { FadeInView } from '@/components/animations/FadeInView';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Linkedin, Mail } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="sobre" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="Conheça a Especialista"
          subtitle="Compromisso com a transformação de ambientes de trabalho em espaços mais saudáveis, produtivos e humanizados."
        />
        <FadeInView>
          <div className="bg-card p-6 md:p-10 rounded-xl shadow-lg border flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0">
              <Image
                src="https://picsum.photos/seed/profile/200/200"
                alt="Foto de Dr(a). Nome Completo"
                width={200}
                height={200}
                className="rounded-full object-cover border-4 border-primary shadow-md"
                data-ai-hint="professional woman portrait"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">Dr(a). Nome Completo Sobrenome</h3>
              <p className="text-md text-muted-foreground font-medium">CRP 00/00000 — Especialista em Psicologia Organizacional e do Trabalho</p>
              <p className="mt-4 text-foreground leading-relaxed">
                Com vasta experiência em consultoria para empresas de diversos portes e segmentos, dedico-me a auxiliar organizações a cumprirem as exigências da NR-1, focando na gestão eficaz dos riscos psicossociais. Minha abordagem é estratégica e humanizada, visando não apenas a conformidade legal, mas a promoção de uma cultura de bem-estar e alta performance.
              </p>
              <div className="mt-6 flex gap-3 justify-center md:justify-start">
                <Button asChild variant="outline" className="shadow-sm hover:shadow-md">
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                  </Link>
                </Button>
                <Button asChild className="shadow-md hover:shadow-lg">
                  <Link href="/#contato">
                    <Mail className="mr-2 h-4 w-4" /> Entre em Contato
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
