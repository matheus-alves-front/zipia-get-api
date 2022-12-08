import React, { useEffect, useState } from "react";
import styles from './Navigation.module.scss'

// Type the props, Typing the params function to pass to the parent the values
interface NavigationFilter {
    dataApi: JobsNames[],
    NavigationFilterProps: (
        companyName: string,
        isSearch: boolean,
        isLastWeek: boolean
    ) => void
}

interface JobsNames {
    companyName: string,
    jobId: number
}

export function Navigation({
    dataApi, NavigationFilterProps
}: NavigationFilter) {
    const jobsApi = dataApi
    
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [isLastWeek, setIsLastWeek] = useState<boolean>(false)
    const [filterName, setFilterName] = useState<string>('')

    // click functions to pass the name of selected and clear the filter
    function handleSelect(e) {
        setIsLastWeek(false)
        setIsSearch(true)
        setFilterName(e.target.value)
    }

    function handleLastWeek() {
        setIsSearch(false)
        setIsLastWeek(true)
    }

    function cleanFilters() {
        setIsSearch(false)
        setIsLastWeek(false)
    }

    // when the states change, run the parameter function to set the values to the parent
    useEffect(() => {
        NavigationFilterProps(filterName, isSearch, isLastWeek)
    }, [filterName, isSearch, isLastWeek])

    return (
        <>
            <h5>Filter Jobs</h5>
            <header className={styles.container}>
                {/* <button onClick={() => handleLastWeek()}>Last week</button> */}
                <select name="Company Names" id="company-names"
                    onChange={(e) => handleSelect(e)}
                >
                    <option value="All" selected disabled>Choose a Company</option>
                    {jobsApi.map((item) => {
                        return (
                            <option key={item.jobId} value={item.companyName}>{item.companyName}</option>
                        )
                    })}
                </select>
                <button onClick={() => cleanFilters()}>Clean Filter</button>
            </header>
        </>
    )
}

