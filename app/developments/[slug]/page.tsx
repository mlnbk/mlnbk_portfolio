import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPhysicalDevelopmentBySlug, physicalDevelopments } from '@Constants/constants';

import Footer from '@Components/Footer';
import Navigation from '@Components/Navigation';
import PhysicalProjectDetail from '@Components/PhysicalProjectDetail';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return physicalDevelopments.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPhysicalDevelopmentBySlug(slug);
  if (!project) {
    return { title: 'Project' };
  }
  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `https://mlnbk.com/developments/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Milan Bako`,
      description: project.description,
      url: `https://mlnbk.com/developments/${slug}`,
    },
  };
}

export default async function PhysicalProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getPhysicalDevelopmentBySlug(slug);
  if (!project) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      <Navigation />
      <PhysicalProjectDetail project={project} />
      <Footer />
    </div>
  );
}
