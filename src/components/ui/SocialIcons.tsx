import { site } from "@/lib/site";

const icons = {
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zm0 4.9a4.9 4.9 0 100 9.8 4.9 4.9 0 000-9.8zm0 8.1a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.1-9.4a1.2 1.2 0 100 2.3 1.2 1.2 0 000-2.3z" />
  ),
  facebook: (
    <path d="M13.5 21.9v-8h2.7l.4-3.1h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.5c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.6v3.1h2.8v8z" />
  ),
  youtube: (
    <path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5.2 3z" />
  ),
};

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {(Object.keys(icons) as (keyof typeof icons)[]).map((key) => (
        <a
          key={key}
          href={site.socials[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={key}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-turf"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden>
            {icons[key]}
          </svg>
        </a>
      ))}
    </div>
  );
}

export function WhatsAppIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`} aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8.2 8.2 0 01-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 00-.8.4 3.4 3.4 0 00-1 2.5 5.9 5.9 0 001.2 3.1 13.4 13.4 0 005.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 002-1.4 2.5 2.5 0 00.2-1.4c-.1-.1-.3-.2-.6-.3zM12 21.8a9.8 9.8 0 01-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1112 21.8zm8.4-18.2A11.8 11.8 0 001.7 17.8L0 24l6.3-1.7a11.8 11.8 0 005.7 1.5A11.8 11.8 0 0020.4 3.6z" />
    </svg>
  );
}
