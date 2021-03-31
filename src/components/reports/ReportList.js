import React, { useContext, useEffect } from "react"
import { ParcelContext } from "../parcels/ParcelProvider"
import { GenreContext } from "../GenreProvider"
import { Bar, Pie, Doughnut } from "react-chartjs-2"

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
            const kyPercentage = ((totalKY.length / currentYearTotal.length)*100).toFixed(2)
            console.log(totalKY.length)
           

            const totalMD = sortedParcels.filter(p => p.facility?.state === "MD")
            const mdPercentage = ((totalMD.length / currentYearTotal.length)*100).toFixed(2)
           
            const totalOH = sortedParcels.filter(p => p.facility?.state === "OH")
            const ohPercentage = ((totalOH.length / currentYearTotal.length)*100).toFixed(2)
           

            const totalTN = sortedParcels.filter(p => p.facility?.state === "TN")
            const tnPercentage = ((totalTN.length / currentYearTotal.length)*100).toFixed(2)
           

            const totalVA = sortedParcels.filter(p => p.facility?.state === "VA")
            const vaPercentage = ((totalVA.length / currentYearTotal.length)*100).toFixed(2)
           

            const totalWV = sortedParcels.filter(p => p.facility?.state === "WV")
            const wvPercentage = ((totalWV.length / currentYearTotal.length)*100).toFixed(2)
           


            //GENRE CALCULATIONS
        const newGenreArray = genres.map(g => {
            return (
                { "name" : g.name, "parcelLength": g.parcels?.length}
            )
        })

        const topGenres = newGenreArray.sort((a, b) => b.parcelLength - a.parcelLength).slice(0,5)
        

        const genreOne = topGenres[0]?.name
        const genreTwo = topGenres[1]?.name
        const genreThree = topGenres[2]?.name
        const genreFour = topGenres[3]?.name
        const genreFive = topGenres[4]?.name
        const totalTopgenres = topGenres[0]?.parcelLength + topGenres[1]?.parcelLength + topGenres[2]?.parcelLength+topGenres[3]?.parcelLength+ topGenres[4]?.parcelLength

        const genrePercentFirst = ((topGenres[0]?.parcelLength / currentYearTotal.length)*100).toFixed(2)
        const genrePercentSecond = ((topGenres[1]?.parcelLength / currentYearTotal.length)*100).toFixed(2)
        const genrePercentThird = ((topGenres[2]?.parcelLength / currentYearTotal.length)*100).toFixed(2)
        const genrePercentFourth = ((topGenres[3]?.parcelLength / currentYearTotal.length)*100).toFixed(2)
        const genrePercentFifth = ((topGenres[4]?.parcelLength / currentYearTotal.length)*100).toFixed(2)
        const genrePercentOthers = (currentYearTotal-totalTopgenres)/((currentYearTotal.length)*100).toFixed(2)
        
        //CHARTS
        




     return(
       <>
        <article className="reports-container"> 
         <h3>Data Summaries</h3>
         <h5>View trends according to destinations and genres.</h5>
        
        <section className="charts-div">
        <article className="states-div">
            <h4>States</h4>
        <section className="state-total-bar">
        <h5>Books per State</h5>
        <Bar 
            data={{
                labels:['KY', 'MD', 'OH', 'TN', 'VA', 'WV'],
                datasets: [
                    {
                        label: 'Books Sent',
                        data: [totalKY.length, totalMD.length, totalTN.length, totalOH.length, totalVA.length, totalWV.length],
                        backgroundColor: ['rgba(193,66,50)', 'rgba(191,127,63)', 'rgba(191,191,63)', 'rgba(127,191,63)', 'rgba(105,160,215)', 'rgba(160,143, 177)']
                    },
                ]
            }}
            height={400}
            width={600}
            options={{
                maintainAspectRatio: false,
                scales: { 
                    yAxes:[
                        {
                            ticks: {
                                beginAtZero:true
                            }
                        }
                    ]
                }
            }}
            />
            </section>
            <section className="state-percent-chart">
                <h5>Percentage of Books per State</h5>
        <Doughnut
            data={{
                labels:['KY', 'MD', 'OH', 'TN', 'VA', 'WV'],
                datasets: [
                    {
                        label: 'Books Sent',
                        data: [ kyPercentage, mdPercentage, ohPercentage, tnPercentage, vaPercentage, wvPercentage],
                        backgroundColor: ['rgba(193,66,50)', 'rgba(191,127,63)', 'rgba(191,191,63)', 'rgba(127,191,63)', 'rgba(105,160,215)', 'rgba(160,143, 177)']
                    },
                ]
            }}
            height={400}
            width={600}
            options={{
                maintainAspectRatio: false,
              
            }}
            />
            </section>
            </article>

            <article className="genre-div">
            <h4>Genres</h4>
            <section className="genre-top-bar">
            <h5>Top Five Genres Total Books</h5>
            <Bar 
            data={{
                labels:[genreOne, genreTwo, genreThree, genreFour, genreFive],
                datasets: [
                    {
                        label: 'Top Genres',
                        data: [topGenres[0]?.parcelLength, topGenres[1]?.parcelLength, topGenres[2]?.parcelLength, topGenres[3]?.parcelLength, topGenres[4]?.parcelLength],
                        backgroundColor: ['rgba(193,66,50)', 'rgba(191,127,63)', 'rgba(191,191,63)', 'rgba(127,191,63)', 'rgba(105,160,215)', 'rgba(160,143, 177)']
                    },
                ]
            }}
            height={400}
            width={600}
            options={{
                maintainAspectRatio: false,
                scales: { 
                    yAxes:[
                        {
                            ticks: {
                                beginAtZero:true
                            }
                        }
                    ]
                }
            }}
            />

            </section>
            <section className="genre-percent-chart">
            <h5>Top Five Genres % of Total Books</h5>
            <Pie
            data={{
                labels:[genreOne, genreTwo, genreThree, genreFour, genreFive, 'Others'],
                datasets: [
                    {
                        label: 'Books Sent',
                        data: [ genrePercentFirst, genrePercentSecond, genrePercentThird, genrePercentFourth, genrePercentFifth, genrePercentOthers],
                        backgroundColor: ['rgba(193,66,50)', 'rgba(191,127,63)', 'rgba(191,191,63)', 'rgba(127,191,63)', 'rgba(105,160,215)', 'rgba(160,143, 177)']
                    },
                ]
            }}
            height={400}
            width={600}
            options={{
                maintainAspectRatio: false,
              
            }}
            />
            </section>

            
            </article>
            
            </section>

            </article>
        </>
     
    )

}

{/* <h5>Yearly Total </h5><p>{currentYearTotal.length}</p>
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
    </>   */}