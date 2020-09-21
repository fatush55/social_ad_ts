// Root
import React, {FC, useCallback, useEffect} from "react"
import {useFormikContext} from "formik"
import debounce from "lodash.debounce"


type PropsType = {
    debounceMs: number
}

export const AutoSubmit: FC<PropsType> = ({debounceMs}: {debounceMs: number}) => {
    const formik = useFormikContext()

    const debouncedSubmit = useCallback(debounce(formik.submitForm, debounceMs), [
        formik.submitForm,
        debounceMs
    ])

    useEffect(() => {
        formik.dirty && debouncedSubmit();
    }, [debouncedSubmit, formik.dirty, formik.values])

    return <></>
}
