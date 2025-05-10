
"use client";

import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeInView } from '@/components/animations/FadeInView';
import { CalendarCheck, Briefcase, Users, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockAppointments = [
  { id: '1', date: new Date(2024, 6, 15), time: '10:00', type: 'Consulta Inicial', status: 'Confirmado' },
  { id: '2', date: new Date(2024, 6, 22), time: '14:00', type: 'Sessão de Acompanhamento', status: 'Pendente' },
  { id: '3', date: new Date(2024, 7, 5), time: '09:00', type: 'Treinamento de Liderança (Módulo 1)', status: 'Confirmado' },
];

const mockTrainings = [
  { id: 't1', title: 'Gestão de Estresse e Burnout', date: 'A ser definido', duration: '4 horas', status: 'Disponível para agendamento' },
  { id: 't2', title: 'Comunicação Não Violenta no Trabalho', date: '10/08/2024', duration: '3 horas', status: 'Inscrições Abertas' },
];


export default function PortalPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getStatusBadgeVariant = (status: string) => {
    if (status === 'Confirmado' || status === 'Inscrições Abertas') return 'default';
    if (status === 'Pendente') return 'secondary';
    return 'outline';
  };

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-10">
      <FadeInView>
        <SectionTitle
          title="Portal do Cliente"
          subtitle="Acesse seus agendamentos, materiais e informações importantes."
        />
      </FadeInView>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <FadeInView className="md:col-span-1 lg:col-span-1 space-y-4 md:space-y-6" delay="delay-100">
          <Card className="shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <CalendarCheck className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                Agendar Consulta
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Selecione uma data para verificar disponibilidade.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-2 sm:p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border [&_button]:text-xs [&_button]:sm:text-sm" // scale down calendar for mobile
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } // Disable past dates
              />
            </CardContent>
          </Card>
          <Card className="shadow-lg">
             <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <AlertCircle className="text-destructive h-5 w-5 sm:h-6 sm:w-6" />
                    Avisos Importantes
                </CardTitle>
             </CardHeader>
             <CardContent className="p-4 sm:p-6">
                <p className="text-sm text-muted-foreground">Nenhum aviso importante no momento.</p>
             </CardContent>
          </Card>
        </FadeInView>

        <FadeInView className="md:col-span-1 lg:col-span-2 space-y-6 md:space-y-8" delay="delay-200">
          <Card className="shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Briefcase className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                Meus Agendamentos
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Consulte suas próximas consultas e sessões.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-2 md:p-4">
              {mockAppointments.length > 0 ? (
                <div className="relative w-full overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Data</TableHead>
                        <TableHead className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Hora</TableHead>
                        <TableHead className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Tipo</TableHead>
                        <TableHead className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAppointments.map((apt) => (
                        <TableRow key={apt.id}>
                          <TableCell className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{apt.date.toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{apt.time}</TableCell>
                          <TableCell className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm whitespace-nowrap">{apt.type}</TableCell>
                          <TableCell className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">
                            <Badge variant={getStatusBadgeVariant(apt.status)} className="text-xs px-1.5 py-0.5 sm:px-2.5 sm:py-0.5">{apt.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4 text-sm">Nenhum agendamento encontrado.</p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Users className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                Treinamentos Programados
              </CardTitle>
               <CardDescription className="text-xs sm:text-sm">Verifique os treinamentos disponíveis e agendados.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-2 md:p-4">
               {mockTrainings.length > 0 ? (
                 <div className="relative w-full overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Treinamento</TableHead>
                        <TableHead className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Data</TableHead>
                        <TableHead className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Duração</TableHead>
                        <TableHead className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTrainings.map((trn) => (
                        <TableRow key={trn.id}>
                          <TableCell className="font-medium px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm whitespace-nowrap">{trn.title}</TableCell>
                          <TableCell className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{trn.date}</TableCell>
                          <TableCell className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">{trn.duration}</TableCell>
                          <TableCell className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm">
                            <Badge variant={getStatusBadgeVariant(trn.status)} className="text-xs px-1.5 py-0.5 sm:px-2.5 sm:py-0.5">{trn.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                 </div>
              ) : (
                <p className="text-muted-foreground text-center py-4 text-sm">Nenhum treinamento programado.</p>
              )}
            </CardContent>
          </Card>
        </FadeInView>
      </div>
    </div>
  );
}

