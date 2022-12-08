import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useEffect, useState } from "react";
import { JobsCards } from "../../src/components/JobsCards";
import { Navigation } from "../../src/components/Navigation";

import styles from '../../styles/Jobs.module.scss'

export default function Jobs({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [getData, setGetData] = useState<Jobs[]>(data.jobs)
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [filterByName, setFilterByName] = useState<string>('')
  const [isLastWeek, setIsLastWeek] = useState<boolean>(true)

  // Manipulating the data from props with statements
  function FilteringData() {
    if (isSearch) {
      let resultName = data.jobs.filter(item => item.companyName === filterByName)
      setGetData(resultName)
      return
    } else if (isLastWeek) {
      // I had difficulty on this.
      return
    } else {
      setGetData(data.jobs)
      return
    }
  }

  useEffect(() => {
    FilteringData()
  }, [filterByName, isSearch, isLastWeek])

  // function to get values from Navigation component 
  function handleHeaderStyles(
    companyName: string,
    isSearch: boolean,
    isLastWeek: boolean
  ) {
    setIsSearch(isSearch)
    setFilterByName(companyName)
    setIsLastWeek(isLastWeek)
  }

  return (
    <div className={styles.container}>
        <h1>Jobs</h1>
        <Navigation NavigationFilterProps={handleHeaderStyles} dataApi={data.jobs} />
        <JobsCards dataApi={getData} />
    </div>
  )
}

// Type the data from API
type Data = { 
    jobs: Jobs[],
    remainingJobs: Number,
    totalJobs: Number
}

type Jobs = {
    jobTitle: string,
    companyName: string,
    jobDescription: string,
    jobId: number,
    postingDate: string,
    location: string
}

//  Fetch API from server side
export const getServerSideProps: GetServerSideProps<{ data: Data }> = async () => {
  const res = await fetch(
    'https://www.zippia.com/api/jobs/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "companySkills": true,
                "dismissedListingHashes": [],
                "fetchJobDesc": true,
                "jobTitle": "Business Analyst",
                "locations": [],
                "numJobs": 20,
                "previousListingHashes": []
            }
        )
      })
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}
