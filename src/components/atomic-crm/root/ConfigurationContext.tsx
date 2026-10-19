import { useMemo } from "react";
import { useStore } from "ra-core";

import type { DealStage, LabeledValue, NoteStatus } from "../types";
import { defaultConfiguration } from "./defaultConfiguration";

export const CONFIGURATION_STORE_KEY = "app.configuration";

export interface ConfigurationContextValue {
  companySectors: LabeledValue[];
  currency: string;
  dealCategories: LabeledValue[];
  dealPipelineStatuses: string[];
  dealStages: DealStage[];
  noteStatuses: NoteStatus[];
  taskTypes: LabeledValue[];
  title: string;
  darkModeLogo: string;
  lightModeLogo: string;
}

/** The part of the configuration shown before login (login and sign-up pages). */
export type Branding = Pick<
  ConfigurationContextValue,
  "title" | "darkModeLogo" | "lightModeLogo"
>;

export const pickBranding = (
  config: Partial<ConfigurationContextValue> | null | undefined,
): Partial<Branding> => {
  const branding: Partial<Branding> = {};
  if (config?.title) branding.title = config.title;
  if (config?.darkModeLogo) branding.darkModeLogo = config.darkModeLogo;
  if (config?.lightModeLogo) branding.lightModeLogo = config.lightModeLogo;
  return branding;
};

export const useConfigurationContext = () => {
  const [config] = useStore<ConfigurationContextValue>(
    CONFIGURATION_STORE_KEY,
    defaultConfiguration,
  );
  // Merge with defaults so that missing fields in stored config
  // fall back to default values (e.g. when new settings are added)
  return useMemo(() => ({ ...defaultConfiguration, ...config }), [config]);
};

export const useConfigurationUpdater = () => {
  const [, setConfig] = useStore<ConfigurationContextValue>(
    CONFIGURATION_STORE_KEY,
  );
  return setConfig;
};
