import type { UseColorDisplaySettings } from "./use-color-display-settings";

export const colorFormatSelector = (state: UseColorDisplaySettings) => {
	return state.format;
};

export const colorSetFormatSelector = (state: UseColorDisplaySettings) => {
	return state.setFormat;
};
