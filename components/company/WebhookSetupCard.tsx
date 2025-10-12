import { useState } from 'react';
import SetupCard from '../SetupCard';
import Image from 'next/image';
import { Square2StackIcon, CheckIcon } from '@heroicons/react/24/outline';

interface WebhookConfig {
  id: string;
  title: string;
  url: string;
  events: string;
  image: string;
  note?: string;
}

export default function WebhookSetupCard() {
  const [copiedUrls, setCopiedUrls] = useState<{ [key: string]: boolean }>({});

  const webhookData: WebhookConfig[] = [
    {
      id: 'issues',
      title: 'Issues Webhook',
      url: 'https://uvhydsbazjxqaaijmvhr.supabase.co/functions/v1/create-issue',
      events: 'Issues only',
      image: '/images/issues.png',
      note: "Make sure to add the label 'mergemint' to your issues, otherwise they won't be registered by the system.",
    },
    {
      id: 'pullrequests',
      title: 'Pull Requests Webhook',
      url: 'https://uvhydsbazjxqaaijmvhr.supabase.co/functions/v1/rapid-action',
      events: 'Pull requests only',
      image: '/images/pullreq.png',
    },
  ];

  const webhookSettingsUrl = 'https://github.com/{org}/{repo}/settings/hooks';

  const handleCopyUrl = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrls((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedUrls((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <SetupCard className="h-[60%]">
      <h1 className="text-xl self-start font-semibold text-neutral-700 font-nunito mb-1">
        3. Add Webhooks
      </h1>
      <div className="text-sm font-medium text-neutral-500 font-nunito mb-4">
        <p className="mb-6">
          Navigate to your repository's webhook settings at{' '}
          <span className="font-mono text-xs bg-neutral-100 px-1 py-0.5 rounded -translate-y-0.5">
            {webhookSettingsUrl}
          </span>{' '}
          and add <span className="underline text-neutral-600">two</span>{' '}
          webhooks:
        </p>

        <div className="flex w-full gap-6">
          {webhookData.map((webhook) => (
            <div
              key={webhook.id}
              className={`flex-1 ${webhook.id === 'issues' && 'pr-6 border-r border-neutral-300'}`}
            >
              <p className="font-semibold text-neutral-500 mb-1 underline font-exo-2">
                {webhook.title}
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 uppercase tracking-wide">
                    URL
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    <p className="font-mono bg-neutral-50 px-2 py-1 rounded text-neutral-400 break-all mt-1 flex-1">
                      {webhook.url}
                    </p>
                    <button
                      onClick={() => handleCopyUrl(webhook.url, webhook.id)}
                      className="p-0.5 hover:bg-neutral-100 rounded transition-colors"
                      title="Copy URL"
                    >
                      {copiedUrls[webhook.id] ? (
                        <CheckIcon className="w-4 h-4 text-green-500" />
                      ) : (
                        <Square2StackIcon className="w-4 h-4 text-neutral-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 uppercase tracking-wide">
                    Content Type :
                  </span>
                  <p>application/json</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 uppercase tracking-wide">
                    Events :
                  </span>
                  <p>{webhook.events}</p>
                </div>

                <Image
                  src={webhook.image}
                  alt="Webhook"
                  width={300}
                  height={250}
                  className="opacity-90 rounded-md ml-15 mb-2"
                />
              </div>

              {webhook.note && (
                <div className="flex gap-2 mt-2">
                  <span className="text-neutral-400 font-medium">Note:</span>
                  <span className="text-sm ml-1">{webhook.note}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SetupCard>
  );
}
