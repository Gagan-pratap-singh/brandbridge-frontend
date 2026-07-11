import type { ReactNode } from "react";

interface Props {
  hero: ReactNode;
  stats: ReactNode;
  about: ReactNode;
  social: ReactNode;
  professional: ReactNode;
  collaborations: ReactNode;
  footer: ReactNode;
}

export default function ProfileLayout({
  hero,
  stats,
  about,
  social,
  professional,
  collaborations,
  footer,
}: Props) {
  return (
    <div className="pb-10">

      {hero}

      {stats}

      <div className="grid lg:grid-cols-3 gap-8 mt-10 px-10">
        <div className="lg:col-span-2">
          {about}
        </div>

        {social}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-10 px-10">
        {professional}
        {collaborations}
      </div>

      <div className="mt-12 px-10">
        {footer}
      </div>

    </div>
  );
}