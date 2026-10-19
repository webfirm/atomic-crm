import type { Branding } from "./ConfigurationContext";

const FAVICON_ID = "branding-favicon";

/**
 * Applies the branding to the browser tab: the title as the page title and
 * the light mode logo as the favicon. Missing values keep the defaults from
 * index.html.
 */
export const applyBranding = (branding?: Partial<Branding>) => {
  if (branding?.title && document.title !== branding.title) {
    document.title = branding.title;
  }
  applyFavicon(branding?.lightModeLogo);
};

const applyFavicon = (logo: string | undefined) => {
  let link = document.getElementById(FAVICON_ID) as HTMLLinkElement | null;
  if (!logo) {
    link?.remove();
    return;
  }
  if (!link) {
    link = document.createElement("link");
    link.id = FAVICON_ID;
    link.rel = "icon";
    document.head.appendChild(link);
  }
  if (link.href !== logo) link.href = logo;
};
