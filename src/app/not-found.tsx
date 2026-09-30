import { Arrow, Button, Eyebrow, Heading } from '@/components/ui';

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-screen place-items-center px-6 py-24">
      <div className="max-w-xl text-center">
        <Eyebrow>404</Eyebrow>
        <Heading as="h1" className="mt-6">
          Page not found
        </Heading>
        <p className="mt-6 text-lg/8 text-muted">Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/">
            Back to Home
            <Arrow />
          </Button>
          <Button href="https://topmate.io/srinidhi" variant="outline">
            Book a Consultation
          </Button>
        </div>
      </div>
    </main>
  );
}
