import React, { useEffect, useState } from "react";
import { JobsModal } from "../JobModal";

import styles from './JobsCards.module.scss'

// Type the props
type CardData = {
    jobId: number,
    jobTitle: string,
    companyName: string,
    location: string,
    postingDate: string,
    jobDescription: string
}

type DataApi = {
    dataApi: CardData[]
}

export function JobsCards({
    dataApi
}: DataApi) {
    const jobsJson = dataApi

    const [cardData, setCardData] = useState<CardData>()
    const [isModalTrue, setIsModalTrue] = useState(false)

    function openModal(jobInformation: CardData) {
        setIsModalTrue(true)
        setCardData(jobInformation)  
    }

    return (
        <section className={styles.container}>
            {/* Map the itens to render the job cards */}
            {jobsJson.map((item: CardData) => {
                return (
                    <div 
                        className={styles.jobCard} 
                        key={item.jobId}
                        onClick={() => openModal(item)}
                    >
                        <h3 className={styles.jobTitle}>{item.jobTitle}</h3>
                        <p className={styles.companyName}>{item.companyName}</p>
                        <p className={styles.location}>{item.location}</p>
                        <p className={styles.jobDate}>{new Date(item.postingDate).toLocaleDateString("en-US")}</p>
                    </div>    
                )
            })}

            {/* Modal passing the props */}
            {isModalTrue ? 
                <JobsModal 
                    closeModal={() => setIsModalTrue(false)}
                    jobTitle={cardData?.jobTitle} 
                    companyName={cardData?.companyName}
                    location={cardData?.location}
                    postingDate={cardData?.postingDate}
                    jobDescription={cardData?.jobDescription}
                />
            : ''}
        </section>
    )
}