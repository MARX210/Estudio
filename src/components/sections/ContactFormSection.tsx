
"use client";

import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeInView } from "@/components/animations/FadeInView";
import { Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";

// Example contact details (replace with actual data)
const whatsAppNumber = "5511999999999"; // Include country code, no spaces or symbols
const instagramUsername = "psychosocial_solutions_br";


export function ContactFormSection() {
  return (
    <section id="contato" className="bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="Entre em Contato"
          subtitle="Vamos conversar sobre como podemos ajudar sua empresa a alcançar a conformidade com a NR-1 e promover um ambiente de trabalho mais saudável."
        />
        <FadeInView>
          <div className="bg-card p-6 md:p-10 rounded-xl shadow-lg border">
            <div className="space-y-6 text-center">
              <FadeInView>
                <h3 className="text-2xl font-semibold text-primary">Fale Conosco Diretamente</h3>
              </FadeInView>
              <FadeInView delay="delay-100">
                <p className="text-muted-foreground max-w-xl mx-auto text-justify leading-relaxed">
                  Envie uma mensagem rápida pelo WhatsApp ou conecte-se conosco no Instagram.
                </p>
              </FadeInView>
              <FadeInView delay="delay-200">
                <div className="space-y-4 flex flex-col sm:flex-row sm:space-y-0 sm:space-x-4 items-center justify-center">
                  <Button asChild size="lg" className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow bg-green-500 hover:bg-green-600 text-white">
                    <Link href={`https://wa.me/${whatsAppNumber}`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto shadow-sm hover:shadow-md transition-shadow border-primary text-primary hover:bg-primary/10">
                    <Link href={`https://instagram.com/${instagramUsername}`} target="_blank" rel="noopener noreferrer">
                      <Instagram className="mr-2 h-5 w-5" /> Instagram
                    </Link>
                  </Button>
                </div>
              </FadeInView>
              <FadeInView delay="delay-300">
                <p className="text-sm text-muted-foreground text-justify leading-relaxed">
                  Clique nos botões acima para iniciar uma conversa ou visitar nosso perfil.
                </p>
              </FadeInView>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

