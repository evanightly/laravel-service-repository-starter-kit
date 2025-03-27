const intents = {
    CUSTOM_ACTION: 'custom.action',
};

export const IntentEnum = intents;

export type IntentEnum = (typeof intents)[keyof typeof intents];
