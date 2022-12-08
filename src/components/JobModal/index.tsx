import React from "react"
import { MdClose } from 'react-icons/md'
import styles from './JobModal.module.scss'

type CardDataModal = {
    jobTitle: string | undefined,
    companyName: string | undefined,
    location: string | undefined,
    postingDate: string | undefined,
    jobDescription: string | undefined,
    closeModal: () => void
}

// Modal getting the props data (job details)
export function JobsModal({
    jobTitle,
    companyName,
    location,
    postingDate,
    jobDescription,
    closeModal
}: CardDataModal) {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <MdClose
                    onClick={() => closeModal()}
                    className={styles.close}
                />
                <h3 className={styles.title}>{jobTitle}</h3>
                <p className={styles.companyName}>{companyName}</p>
                <p className={styles.location}>{location}</p>
                <p className={styles.postingDate}>{new Date(postingDate || '').toLocaleDateString("en-US")}</p>

                <h4 className={styles.descriptionTitle}>Job Description</h4>

                {/* 
                I know this is not recommened but I had to do this setInnerHTML because 
                the api response of this have HTML tags and the time is short
                */}
                <div className={styles.jobDescription} dangerouslySetInnerHTML={{ __html: jobDescription || ''}}></div>
            </div>
        </div>
    )
}