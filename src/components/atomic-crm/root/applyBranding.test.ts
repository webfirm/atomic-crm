import { afterEach, describe, expect, it } from "vitest";

import { applyBranding } from "./applyBranding";

const brandingIcon = () =>
  document.querySelector<HTMLLinkElement>("link#branding-favicon");

describe("applyBranding", () => {
  const initialTitle = document.title;
  afterEach(() => {
    applyBranding(undefined);
    document.title = initialTitle;
  });

  it("uses the branding title as the page title", () => {
    applyBranding({ title: "Colby Distributors CRM" });

    expect(document.title).toBe("Colby Distributors CRM");
  });

  it("uses the logo as the tab icon and follows logo changes", () => {
    applyBranding({ lightModeLogo: "https://example.com/old.png" });
    applyBranding({ lightModeLogo: "https://example.com/new.png" });

    expect(document.querySelectorAll("link#branding-favicon")).toHaveLength(1);
    expect(brandingIcon()?.rel).toBe("icon");
    expect(brandingIcon()?.href).toBe("https://example.com/new.png");
  });

  it("keeps the default title and favicon without branding", () => {
    applyBranding({
      title: "Colby Distributors CRM",
      lightModeLogo: "https://example.com/logo.png",
    });
    document.title = initialTitle;
    applyBranding(undefined);

    expect(document.title).toBe(initialTitle);
    expect(brandingIcon()).toBeNull();
  });
});
