import Link from 'next/link';

import { PhysicalDevelopment, PhysicalProjectImage } from '@Types/types';

type PhysicalProjectDetailProps = {
  project: PhysicalDevelopment;
};

const textBlockClass =
  'text-base font-light leading-relaxed text-gray-600 md:text-lg dark:text-gray-400';

function StoryRow({
  textFirst,
  paragraph,
  images,
}: {
  textFirst: boolean;
  paragraph: string;
  images: PhysicalProjectImage[];
}) {
  const rowCaption = images.find((img) => img.caption)?.caption;
  const textEl = (
    <div className='flex flex-1 items-center md:max-w-[44%]'>
      <p className={textBlockClass}>{paragraph}</p>
    </div>
  );

  const figureEl = (
    <figure className='flex-1 md:max-w-[56%]'>
      <div className={`grid gap-3 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {images.map((image, idx) => (
          <div key={idx}>
            <div className='overflow-hidden rounded-sm bg-gray-100 dark:bg-gray-800'>
              <img
                src={image.src}
                alt={image.alt}
                className='mx-auto block h-64 w-full object-cover md:h-72'
              />
            </div>
          </div>
        ))}
      </div>
      {rowCaption ? (
        <figcaption className='mt-3 text-xs font-light leading-relaxed text-gray-500 dark:text-gray-500'>
          {rowCaption}
        </figcaption>
      ) : null}
    </figure>
  );

  return (
    <div className='flex max-w-4xl flex-col gap-8 md:flex-row md:items-center md:gap-10'>
      {textFirst ? (
        <>
          {textEl}
          {figureEl}
        </>
      ) : (
        <>
          {figureEl}
          {textEl}
        </>
      )}
    </div>
  );
}

const PhysicalProjectDetail = ({ project }: PhysicalProjectDetailProps) => {
  const { title, detail } = project;
  const { regionIntro, contextNotes, processStory, processImages, finalImages, finalIntro } =
    detail;

  const imagesPerRow = 2;
  const pairCount = Math.min(processStory.length, Math.ceil(processImages.length / imagesPerRow));
  const finalText = finalIntro ?? finalImages[0]?.caption ?? '';

  return (
    <article className='mx-auto max-w-5xl px-6 pb-24 pt-24 md:px-12 md:pb-32 md:pt-32 lg:px-16'>
      <p className='mb-8 text-sm font-light text-gray-500 dark:text-gray-500'>
        <Link href='/' className='transition-colors hover:text-gray-800 dark:hover:text-gray-300'>
          ← Home
        </Link>
      </p>

      <header className='mb-14 md:mb-20'>
        <h1 className='mb-6 text-4xl font-light tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl lg:text-6xl'>
          {title}
        </h1>
      </header>

      <div className='space-y-14 md:space-y-20'>
        <section className='max-w-3xl space-y-6'>
          <h2 className='text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-500'>
            The setting
          </h2>
          {regionIntro.map((paragraph, i) => (
            <p key={i} className={textBlockClass}>
              {paragraph}
            </p>
          ))}
          {contextNotes && contextNotes.length > 0 ? (
            <aside className='border-l border-gray-200 py-1 pl-5 dark:border-gray-700'>
              <p className='mb-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-500'>
                In reach
              </p>
              <ul className='space-y-2'>
                {contextNotes.map((line, i) => (
                  <li
                    key={i}
                    className='text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400'
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </section>

        {pairCount > 0 ? (
          <section className='space-y-12 md:space-y-16'>
            <h2 className='text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-500'>
              The work
            </h2>
            <div className='max-w-3xl space-y-16 md:space-y-24'>
              {Array.from({ length: pairCount }, (_, i) => (
                <StoryRow
                  key={i}
                  textFirst={i % 2 === 0}
                  paragraph={processStory[i] ?? ''}
                  images={processImages.slice(i * imagesPerRow, i * imagesPerRow + imagesPerRow)}
                />
              ))}
            </div>
          </section>
        ) : null}

        {finalImages.length > 0 && finalText ? (
          <section className='space-y-10 md:space-y-12'>
            <h2 className='text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-500'>
              As finished
            </h2>
            <StoryRow
              textFirst={pairCount % 2 === 0}
              paragraph={finalText}
              images={finalImages.slice(0, 2)}
            />
          </section>
        ) : null}
      </div>
    </article>
  );
};

export default PhysicalProjectDetail;
