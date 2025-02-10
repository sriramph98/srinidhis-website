import {
  AnimatedElement,
  AnimatedSection
} from '@/components/AnimatedSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ImageCarousel } from '@/components/ImageCarousel';
import { CheckIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

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
        <AnimatedSection id="services" className="bg-white" isContainer>
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Professional Writing Services</h2>
              <p className="mt-4 text-lg text-gray-600">
                Transform your career narrative with professionally crafted content. From LinkedIn profiles to resumes, 
                we help you tell your story in a way that resonates with recruiters and hiring managers.
              </p>

              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">LinkedIn Profile Optimization</dt>
                  <dd className="mt-2 text-sm text-gray-600">Professional headline, compelling summary, and achievement-focused experience sections that increase your visibility to recruiters.</dd>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">Resume Writing</dt>
                  <dd className="mt-2 text-sm text-gray-600">ATS-optimized format with powerful achievement statements and industry-relevant keywords to help you land interviews.</dd>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">Job Search Strategy</dt>
                  <dd className="mt-2 text-sm text-gray-600">Personalized approach to job searching, including application strategies, networking tips, and interview preparation.</dd>
                </div>
              </dl>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 self-center">
              <Image
                src="/writing-1.jpg"
                alt="Professional writing sample showcasing a well-crafted LinkedIn profile."
                width={400}
                height={300}
                className="rounded-lg bg-gray-100 object-cover aspect-[4/3]"
              />
              <Image
                src="/writing-2.jpg"
                alt="Example of a professionally written resume with clear sections and formatting."
                width={400}
                height={300}
                className="rounded-lg bg-gray-100 object-cover aspect-[4/3]"
              />
              <Image
                src="/writing-3.jpg"
                alt="Example of a professionally written resume with clear sections and formatting."
                width={400}
                height={300}
                className="rounded-lg bg-gray-100 object-cover aspect-[4/3]"
              />
              <Image
                src="/writing-4.jpg"
                alt="Example of a professionally written resume with clear sections and formatting."
                width={400}
                height={300}
                className="rounded-lg bg-gray-100 object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </AnimatedSection>
        {/* Linkedin Profile Optimisation Section */}
        <AnimatedSection id="linkedin-optimization" className="overflow-hidden bg-white py-24 sm:py-32" isContainer>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pt-4 lg:pr-8">
                <div className="lg:max-w-lg">
                  <h2 className="text-base/7 font-semibold text-yellow-600">Stand Out on LinkedIn</h2>
                  <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                    LinkedIn Profile Optimization
                  </p>
                  <p className="mt-6 text-lg/8 text-gray-600">
                    Transform your LinkedIn profile into a powerful career asset. Get noticed by recruiters and hiring managers with a professionally optimized profile that highlights your unique value proposition.
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <svg className="absolute top-1 left-1 size-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Professional Headline & Summary
                      </dt>{' '}
                      <dd className="inline">Craft a compelling headline and summary that captures attention and showcases your expertise.</dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <svg className="absolute top-1 left-1 size-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Experience & Achievements
                      </dt>{' '}
                      <dd className="inline">Highlight your key accomplishments and experience with impactful metrics and results.</dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <svg className="absolute top-1 left-1 size-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        SEO & Keywords
                      </dt>{' '}
                      <dd className="inline">Optimize your profile with industry-relevant keywords to improve visibility in recruiter searches.</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <Image
                src="/linkedin-optimization.png"
                alt="LinkedIn Profile Optimization"
                width={2432}
                height={1442}
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                priority
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Resume Writing Section */}
        <AnimatedSection id="resume-writing" className="bg-white py-24 sm:py-32" isContainer>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base/7 font-semibold text-yellow-600">Professional Resume Writing</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
                Stand Out with a Professionally Crafted Resume
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Get a professionally written resume that highlights your achievements, skills, and experience. Our expert writing service helps you make a strong first impression and increases your chances of landing interviews.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <div className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-yellow-500">
                      <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    ATS-Optimized Format
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600">
                    Ensure your resume passes through Applicant Tracking Systems with our optimized formatting and industry-standard templates.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-yellow-500">
                      <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                    </div>
                    Achievement-Focused Content
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600">
                    Transform your experience into powerful achievement statements with measurable results and impactful metrics.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-yellow-500">
                      <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    Keyword Optimization
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600">
                    Incorporate relevant industry keywords and skills to match job descriptions and improve visibility to recruiters.
                  </dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base/7 font-semibold text-gray-900">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-yellow-500">
                      <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    Unlimited Revisions
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600">
                    Get the perfect resume with our unlimited revision policy, ensuring your complete satisfaction with the final document.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Customer Success Consulting */}
        <AnimatedSection id="coaching" className="bg-white py-24 sm:py-32" isContainer>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base/7 font-semibold text-yellow-600">Customer Success</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
                Customer Success Consulting
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Personalized guidance to accelerate your career growth in Customer Success. Get expert advice on breaking into the field and developing effective strategies.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                <div className="relative group">
                  <div className="relative h-80 w-full overflow-hidden rounded-xl bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <Image
                      src="/career-strategy.jpg"
                      alt="Career strategy planning session with notes and career path mapping."
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-base font-semibold text-yellow-600">
                    <a href="#career-strategy">
                      <span className="absolute inset-0" />
                      Break into Customer Success 
                    </a>
                  </h3>
                  <p className="text-lg text-gray-600">Develop a clear roadmap for your career growth</p>
                </div>

                <div className="relative group">
                  <div className="relative h-80 w-full overflow-hidden rounded-xl bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <Image
                      src="/interview-prep.jpg"
                      alt="Interview preparation materials and coaching session setup."
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-base font-semibold text-yellow-600">
                    <a href="#interview-prep">
                      <span className="absolute inset-0" />
                      Customer Success Plans for Small Businesses
                    </a>
                  </h3>
                  <p className="text-lg text-gray-600">Create effective customer success strategies</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Job search strategy Section */}
        <AnimatedSection id="job-search" className="overflow-hidden bg-white py-24 sm:py-32" isContainer>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pt-4 lg:pr-8">
                <div className="lg:max-w-lg">
                  <h2 className="text-base/7 font-semibold text-yellow-600">Land Your Dream Role</h2>
                  <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                  Job Search Strategy and 1:1 Coaching
                  </p>
                  <p className="mt-6 text-lg/8 text-gray-600">
                    Navigate your job search with confidence using our proven strategies. We&apos;ll help you target the right opportunities, optimize your applications, and prepare for interviews effectively.
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <svg className="absolute top-1 left-1 size-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Job Search Strategy
                      </dt>{' '}
                      <dd className="inline">Develop a targeted approach to identify and apply for roles that align with your career goals and skills.</dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <svg className="absolute top-1 left-1 size-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Interview Preparation
                      </dt>{' '}
                      <dd className="inline">Master behavioral and technical interviews with comprehensive preparation and mock interview sessions.</dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <svg className="absolute top-1 left-1 size-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Application Optimization
                      </dt>{' '}
                      <dd className="inline">Learn how to tailor your applications, follow up effectively, and stand out in the application process.</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <Image
                src="/job-search-strategy.png"
                alt="Job search strategy planning and execution dashboard"
                width={2432}
                height={1442}
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                priority
              />
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
