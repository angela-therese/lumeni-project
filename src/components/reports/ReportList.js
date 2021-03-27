import React, { useContext, useEffect } from "react"
import { ParcelContext } from "../parcels/ParcelProvider"
import { GenreContext } from "../GenreProvider"

import './Reports.css'


export const ReportList = () => {


        const { genres, getGenres } = useContext(GenreContext)
        const { parcels, getParcels} = useContext(ParcelContext)
        const sortedParcels =  parcels.sort((a, b) => (a.parcelNumber > b.parcelNumber ? -1 : 1))

        useEffect(() => {
            getParcels()
            .then(getGenres)
        },[])
    

            //STATE CALCULATIONS
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
           


            //GENRE CALCULATIONS
        const newGenreArray = genres.map(g => {
            return (
                { "name" : g.name, "parcelLength": g.parcels?.length}
            )
        })

        const topGenres = newGenreArray.sort((a, b) => b.parcelLength - a.parcelLength).slice(0,4)

        const genrePercentFirst = (topGenres[0]?.parcelLength / currentYearTotal.length).toFixed(2)
        const genrePercentSecond = (topGenres[1]?.parcelLength / currentYearTotal.length).toFixed(2)
        const genrePercentThird = (topGenres[2]?.parcelLength / currentYearTotal.length).toFixed(2)
        const genrePercentFourth = (topGenres[3]?.parcelLength / currentYearTotal.length).toFixed(2)
        
        


     return(
        <>
        <section className="reports-container">
        <h3>Reports Go Here</h3>
        <h5>Yearly Total </h5><p>{currentYearTotal.length}</p>
        <article className="reports-state-list">
        
        
        <div className ="state-totals-list">
        <h5>State-by-State</h5>
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
        </div>

        <div className="genre-totals-list">
            <h5>Genres</h5>
             <p>{topGenres[0]?.name}--{topGenres[0]?.parcelLength}--{genrePercentFirst}</p>
             <p>{topGenres[1]?.name}--{topGenres[1]?.parcelLength}--{genrePercentSecond}</p>
             <p>{topGenres[2]?.name}--{topGenres[2]?.parcelLength}--{genrePercentThird}</p>
             <p>{topGenres[3]?.name}--{topGenres[3]?.parcelLength}--{genrePercentFourth}</p>
        </div>
                    
    </article>
    </section>
    </>
    )

}

