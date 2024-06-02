import { useState } from 'react'

export const useHasSendEmail = (valueDefault = true) => {
    const [hasSendEmail, setHasSendEmail] = useState<boolean>(valueDefault);

    const onChangeHasSendEmail = (value: boolean): void => {
        setHasSendEmail(value)
    }

    return {
        hasSendEmail,
        onChangeHasSendEmail
    }
}
