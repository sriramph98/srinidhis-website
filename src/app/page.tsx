import {
  AnimatedElement,
  AnimatedSection,
  AnimatedServiceCard
} from '@/components/AnimatedSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ImageCarousel } from '@/components/ImageCarousel';
import { CheckIcon } from '@heroicons/react/20/solid';

const tiers = [
  {
    name: 'Topmate',
    id: 'tier-topmate',
    href: 'https://topmate.io/srinidhi',
    priceMonthly: '$199',
    description: 'Perfect for professionals looking to optimize their online presence.',
    features: [
      'LinkedIn Profile Optimization',
      'Resume Review & Feedback',
      'Basic Job Search Strategy',
      '1 Round of Revisions',
      '2-Week Support',
    ],
    featured: false,
  },
  {
    name: 'Custom Package',
    id: 'tier-custom',
    href: '#contact',
    priceMonthly: 'Custom',
    description: 'Tailored solutions for your specific career goals.',
    features: [
      'Personalized Career Strategy',
      'Custom LinkedIn & Resume Package',
      'Advanced Job Search Strategy',
      'Unlimited Revisions',
      'Extended Support Period',
      'Priority Access & Consulting',
    ],
    featured: true,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default async function Home() {
  return (
    <>
      <div className="bg-white">
        <Header />
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-yellow-400 to-yellow-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                Land Your Dream Job Faster
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                Optimized Resume, LinkedIn, and Job Search Strategy to help you stand out in the job market and accelerate your career growth.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#pricing"
                  className="rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                >
                  Get started
                </a>
                <a href="#services" className="text-sm/6 font-semibold text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-yellow-400 to-yellow-600 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      <main className="bg-white">
        {/* Services Section */}
        <AnimatedSection id="services" className="py-24 bg-white" isContainer>
          <div className="container">
            <AnimatedElement>
              <h2 className="mb-16">Writing</h2>
            </AnimatedElement>
            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedServiceCard id="linkedin-optimization" className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">LinkedIn Profile Optimisation</h3>
                  <p>Stand out to recruiters and hiring managers with a professionally optimized LinkedIn profile</p>
                </div>
              </AnimatedServiceCard>
              <AnimatedServiceCard id="resume-writing" className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">Resume Writing</h3>
                  <p>Get a professionally written resume that highlights your achievements and skills</p>
                </div>
              </AnimatedServiceCard>
              <AnimatedServiceCard id="job-search" className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">Job Search Strategy</h3>
                  <p>Learn effective strategies to navigate your job search and land interviews</p>
                </div>
              </AnimatedServiceCard>
            </div>
          </div>
        </AnimatedSection>
        {/* Linkedin Profile Optimisation Section */}
        <AnimatedSection id="linkedin-optimization" className="py-24 bg-white" isContainer>
          <div className="container">
            <AnimatedElement>
              <h2 className="mb-16">Linkedin Profile Optimisation</h2>
            </AnimatedElement>
            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">LinkedIn Profile Optimisation</h3>
                  <p>Stand out to recruiters and hiring managers with a professionally optimized LinkedIn profile</p>
                </div>
              </AnimatedServiceCard>
              <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">Resume Writing</h3>
                  <p>Get a professionally written resume that highlights your achievements and skills</p>
                </div>
              </AnimatedServiceCard>
              <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">Job Search Strategy</h3>
                  <p>Learn effective strategies to navigate your job search and land interviews</p>
                </div>
              </AnimatedServiceCard>
            </div>
          </div>
        </AnimatedSection>

        {/* Resume Writing Section */}
        <AnimatedSection id="resume-writing" className="py-24 bg-white" isContainer>
          <div className="container">
            <AnimatedElement>
              <h2 className="mb-16">Resume Writing</h2>
            </AnimatedElement>
            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">LinkedIn Profile Optimisation</h3>
                  <p>Stand out to recruiters and hiring managers with a professionally optimized LinkedIn profile</p>
                </div>
              </AnimatedServiceCard>
              <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">Resume Writing</h3>
                  <p>Get a professionally written resume that highlights your achievements and skills</p>
                </div>
              </AnimatedServiceCard>
              <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">Job Search Strategy</h3>
                  <p>Learn effective strategies to navigate your job search and land interviews</p>
                </div>
              </AnimatedServiceCard>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Customer Success Consulting */}
        <AnimatedSection id="coaching" className="py-24 bg-white" isContainer>
          <div className="container">
            <AnimatedElement>
              <h2 className="mb-16">Customer Success Consulting</h2>
            </AnimatedElement>
            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">LinkedIn Profile Optimisation</h3>
                  <p>Stand out to recruiters and hiring managers with a professionally optimized LinkedIn profile</p>
                </div>
              </AnimatedServiceCard>
              <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">Resume Writing</h3>
                  <p>Get a professionally written resume that highlights your achievements and skills</p>
                </div>
              </AnimatedServiceCard>
              <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">Job Search Strategy</h3>
                  <p>Learn effective strategies to navigate your job search and land interviews</p>
                </div>
              </AnimatedServiceCard>
            </div>
          </div>
        </AnimatedSection>

        {/* Job search strategy Section */}
        <AnimatedSection id="job-search" className="py-24 bg-white" isContainer>
          <div className="container">
            <AnimatedElement>
              <h2 className="mb-16">Job search strategy</h2>
            </AnimatedElement>
            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">LinkedIn Profile Optimisation</h3>
                  <p>Stand out to recruiters and hiring managers with a professionally optimized LinkedIn profile</p>
                </div>
              </AnimatedServiceCard>
              <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">Resume Writing</h3>
                  <p>Get a professionally written resume that highlights your achievements and skills</p>
                </div>
              </AnimatedServiceCard>
              <AnimatedServiceCard className="bg-gray-50/50 rounded-lg border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gray-100"></div>
                <div className="p-8">
                  <h3 className="mb-2">Job Search Strategy</h3>
                  <p>Learn effective strategies to navigate your job search and land interviews</p>
                </div>
              </AnimatedServiceCard>
            </div>
          </div>
        </AnimatedSection>

        {/* Why choose me? Section */}
        <AnimatedSection id="why-me" className="py-24 bg-white" isContainer>
          <div className="container">
            <AnimatedElement>
              <h2 className="mb-16 text-center">Why choose me?</h2>
            </AnimatedElement>
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Left side - Stacked cards */}
              <div className="flex flex-col gap-8">
                <AnimatedElement>
                  <div className="bg-gray-50/50 rounded-lg border border-gray-100 p-8">
                    <p>I know firsthand how tough the job search can be—I spent over six months navigating it myself, testing different strategies, and refining what truly works. Along the way, I&apos;ve connected with professionals who have been searching for much longer without results. Through trial, insight, and persistence, I developed proven methods that landed me interview calls.</p>
                  </div>
                </AnimatedElement>
                <AnimatedElement>
                  <div className="bg-gray-50/50 rounded-lg border border-gray-100 p-8">
                    <p>Beyond that, I&apos;ve been actively building my personal brand on LinkedIn for over four years, sharing valuable insights, strategies, and lessons learned. Now, I help others do the same—so you don&apos;t have to go through the same struggle alone.</p>
                  </div>
                </AnimatedElement>
              </div>
              
              {/* Right side - Image Carousel */}
              <AnimatedElement>
                <div className="h-[calc(100%+4rem)] -my-8 relative aspect-auto rounded-lg overflow-hidden">
                  <ImageCarousel 
                    images={[
                      '/carousel-1.jpg',
                      '/carousel-2.jpg',
                      '/carousel-3.jpg',
                    ]} 
                  />
                </div>
              </AnimatedElement>
            </div>
          </div>
        </AnimatedSection>

        {/* How it works? Section */}
        <AnimatedSection id="how-it-works" className="py-24 bg-white" isContainer>
          <div className="container">
            <AnimatedElement>
              <h2 className="mb-16 text-center">How it works?</h2>
            </AnimatedElement>
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {/* Step 1 */}
              <AnimatedElement>
                <div className="bg-gray-50/50 rounded-lg border border-gray-100 p-8 h-full">
                  <h3 className="text-yellow-500 font-semibold mb-4">Audit & Strategy</h3>
                  <p className="mb-4">Analyze your current profile & goals</p>
                  <p className="text-gray-500 text-sm">Via prioritized chats/calls</p>
                </div>
              </AnimatedElement>

              {/* Step 2 */}
              <AnimatedElement>
                <div className="bg-gray-50/50 rounded-lg border border-gray-100 p-8 h-full">
                  <h3 className="text-yellow-500 font-semibold mb-4">Optimization</h3>
                  <p>Improve your profile & strategy</p>
                </div>
              </AnimatedElement>

              {/* Step 3 */}
              <AnimatedElement>
                <div className="bg-gray-50/50 rounded-lg border border-gray-100 p-8 h-full">
                  <h3 className="text-yellow-500 font-semibold mb-4">Results & Growth</h3>
                  <p>Start attracting the right opportunities</p>
                </div>
              </AnimatedElement>

              {/* PS Note */}
              <AnimatedElement>
                <div className="bg-gray-50/50 rounded-lg border border-gray-100 p-8 h-full">
                  <p className="text-gray-600">PS: Timelines vary based on the service, and I&apos;ll share the expected timeframe upfront!</p>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </AnimatedSection>

        {/* Pricing Section */}
        <AnimatedSection id="pricing" className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8" isContainer>
          <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-yellow-400 to-yellow-600 opacity-30"
            />
          </div>
          <div className="mx-auto max-w-4xl text-center">
            <AnimatedElement>
              <h2 className="text-base/7 font-semibold text-yellow-600">Pricing & Packages</h2>
              <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
                Choose the right plan for you
              </p>
            </AnimatedElement>
          </div>
          <AnimatedElement>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
              Select a package that best suits your career goals. Each plan is designed to help you stand out in the job market and accelerate your career growth.
            </p>
          </AnimatedElement>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
            {tiers.map((tier, tierIdx) => (
              <AnimatedElement key={tier.id}>
                <div
                  className={classNames(
                    tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
                    tier.featured
                      ? ''
                      : tierIdx === 0
                        ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                        : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
                    'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
                  )}
                >
                  <h3
                    id={tier.id}
                    className={classNames(tier.featured ? 'text-yellow-400' : 'text-yellow-600', 'text-base/7 font-semibold')}
                  >
                    {tier.name}
                  </h3>
                  <p className="mt-4 flex items-baseline gap-x-2">
                    <span
                      className={classNames(
                        tier.featured ? 'text-white' : 'text-gray-900',
                        'text-5xl font-semibold tracking-tight',
                      )}
                    >
                      {tier.priceMonthly}
                    </span>
                  </p>
                  <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
                    {tier.description}
                  </p>
                  <ul
                    role="list"
                    className={classNames(
                      tier.featured ? 'text-gray-300' : 'text-gray-600',
                      'mt-8 space-y-3 text-sm/6 sm:mt-10',
                    )}
                  >
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          aria-hidden="true"
                          className={classNames(tier.featured ? 'text-yellow-400' : 'text-yellow-600', 'h-6 w-5 flex-none')}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className={classNames(
                      tier.featured
                        ? 'bg-yellow-500 text-white shadow-xs hover:bg-yellow-400 focus-visible:outline-yellow-500'
                        : 'text-yellow-600 ring-1 ring-yellow-200 ring-inset hover:ring-yellow-300 focus-visible:outline-yellow-600',
                      'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
                    )}
                  >
                    Get started today
                  </a>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
}
