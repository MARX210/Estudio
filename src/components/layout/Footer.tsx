
export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6 py-6 text-center text-sm text-muted-foreground">
        &copy; {currentYear} PsychoSocial Solutions. Todos os direitos reservados.
        <p className="text-xs mt-1">
          Desenvolvido para excelência em saúde ocupacional e conformidade legal.
        </p>
      </div>
    </footer>
  );
}
