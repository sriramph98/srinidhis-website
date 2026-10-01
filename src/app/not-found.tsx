import { Button, SectionHeader } from '@/components/ui';

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-screen place-items-center px-6 py-24">
      <SectionHeader
        eyebrow="404"
        title="Page not found"
        description="Sorry, the page you’re looking for doesn’t exist or has been moved."
        as="h1"
        align="center"
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/">Back to Home</Button>
          <Button href="https://topmate.io/srinidhi" variant="secondary">
            Book a Consultation
          </Button>
        </div>
      </SectionHeader>
    </main>
  );
}
