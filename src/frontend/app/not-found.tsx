import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-background text-foreground">
      <h1 className="text-2xl font-semibold">404 – Página não encontrada</h1>
      <p className="text-muted-foreground text-center">
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="text-primary underline underline-offset-4 hover:no-underline"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
