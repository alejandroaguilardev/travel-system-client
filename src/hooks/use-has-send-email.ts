import { useState } from 'react'

export const useHasSendEmail = (valueDefault = true) => {
    const [hasSendEmail, setHasSendEmail] = useState<boolean>(false);

    const onChangeHasSendEmail = (value: boolean): void => {
        setHasSendEmail(value)
    }

    return {
        hasSendEmail,
        onChangeHasSendEmail
    }
}
