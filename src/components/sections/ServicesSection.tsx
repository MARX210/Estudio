import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ListChecks, UsersRound, FileCog, Brain, ShieldCheck, Presentation } from 'lucide-react';
import { FadeInView } from '@/components/animations/FadeInView';

const services = [
  {
    icon: <ListChecks className="w-10 h-10 text-primary mb-4" />,
    title: 'Mapeamento de Riscos Psicossociais',
    description: 'Diagnóstico preciso dos fatores psicossociais, identificando fontes de estresse e vulnerabilidades na organização.',
  },
  {
    icon: <UsersRound className="w-10 h-10 text-primary mb-4" />,
    title: 'Treinamentos e Workshops Interativos',
    description: 'Capacitação prática para líderes e equipes sobre gestão de estresse, comunicação eficaz e promoção de um ambiente saudável.',
  },
  {
    icon: <FileCog className="w-10 h-10 text-primary mb-4" />,
    title: 'Consultoria Personalizada NR-1',
    description: 'Acompanhamento estratégico e desenvolvimento de planos de ação alinhados à legislação e às necessidades da sua empresa.',
  },
  {
    icon: <Brain className="w-10 h-10 text-primary mb-4" />,
    title: 'Programas de Bem-Estar Mental',
    description: 'Desenvolvimento e implementação de programas focados na saúde mental, prevenção de burnout e fomento da resiliência.',
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary mb-4" />,
    title: 'Adequação ao PGR e GRO',
    description: 'Integração da gestão de riscos psicossociais ao Programa de Gerenciamento de Riscos (PGR) e Gerenciamento de Riscos Ocupacionais (GRO).',
  },
  {
    icon: <Presentation className="w-10 h-10 text-primary mb-4" />,
    title: 'Palestras e Campanhas de Conscientização',
    description: 'Sensibilização sobre a importância da saúde mental no trabalho, desmistificando temas e promovendo uma cultura de cuidado.',
  },
];

export function ServicesSection() {
  return (
    <section id="servicos" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="Nossos Serviços Especializados"
          subtitle="Soluções completas para a gestão de riscos psicossociais e conformidade com a NR-1, adaptadas à realidade da sua organização."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <FadeInView key={service.title} delay={`delay-${index * 100}`}>
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card">
                <CardHeader className="items-center text-center">
                  {service.icon}
                  <CardTitle className="text-xl font-semibold text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-grow">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
