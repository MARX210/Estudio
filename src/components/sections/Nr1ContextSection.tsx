
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollText, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { FadeInView } from '@/components/animations/FadeInView';

const obligations = [
  'Identificar, avaliar e gerenciar riscos psicossociais.',
  'Implementar planos de ação preventivos e corretivos.',
  'Integrar a gestão de riscos psicossociais ao PGR/GRO.',
  'Promover um ambiente de trabalho saudável e seguro.',
  'Garantir a conformidade legal para evitar multas e sanções.',
];

const psychosocialRisks = [
  'Estresse ocupacional crônico e burnout.',
  'Assédio moral e sexual no ambiente de trabalho.',
  'Pressão excessiva por metas e resultados.',
  'Jornadas de trabalho exaustivas e falta de pausas.',
  'Comunicação interna deficiente e falta de suporte.',
  'Ambiente de trabalho tóxico e conflitos interpessoais.',
];

export function Nr1ContextSection() {
  return (
    <section id="contexto" className="bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="Nova Exigência da NR-1: Riscos Psicossociais"
          subtitle="Entenda as responsabilidades da sua empresa e os principais riscos a serem gerenciados para assegurar um ambiente de trabalho em conformidade e produtivo."
        />
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <FadeInView>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-card">
              <CardHeader className="flex flex-row items-center gap-3 p-4 sm:p-6">
                <ScrollText className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
                <FadeInView>
                  <CardTitle className="text-md sm:text-lg font-semibold">Obrigações Empresariais Conforme a NR-1</CardTitle>
                </FadeInView>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <ul className="space-y-2">
                  {obligations.map((item, index) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <FadeInView delay={`delay-${index * 100 + 100}`}>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </FadeInView>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeInView>
          <FadeInView delay="delay-100">
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-card">
              <CardHeader className="flex flex-row items-center gap-3 p-4 sm:p-6">
                <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-destructive shrink-0" />
                <FadeInView>
                  <CardTitle className="text-md sm:text-lg font-semibold">Principais Riscos Psicossociais</CardTitle>
                </FadeInView>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <ul className="space-y-2">
                  {psychosocialRisks.map((item, index) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 mt-0.5 shrink-0" />
                      <FadeInView delay={`delay-${index * 100 + 100}`}>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </FadeInView>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
