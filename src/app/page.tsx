import {
    AnimatedElement,
    AnimatedSection
} from '@/components/AnimatedSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ImageCarousel } from '@/components/ImageCarousel';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import {
    clearCache,
    getCachedCoachingSection,
    getCachedFooterContent,
    getCachedHeroContent,
    getCachedHowItWorksSection,
    getCachedLinkedInSection,
    getCachedPricingSection,
    getCachedResumeSection,
    getCachedTestimonials,
    getCachedWhyMeSection,
    getCachedWritingSection,
    type CoachingFeature,
    type HowItWorksFeature,
    type LinkedInFeature,
    type ResumeFeature,
    type WhyMeFeature,
    type WritingFeature
} from '@/utils/data-sanity';
import { CheckIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

// This ensures the page is dynamically rendered
export const revalidate = 0;

// This ensures the page is not cached
export const dynamic = 'force-dynamic';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default async function Home() {
  // Clear the cache on each page load to ensure fresh data
  clearCache();

  // Fetch all section content in parallel
  const [
    heroContent,
    linkedInContent,
    resumeContent,
    coachingContent,
    whyMeContent,
    howItWorksContent,
    testimonials,
    pricingContent,
    writingContent,
    footerContent
  ] = await Promise.all([
    getCachedHeroContent(),
    getCachedLinkedInSection(),
    getCachedResumeSection(),
    getCachedCoachingSection(),
    getCachedWhyMeSection(),
    getCachedHowItWorksSection(),
    getCachedTestimonials(),
    getCachedPricingSection(),
    getCachedWritingSection(),
    getCachedFooterContent()
  ]);

  return (
    <>
      <div className="bg-white">
        <Header socialLinks={footerContent?.socialLinks || []} />
        <AnimatedSection className="relative isolate px-6 pt-8 lg:px-8" isContainer>
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
          <div className="mx-auto max-w-2xl py-8 sm:py-12 lg:py-16">
            <AnimatedElement>
              <div className="text-center">
                <div className="flex flex-col items-center mb-8">
                  <div className="relative size-24 rounded-full overflow-hidden mb-4 ring-2 ring-yellow-500/20">
                    {heroContent?.profileImage?.[0] && (
                      <Image
                        src={typeof heroContent.profileImage[0] === 'string' 
                          ? heroContent.profileImage[0] 
                          : heroContent.profileImage[0].url}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <h2 className="text-2xl font-medium text-gray-900">
                    {heroContent?.name || 'Srinidhi Narayana'}
                  </h2>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {heroContent?.title || 'Land Your Dream Job Faster'}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {heroContent?.description || 'Optimized Resume, LinkedIn, and Job Search Strategy to help you stand out in the job market and accelerate your career growth.'}
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
            </AnimatedElement>
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
        </AnimatedSection>
      </div>

      <main className="bg-white">
        {/* Services Section */}
        <AnimatedSection id="services" className="bg-white" isContainer>
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <AnimatedElement>
              <div>
                <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{writingContent?.title}</h2>
                <p className="mt-4 text-lg text-gray-600 whitespace-pre-line">
                  {writingContent?.description}
                </p>

                <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                  {writingContent?.features?.filter((feature): feature is WritingFeature => feature.type === 'writing').map((feature, index) => (
                    <div key={index} className="border-t border-gray-200 pt-4">
                      <dt className="font-medium text-gray-900">{feature.title}</dt>
                      <dd className="mt-2 text-sm text-gray-600 whitespace-pre-line">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </AnimatedElement>
            <AnimatedElement>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 self-center">
                {writingContent?.images?.map((image, index) => {
                  const imageSrc = typeof image === 'string' ? image : image?.url;
                  return imageSrc && (
                    <Image
                      key={index}
                      src={imageSrc}
                      alt={`Writing service example ${index + 1}`}
                      width={400}
                      height={300}
                      className="rounded-lg bg-gray-100 object-cover aspect-[4/3]"
                    />
                  );
                })}
              </div>
            </AnimatedElement>
          </div>
        </AnimatedSection>
        {/* Linkedin Profile Optimisation Section */}
        <AnimatedSection id="linkedin-optimization" className="overflow-hidden bg-white py-24 sm:py-32" isContainer>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
              <AnimatedElement>
                <div className="lg:pt-4 lg:pr-8">
                  <div className="lg:max-w-lg">
                    <h2 className="text-base/7 font-semibold text-yellow-600">{linkedInContent?.subtitle || 'Stand Out on LinkedIn'}</h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                      {linkedInContent?.title || 'LinkedIn Profile Optimization'}
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-600 whitespace-pre-line">
                      {linkedInContent?.description}
                    </p>
                    <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                      {linkedInContent?.features?.filter((feature): feature is LinkedInFeature => feature.type === 'linkedin').map((feature, index) => (
                        <div key={index} className="relative pl-9">
                          <dt className="inline font-semibold text-gray-900">
                            <svg className="absolute top-1 left-1 size-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                            </svg>
                            {feature.title}
                          </dt>{' '}
                          <dd className="inline whitespace-pre-line">{feature.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </AnimatedElement>
              <AnimatedElement>
                {console.log('LinkedIn image data:', linkedInContent?.images?.[0])}
                {linkedInContent?.images?.[0] && (
                  <Image
                    src={typeof linkedInContent.images[0] === 'string' 
                      ? linkedInContent.images[0] 
                      : linkedInContent.images[0].url}
                    alt="LinkedIn Profile Optimization"
                    width={2432}
                    height={1442}
                    className="w-full h-auto rounded-xl shadow-xl ring-1 ring-gray-400/10"
                    priority
                  />
                )}
              </AnimatedElement>
            </div>
          </div>
        </AnimatedSection>

        {/* Resume Writing Section */}
        <AnimatedSection id="resume-writing" className="bg-white py-24 sm:py-32" isContainer>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
              <AnimatedElement>
                <div>
                  <h2 className="text-base/7 font-semibold text-yellow-600">{resumeContent?.subtitle || 'Professional Resume Writing'}</h2>
                  <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
                    {resumeContent?.title || 'Stand Out with a Professionally Crafted Resume'}
                  </p>
                  <p className="mt-6 text-lg/8 text-gray-600 whitespace-pre-line">
                    {resumeContent?.description}
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600">
                    {resumeContent?.features?.filter((feature): feature is ResumeFeature => feature.type === 'resume').map((feature, index) => (
                      <div key={index} className="relative pl-9">
                        <dt className="inline font-semibold text-gray-900">
                          <svg className="absolute top-1 left-1 size-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                          </svg>
                          {feature.title}
                        </dt>{' '}
                        <dd className="inline whitespace-pre-line">{feature.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </AnimatedElement>
              <AnimatedElement>
                {resumeContent?.images && resumeContent.images.length > 0 && (
                  <div className="relative h-[600px] w-full">
                    <ImageCarousel images={resumeContent.images} />
                  </div>
                )}
              </AnimatedElement>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Customer Success Consulting */}
        <AnimatedSection id="coaching" className="bg-white py-24 sm:py-32" isContainer>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <AnimatedElement>
                <h2 className="text-base/7 font-semibold text-yellow-600">{coachingContent?.subtitle || 'Customer Success'}</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
                  {coachingContent?.title || 'Customer Success Consulting'}
                </p>
                <p className="mt-6 text-lg/8 text-gray-600 whitespace-pre-line">
                  {coachingContent?.description || 'Personalized guidance to accelerate your career growth in Customer Success. Get expert advice on breaking into the field and developing effective strategies.'}
                </p>
              </AnimatedElement>
            </div>

            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {coachingContent?.features?.filter((feature): feature is CoachingFeature => feature.type === 'coaching').map((feature, index) => {
                console.log('Coaching feature image data:', feature.images?.[0]);
                return (
                  <AnimatedElement key={index}>
                    <div className="lg:pr-8">
                      <div className="lg:max-w-lg">
                        <h3 className="text-base/7 font-semibold text-yellow-600">{feature.title}</h3>
                        <p className="mt-6 text-lg/8 text-gray-600 whitespace-pre-line">{feature.description}</p>
                      </div>
                    </div>
                    {feature.images?.[0] && (
                      <div className="relative mt-8">
                        <Image
                          src={typeof feature.images[0] === 'string' 
                            ? feature.images[0] 
                            : feature.images[0].url}
                          alt={feature.title}
                          width={2432}
                          height={1442}
                          className="w-full h-auto rounded-xl shadow-xl ring-1 ring-gray-400/10"
                        />
                      </div>
                    )}
                  </AnimatedElement>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* Why choose me? Section */}
        <AnimatedSection id="why-me" className="py-24 bg-white" isContainer>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <AnimatedElement>
                <h2 className="text-base/7 font-semibold text-yellow-600">{whyMeContent?.subtitle || 'Why Choose Me?'}</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
                  {whyMeContent?.title || 'Experience & Expertise'}
                </p>
                <p className="mt-6 text-lg/8 text-gray-600 whitespace-pre-line">
                  {whyMeContent?.description}
                </p>
              </AnimatedElement>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {whyMeContent?.features?.filter((feature): feature is WhyMeFeature => feature.type === 'whyMe').map((feature, index) => (
                  <AnimatedElement key={index}>
                    <div className="relative pl-16">
                      <dt className="text-base/7 font-semibold text-gray-900">
                        <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-yellow-500">
                          <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon || "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"} />
                          </svg>
                        </div>
                        {feature.title}
                      </dt>
                      <dd className="mt-2 text-base/7 text-gray-600 whitespace-pre-line">{feature.description}</dd>
                    </div>
                  </AnimatedElement>
                ))}
              </dl>
            </div>
          </div>
        </AnimatedSection>

        {/* How it works? Section */}
        <AnimatedSection id="how-it-works" className="py-24 bg-white" isContainer>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedElement>
              <h2 className="text-base/7 font-semibold text-yellow-600">{howItWorksContent?.subtitle || 'Process'}</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
                {howItWorksContent?.title || 'How it works?'}
              </p>
            </AnimatedElement>
            <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {howItWorksContent?.features?.filter((feature): feature is HowItWorksFeature => feature.type === 'howItWorks').map((feature, index) => (
                <AnimatedElement key={index}>
                  <div className="flex flex-col h-full bg-gray-50/50 rounded-lg border border-gray-100 p-8">
                    <h3 className="text-yellow-500 font-semibold mb-4">{feature.title}</h3>
                    <p className="flex-grow mb-4 whitespace-pre-line">{feature.description}</p>
                    {feature.subtitle && (
                      <p className="text-gray-500 text-sm">{feature.subtitle}</p>
                    )}
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonials Section */}
        <AnimatedSection className="py-24 sm:py-32" isContainer>
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-base/7 font-semibold text-yellow-600">Testimonials</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
                What Others Say
              </p>
            </div>
            <TestimonialCarousel testimonials={testimonials} />
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
              <h2 className="text-base/7 font-semibold text-yellow-600">{pricingContent?.subtitle || 'Pricing & Packages'}</h2>
              <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
                {pricingContent?.title || 'Choose the right plan for you'}
              </p>
            </AnimatedElement>
          </div>
          <AnimatedElement>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
              {pricingContent?.description || 'Select a package that best suits your career goals. Each plan is designed to help you stand out in the job market and accelerate your career growth.'}
            </p>
          </AnimatedElement>
          <div className="mx-auto mt-16 flex flex-col sm:mt-20 md:flex-row items-stretch gap-6 sm:gap-8 max-w-7xl px-4">
            {(pricingContent?.tiers || []).map((tier) => (
              <AnimatedElement key={tier.id} className="flex flex-1 min-w-0">
                <div
                  className={classNames(
                    tier.featured ? 'relative bg-white shadow-2xl' : 'bg-white',
                    'flex flex-col w-full rounded-3xl p-6 ring-1 ring-gray-900/10 sm:p-8 lg:p-10',
                    tier.featured ? 'ring-2 ring-yellow-500' : 'ring-1 ring-gray-200',
                  )}
                >
                  <h3
                    id={tier.id}
                    className={classNames(tier.featured ? 'text-yellow-600' : 'text-gray-900', 'text-base/7 font-semibold')}
                  >
                    {tier.name}
                  </h3>
                  <p className="mt-4 flex items-baseline gap-x-2">
                    <span className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">
                      {tier.price}
                    </span>
                  </p>
                  <p className="mt-6 text-base/7 text-gray-600 whitespace-pre-line">
                    {tier.description}
                  </p>
                  <ul
                    role="list"
                    className="mt-8 space-y-3 text-sm/6 text-gray-600 flex-grow"
                  >
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          aria-hidden="true"
                          className="h-6 w-5 flex-none text-yellow-600"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={tier.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-describedby={tier.id}
                    className={classNames(
                      tier.featured
                        ? 'bg-yellow-500 text-white shadow-xs hover:bg-yellow-400 focus-visible:outline-yellow-500'
                        : 'text-yellow-600 ring-1 ring-yellow-200 ring-inset hover:ring-yellow-300 focus-visible:outline-yellow-600',
                      'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2',
                    )}
                  >
                    {tier.buttonText}
                  </a>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </AnimatedSection>
      </main>
      <Footer content={footerContent} />
    </>
  );
}
