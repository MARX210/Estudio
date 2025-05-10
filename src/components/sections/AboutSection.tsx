
import Image from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { FadeInView } from '@/components/animations/FadeInView';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageCircle, Mail } from 'lucide-react';

const whatsAppNumber = "5511999999999"; // Same as in ContactFormSection for consistency

export function AboutSection() {
  return (
    <section id="sobre" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="Conheça o Especialista"
          subtitle="Compromisso com a transformação de ambientes de trabalho em espaços mais saudáveis, produtivos e humanizados."
        />
        <FadeInView>
          <div className="bg-card p-4 sm:p-6 md:p-10 rounded-xl shadow-lg border flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 shrink-0">
              <Image
                src="https://picsum.photos/seed/profile/200/200"
                alt="Foto de Marlon Amorim"
                width={200}
                height={200}
                className="rounded-full object-cover border-4 border-primary shadow-md"
                data-ai-hint="professional man portrait"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">Marlon Amorim</h3>
              <p className="text-sm sm:text-md text-muted-foreground font-medium">CRP: 08/44838 — Especialista em Psicologia Organizacional e do Trabalho</p>
              <p className="mt-4 text-foreground leading-relaxed text-sm sm:text-base">
                Com vasta experiência em consultoria para empresas de diversos portes e segmentos, dedico-me a auxiliar organizações a cumprirem as exigências da NR-1, focando na gestão eficaz dos riscos psicossociais. Minha abordagem é estratégica e humanizada, visando não apenas a conformidade legal, mas a promoção de uma cultura de bem-estar e alta performance.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button asChild variant="outline" className="shadow-sm hover:shadow-md w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600">
                  <Link href={`https://wa.me/${whatsAppNumber}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </Link>
                </Button>
                <Button asChild className="shadow-md hover:shadow-lg w-full sm:w-auto">
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

