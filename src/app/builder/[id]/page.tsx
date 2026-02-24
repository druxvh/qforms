import { getFormByIdAction } from '@/actions/form';
import { notFound, redirect } from 'next/navigation';
import PublishedFormView from '../../../components/builder/PublishedFormView';
import { loadUser } from '@/data/users';
import BuilderClient from '../../../components/builder/BuilderClient';

type BuilderPageProps = {
    params: {
        id: string;
    };
};

export default async function BuilderPage({ params }: BuilderPageProps) {
    const user = await loadUser();
    if (!user.hasOnboarded) redirect('/onboarding');

    const { id } = await params;
    const form = await getFormByIdAction(id);

    if (!form) {
        notFound();
    }

    // If the form is published, show the share URL and confetti celebration
    if (form.published) {
        const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

        return <PublishedFormView shareUrl={shareUrl} formId={form.id} />;
    }

    return <BuilderClient form={form} />;
}
