export type CustomFormEvent<T> = React.FormEvent<T> & {
    nativeEvent: {
        submitter?: HTMLButtonElement;
    };
};
