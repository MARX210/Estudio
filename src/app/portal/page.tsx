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
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <FadeInView>
        <SectionTitle
          title="Portal do Cliente"
          subtitle="Acesse seus agendamentos, materiais e informações importantes."
        />
      </FadeInView>

      <div className="grid lg:grid-cols-3 gap-8">
        <FadeInView className="lg:col-span-1 space-y-6" delay="delay-100">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CalendarCheck className="text-primary" />
                Agendar Consulta
              </CardTitle>
              <CardDescription>Selecione uma data para verificar disponibilidade.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } // Disable past dates
              />
            </CardContent>
          </Card>
          <Card className="shadow-lg">
             <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <AlertCircle className="text-destructive" />
                    Avisos Importantes
                </CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-sm text-muted-foreground">Nenhum aviso importante no momento.</p>
             </CardContent>
          </Card>
        </FadeInView>

        <FadeInView className="lg:col-span-2 space-y-8" delay="delay-200">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Briefcase className="text-primary" />
                Meus Agendamentos
              </CardTitle>
              <CardDescription>Consulte suas próximas consultas e sessões.</CardDescription>
            </CardHeader>
            <CardContent>
              {mockAppointments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAppointments.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell>{apt.date.toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{apt.time}</TableCell>
                        <TableCell>{apt.type}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(apt.status)}>{apt.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground text-center py-4">Nenhum agendamento encontrado.</p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="text-primary" />
                Treinamentos Programados
              </CardTitle>
               <CardDescription>Verifique os treinamentos disponíveis e agendados.</CardDescription>
            </CardHeader>
            <CardContent>
               {mockTrainings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Treinamento</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Duração</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTrainings.map((trn) => (
                      <TableRow key={trn.id}>
                        <TableCell className="font-medium">{trn.title}</TableCell>
                        <TableCell>{trn.date}</TableCell>
                        <TableCell>{trn.duration}</TableCell>
                         <TableCell>
                          <Badge variant={getStatusBadgeVariant(trn.status)}>{trn.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground text-center py-4">Nenhum treinamento programado.</p>
              )}
            </CardContent>
          </Card>
        </FadeInView>
      </div>
    </div>
  );
}
