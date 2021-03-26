import React, { useState, useContext, useEffect } from "react"
// import { useHistory } from "react-router-dom"
import { ParcelContext } from "../parcels/ParcelProvider"
import './Reports.css'


export const ReportList = () => {


  
        const { parcels, getParcels} = useContext(ParcelContext)
        const sortedParcels =  parcels.sort((a, b) => (a.parcelNumber > b.parcelNumber ? -1 : 1))
        const [filteredParcels, setFiltered] = useState([])


        useEffect(() => {
            getParcels()
        },[])
    
        useEffect(() => {
                setFiltered(sortedParcels)
            },[])

            const currentYearTotal = sortedParcels.filter(p => p.dateSent.includes("2021"))
            
            const totalKY = sortedParcels.filter(p => p.facility?.state === "KY")
            const kyPercentage = (totalKY.length / currentYearTotal.length).toFixed(2)
           

            const totalMD = sortedParcels.filter(p => p.facility?.state === "MD")
            const mdPercentage = (totalMD.length / currentYearTotal.length).toFixed(2)
           
            const totalOH = sortedParcels.filter(p => p.facility?.state === "OH")
            const ohPercentage = (totalOH.length / currentYearTotal.length).toFixed(2)
           

            const totalTN = sortedParcels.filter(p => p.facility?.state === "TN")
            const tnPercentage = (totalTN.length / currentYearTotal.length).toFixed(2)
           

            const totalVA = sortedParcels.filter(p => p.facility?.state === "VA")
            const vaPercentage = (totalVA.length / currentYearTotal.length).toFixed(2)
           

            const totalWV = sortedParcels.filter(p => p.facility?.state === "WV")
            const wvPercentage = (totalWV.length / currentYearTotal.length).toFixed(2)
           

          



     return(
        <>
        <section className="reports-container">
        <h3>Reports Go Here</h3>
        <article className="report-state-list">
        <h5>Yearly Total</h5>
        <p>{currentYearTotal.length}</p>
        <h6>Kentucky</h6>
        <p>{totalKY.length} -- {kyPercentage}</p>
        <h6>Maryland</h6>
        <p>{totalMD.length} -- {mdPercentage}</p>
        <h6>Ohio</h6>
        <p>{totalOH.length} -- {ohPercentage}</p>
        <h6>Tennessee</h6>
        <p>{totalTN.length} -- {tnPercentage}</p>
        <h6>Virginia</h6>
        <p>{totalVA.length} -- {vaPercentage}</p>
        <h6>West Virginia</h6>
        <p>{totalWV.length} -- {wvPercentage}</p>
                    
    </article>
    </section>
    </>
    )

}

