
export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6 py-6 text-center text-sm text-muted-foreground">
        &copy; {currentYear} Marlon Amorim CRP: 08/44838. Todos os direitos reservados.
      </div>
    </footer>
  );
}

