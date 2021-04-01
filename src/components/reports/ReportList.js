import React, { useContext, useEffect } from "react"
import { ParcelContext } from "../parcels/ParcelProvider"
import { GenreContext } from "../GenreProvider"
import { Bar, Pie, Doughnut } from "react-chartjs-2"
import { Image } from "react-bootstrap"
import Reports from "../images/Report.png"

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
            const currentYearLength = currentYearTotal?.length
            
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
        const totalTopGenres = topGenres[0]?.parcelLength + topGenres[1]?.parcelLength + topGenres[2]?.parcelLength+topGenres[3]?.parcelLength+ topGenres[4]?.parcelLength

        const genrePercentFirst = ((topGenres[0]?.parcelLength / currentYearTotal.length)*100).toFixed(2)
        const genrePercentSecond = ((topGenres[1]?.parcelLength / currentYearTotal.length)*100).toFixed(2)
        const genrePercentThird = ((topGenres[2]?.parcelLength / currentYearTotal.length)*100).toFixed(2)
        const genrePercentFourth = ((topGenres[3]?.parcelLength / currentYearTotal.length)*100).toFixed(2)
        const genrePercentFifth = ((topGenres[4]?.parcelLength / currentYearTotal.length)*100).toFixed(2)
        const genrePercentOthers = (((currentYearLength-totalTopGenres)/currentYearLength)*100).toFixed(2)
       
        console.log(currentYearTotal)
        console.log(totalTopGenres)
        console.log(genrePercentOthers)
        
        //CHARTS
        
     return(
       <>
        
        <article className="reports-container"> 
        {/* <Image src={Reports} /> */}
        <div><h2>Reports</h2></div>
        <br></br><h6>Identify trends in book request genres and destinations</h6> <br></br>
       
        <section className="charts-div">
        <article className="total-div"><h4>Books YTD:<br></br>{currentYearLength} </h4></article>
        <article className="states-div">
        <section className="state-total-bar">
        <h5>Books per State</h5>
        <Bar 
            data={{
                labels:['KY', 'MD', 'OH', 'TN', 'VA', 'WV'],
                datasets: [
                    {
                        label: 'Number of Books Sent',
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
                <h5>Percentage by State</h5>
        <Doughnut
            data={{
                labels:['KY', 'MD', 'OH', 'TN', 'VA', 'WV'],
                datasets: [
                    {
                        label: 'hey' ,
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
           
            <section className="genre-top-bar">
            <h5>Most Popular Genres</h5>
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
            <h5>Top 5 Genres by Percent</h5>
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

