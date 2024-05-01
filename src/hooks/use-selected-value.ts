import { useState } from "react"

export function useSelectedValue<T>(value?: T) {
    const [selected, setSelected] = useState<T | null>(value ?? null)

    const handleSelected = (value: T | null) => {
        setSelected(value);
    }

    return {
        selected,
        handleSelected
    }
}
